import _ from 'lodash';

const DEFAULT_LIMIT_VALUE = 10000;

export class BaseRepository {
  constructor({ connection, tableName }) {
    this.connection = connection;
    this.tableName = tableName;
  }

  async create(fields) {
    const { insertId: id } = await (this.connection.queryRow('INSERT INTO ?? SET ?', [this.tableName, fields]));

    return {
      id,
    };
  }

  async updateById(id, fields) {
    try {
      return await (this.connection.queryRow('UPDATE ?? SET ? WHERE id = ?', [this.tableName, fields, id]));
    } catch (e) {
      if (e.code === 'ER_BAD_FIELD_ERROR') {
        throw new Error(`Unexpected fields in ${JSON.stringify(fields)}`);
      }

      throw e;
    }
  }

  async update(fields, key) {
    if (_.isEmpty(key)) {
      throw new Error('Update criteria not specified (NO BULK UPDATE OPERATIONS)');
    }

    const keyEntries = Object.entries(key);

    try {
      return await (
        this.connection.queryRow(
          `UPDATE ?? SET ? WHERE ${this.prepareWhereStatement(keyEntries.length)}`,
          [this.tableName, fields, ..._.flatten(keyEntries)],
        )
      );
    } catch (e) {
      if (e.code === 'ER_BAD_FIELD_ERROR') {
        throw new Error(`Unexpected fields in ${JSON.stringify(fields)}`);
      }

      throw e;
    }
  }

  async deleteById(id) {
    const { affectedRows: deleted } = await this.connection.queryRow(
      'DELETE from ?? WHERE id = ? LIMIT 1', [this.tableName, id],
    );

    if (deleted === 0) {
      throw new Error(`Cant find entity with id = '${id}'`);
    }

    return { deleted };
  }

  async deleteByFields(fields) {
    if (!_.isEmpty(fields)) {
      const filtersEntries = Object.entries(fields);

      const { affectedRows: deleted } = (await this.connection.query(
        `DELETE from ?? WHERE ${this.prepareWhereStatement(filtersEntries.length)}`,
        [this.tableName, ..._.flatten(filtersEntries)],
      )
      )[0];

      return { deleted };
    }

    throw new Error('Please specify deletion criteria (NO TRUNCATE FROM API)');
  }

  async getById(id) {
    return (await this.connection.queryRow('SELECT * from ?? WHERE id = ? LIMIT 1', [this.tableName, id]))[0];
  }

  async get(filters, limit = DEFAULT_LIMIT_VALUE) {
    if (!_.isEmpty(filters)) {
      const filtersEntries = Object.entries(filters);

      return (
        await this.connection.query(
          `SELECT * from ?? WHERE ${this.prepareWhereStatement(filtersEntries.length)} LIMIT ?`,
          [this.tableName, ..._.flatten(filtersEntries), limit],
        )
      )[0];
    }

    return (await this.connection.query('SELECT * from ?? LIMIT ?', [this.tableName, limit]))[0];
  }

  prepareWhereStatement(length) {
    return new Array(length).fill('?? = ?').join(' AND ');
  }
}
