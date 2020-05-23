'use strict';

class Model {
  constructor(schema) { 
    this.schema = schema;
  }

  async getAllResults(query) {
    let results = await this.schema.find(query);
    return results;
  }

  async getById(_id) {
    let record = await this.schema.findOne({ _id });
    return record;
  }

  async create(newEntry) {
    let object = await this.schema.create(newEntry);
    return object;
  }

  async update(_id, newDetails) {
    let entryToUpdate = await this.schema.findOne({ _id });
    let update = await entryToUpdate.update(newDetails);
    return update;
  }

  async delete(_id) {
    let deletedEntry = await this.schema.deleteOne({ _id });
    return deletedEntry;

  }
}

module.exports = Model;