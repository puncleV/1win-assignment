import _ from 'lodash';
import { BaseRepository } from './base-repository';


export class WhiteListRepository extends BaseRepository {
    constructor({ connection }) {
        super({ connection, tableName: 'whitelist' });
    }

    async getByGroupId(groupId) {
        return this.get({groupId});
    }

    async updateByGroupIdAndVersion({groupId, version}, {enabled, reason = null}) {
        const keyEntries = Object.entries({groupId, version});

        const {changedRows} = await (
            this.connection.queryRow(
                `UPDATE ?? SET version = version + 1, ? WHERE ${this.prepareWhereStatement(keyEntries.length)};`,
                [this.tableName, {enabled, reason}, ..._.flatten(keyEntries)],
            )
        );

        if (changedRows === 0) {
            throw new Error(`There is not group ${groupId} with version ${version}`)
        }
    }

    async updateByGroupId(groupId, {enabled, reason = null}) {
        const keyEntries = Object.entries({groupId});

        const {changedRows} = await (
            this.connection.queryRow(
                `UPDATE ?? SET version = version + 1, ? WHERE ${this.prepareWhereStatement(keyEntries.length)};`,
                [this.tableName, {enabled, reason}, ..._.flatten(keyEntries)],
            )
        );

        if (changedRows === 0) {
            throw new Error(`There is not group ${groupId} with version ${version}`)
        }
    }
}
