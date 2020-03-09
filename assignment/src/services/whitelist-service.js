export class WhitelistService {
    constructor({storage = new Map(), whitelistRepository}) {
        this.storage = storage;
        this.whitelistRepository = whitelistRepository;
    }

    async get(groupId) {
        const cached = this.storage.get(groupId);

        if (cached !== null) {
            return cached;
        }

        const requestedPromise = this.whitelistRepository.getByGroupId(groupId);

        this.storage.set(requestedPromise);

        return requestedPromise;
    }

    async isEnabled(groupId) {
        const { enabled } = (await this.get(groupId)) || {};

        return enabled === 1;
    }

    async disable(groupId, reason) {
        await this.whitelistRepository.updateByGroupId(groupId, {enabled: false, reason});

        this.storage.set(groupId, null)
    }
}
