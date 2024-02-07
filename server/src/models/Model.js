// eslint-disable-next-line import/no-extraneous-dependencies
const { Model: ObjectionModel, ValidationError } = require("objection");

/**
 * Abstract model for Transporter ORM
 * Hackery in this directory is due to VSCode not recognizing
 * or following CJS files. Changing them back to .js extensions makes
 * working with Object a lot easier (we get intellisense for Objection)
 *
 * @class Model
 */
class Model extends ObjectionModel {
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  async $checkUniqueness(property) {
    const existingRecord = await this.constructor.query().where(property, this[property]).first();

    if (existingRecord && existingRecord.id !== this.id) {
      const errorObject = {};
      errorObject[property] = [{ keyword: "unique", message: "already in use" }];
      throw new ValidationError({ type: "ModelValidation", status: 400, data: errorObject });
    }
  }
}

module.exports = Model;
