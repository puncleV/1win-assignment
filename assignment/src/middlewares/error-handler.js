export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
    ctx.stackTrace = e.stack;
  }
};
