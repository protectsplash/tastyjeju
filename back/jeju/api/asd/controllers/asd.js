"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    entities = await strapi.services.asd.find(ctx.query);
    await strapi.services.asd.create({ asd: "hihi" });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.asd })
    );
  },
};
