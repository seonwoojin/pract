import Router from "koa-router";

const user = new Router();

user.get("/", (ctx) => {
  ctx.body = "Asdasdas";
});

export default user;
