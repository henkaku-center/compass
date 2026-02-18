/**
 * Shared API client for Henkaku Registry
 * Used by both Charter and Compass frontends.
 *
 * Usage:
 *   const api = new ApiClient('https://registry.henkaku.center');
 *   api.init();           // restore tokens from localStorage
 *   await api.login(email, password);
 *   const content = await api.getDocumentContent('charter');
 */

class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.accessToken = null;
        this.refreshToken = null;
        this._refreshPromise = null;
    }

    // ── Initialization ──────────────────────────────────────────

    init() {
        this.accessToken = localStorage.getItem('registry_access_token');
        this.refreshToken = localStorage.getItem('registry_refresh_token');
    }

    // ── Auth ────────────────────────────────────────────────────

    async register(email, password, name) {
        const res = await this._fetch('/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        }, false);
        return res;
    }

    async login(email, password) {
        const res = await this._fetch('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }, false);
        this._storeTokens(res.access_token, res.refresh_token);
        return res;
    }

    async refreshAuth() {
        if (!this.refreshToken) throw new Error('No refresh token');
        // Deduplicate concurrent refresh calls
        if (this._refreshPromise) return this._refreshPromise;
        this._refreshPromise = (async () => {
            try {
                const res = await this._fetch('/api/v1/auth/refresh', {
                    method: 'POST',
                    body: JSON.stringify({ refresh_token: this.refreshToken }),
                }, false);
                this._storeTokens(res.access_token, res.refresh_token);
                return res;
            } finally {
                this._refreshPromise = null;
            }
        })();
        return this._refreshPromise;
    }

    async me() {
        return this._fetch('/api/v1/auth/me');
    }

    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('registry_access_token');
        localStorage.removeItem('registry_refresh_token');
    }

    get isAuthenticated() {
        return !!this.accessToken;
    }

    // ── Charter: Documents ──────────────────────────────────────

    async getHead(docType) {
        return this._fetch(`/api/v1/charter/documents/${docType}/head`);
    }

    async getVersions(docType) {
        return this._fetch(`/api/v1/charter/documents/${docType}/versions`);
    }

    async getDocumentContent(docType) {
        return this._fetch(`/api/v1/charter/documents/${docType}/content`);
    }

    async getBlob(docType, hash) {
        return this._fetch(`/api/v1/charter/documents/${docType}/content/${hash}`);
    }

    async createVersion(docType, content, message, proposalId = null) {
        return this._fetch(`/api/v1/charter/documents/${docType}/versions`, {
            method: 'POST',
            body: JSON.stringify({ content, message, proposal_id: proposalId }),
        });
    }

    // ── Charter: Stakeholders ───────────────────────────────────

    async getStakeholders() {
        return this._fetch('/api/v1/charter/stakeholders');
    }

    async createStakeholder(data) {
        return this._fetch('/api/v1/charter/stakeholders', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateStakeholder(id, data) {
        return this._fetch(`/api/v1/charter/stakeholders/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async exportFullInstitutionalMemory() {
        return this._fetch('/api/v1/charter/export/full');
    }

    // ── Charter: Proposals ──────────────────────────────────────

    async getGovernanceStatus() {
        return this._fetch('/api/v1/charter/proposals/governance-status');
    }

    async getProposals(status = null) {
        const qs = status ? `?status_filter=${status}` : '';
        return this._fetch(`/api/v1/charter/proposals${qs}`);
    }

    async getProposal(id) {
        return this._fetch(`/api/v1/charter/proposals/${id}`);
    }

    async createProposal(data) {
        return this._fetch('/api/v1/charter/proposals', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateProposal(id, data) {
        return this._fetch(`/api/v1/charter/proposals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async submitProposal(id, votingEndsAt) {
        return this._fetch(`/api/v1/charter/proposals/${id}/submit`, {
            method: 'POST',
            body: JSON.stringify({ voting_ends_at: votingEndsAt }),
        });
    }

    async resolveProposal(id, data) {
        return this._fetch(`/api/v1/charter/proposals/${id}/resolve`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateImplementationStatus(id, implementationStatus) {
        return this._fetch(`/api/v1/charter/proposals/${id}/implementation`, {
            method: 'PATCH',
            body: JSON.stringify({ implementation_status: implementationStatus }),
        });
    }

    async clearMergeReview(id) {
        return this._fetch(`/api/v1/charter/proposals/${id}/clear-merge-review`, {
            method: 'POST',
        });
    }

    // ── Charter: Votes ──────────────────────────────────────────

    async getVotes(proposalId) {
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/votes`);
    }

    async castVote(proposalId, data) {
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/votes`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // ── Charter: Proposal Attachments ────────────────────────────

    async uploadProposalAttachment(proposalId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/attachments`, {
            method: 'POST',
            body: formData,
            headers: {},  // let browser set content-type with boundary
        });
    }

    async getProposalAttachments(proposalId) {
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/attachments`);
    }

    getProposalAttachmentUrl(proposalId, attachmentId) {
        return `${this.baseUrl}/api/v1/charter/proposals/${proposalId}/attachments/${attachmentId}`;
    }

    async uploadVoteAttachment(proposalId, voteId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/votes/${voteId}/attachments`, {
            method: 'POST',
            body: formData,
            headers: {},
        });
    }

    async getVoteAttachments(proposalId, voteId) {
        return this._fetch(`/api/v1/charter/proposals/${proposalId}/votes/${voteId}/attachments`);
    }

    getVoteAttachmentUrl(proposalId, voteId, attachmentId) {
        return `${this.baseUrl}/api/v1/charter/proposals/${proposalId}/votes/${voteId}/attachments/${attachmentId}`;
    }

    // ── Feedback ────────────────────────────────────────────────

    async getFeedback(project = null, status = null) {
        const params = new URLSearchParams();
        if (project) params.set('project', project);
        if (status) params.set('status_filter', status);
        const qs = params.toString() ? `?${params}` : '';
        return this._fetch(`/api/v1/feedback${qs}`);
    }

    async getFeedbackItem(id) {
        return this._fetch(`/api/v1/feedback/${id}`);
    }

    async createFeedback(data) {
        return this._fetch('/api/v1/feedback', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateFeedback(id, data) {
        return this._fetch(`/api/v1/feedback/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async uploadAttachment(feedbackId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._fetch(`/api/v1/feedback/${feedbackId}/attachments`, {
            method: 'POST',
            body: formData,
            headers: {},  // let browser set content-type with boundary
        });
    }

    getAttachmentUrl(feedbackId, attachmentId) {
        return `${this.baseUrl}/api/v1/feedback/${feedbackId}/attachments/${attachmentId}`;
    }

    // ── Compass: Entities ───────────────────────────────────────

    async getEntities(type = null) {
        const qs = type ? `?type=${type}` : '';
        return this._fetch(`/api/v1/compass/entities${qs}`);
    }

    async getEntity(id) {
        return this._fetch(`/api/v1/compass/entities/${id}`);
    }

    async createEntity(data) {
        return this._fetch('/api/v1/compass/entities', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateEntity(id, data) {
        return this._fetch(`/api/v1/compass/entities/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteEntity(id) {
        return this._fetch(`/api/v1/compass/entities/${id}`, { method: 'DELETE' });
    }

    async uploadEntityFile(entityId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._fetch(`/api/v1/compass/entities/${entityId}/files`, {
            method: 'POST',
            body: formData,
            headers: {},
        });
    }

    // ── Compass: Relations ──────────────────────────────────────

    async getRelations(sourceId = null, targetId = null, type = null) {
        const params = new URLSearchParams();
        if (sourceId) params.set('source_id', sourceId);
        if (targetId) params.set('target_id', targetId);
        if (type) params.set('type', type);
        const qs = params.toString() ? `?${params}` : '';
        return this._fetch(`/api/v1/compass/relations${qs}`);
    }

    async createRelation(data) {
        return this._fetch('/api/v1/compass/relations', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async deleteRelation(id) {
        return this._fetch(`/api/v1/compass/relations/${id}`, { method: 'DELETE' });
    }

    // ── Internal ────────────────────────────────────────────────

    _storeTokens(access, refresh) {
        this.accessToken = access;
        this.refreshToken = refresh;
        localStorage.setItem('registry_access_token', access);
        localStorage.setItem('registry_refresh_token', refresh);
    }

    async _fetch(path, opts = {}, withAuth = true) {
        const url = `${this.baseUrl}${path}`;
        const headers = opts.headers !== undefined ? { ...opts.headers } : { 'Content-Type': 'application/json' };

        if (withAuth && this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        let res = await fetch(url, { ...opts, headers });

        // Auto-refresh on 401
        if (res.status === 401 && withAuth && this.refreshToken) {
            try {
                await this.refreshAuth();
                headers['Authorization'] = `Bearer ${this.accessToken}`;
                res = await fetch(url, { ...opts, headers });
            } catch {
                this.logout();
                throw new Error('Session expired. Please log in again.');
            }
        }

        if (res.status === 204) return null;

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            const err = new Error(body.detail || `API error ${res.status}`);
            err.status = res.status;
            err.body = body;
            throw err;
        }

        return res.json();
    }
}
