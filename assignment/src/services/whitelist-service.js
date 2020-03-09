import _ from 'lodash';
export const DEFAULT_ENABLED_STATE = false;

export class WhitelistService {
    constructor({storage = new Map(), whitelistRepository}) {
        this.storage = storage;
        this.whitelistRepository = whitelistRepository;

        this.addGroup = _.memoize(this._addGroup.bind(this))
    }

    async get(groupId) {
        const cached = this.storage.get(groupId);

        if (cached != null) {
            return cached;
        }

        const requestedPromise = this.whitelistRepository.getByGroupId(groupId);

        this.storage.set(requestedPromise);

        return requestedPromise;
    }

    async _addGroup(groupId) {
        try {
            return await this.whitelistRepository.create({ groupId })
        } catch (e) {
            if (e.code !== 'ER_DUP_ENTRY') {
                throw e;
            }
        }
    }

    async isEnabled(groupId) {
        const group  = (await this.get(groupId));

        if (group != null) {
            return group.enabled === 1;
        }

        await this.addGroup(groupId);

        return DEFAULT_ENABLED_STATE;
    }

    async disable(groupId, reason) {
        await this.whitelistRepository.updateByGroupId(groupId, {enabled: false, reason});

        this.storage.set(groupId, null);
    }

    clearCache(groupId) {
        this.storage.set(groupId);
    }
}
