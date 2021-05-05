module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        // const test = await strapi.services.asd.find();
        // console.log(test);
        await next();
      });
    },
  };
};
