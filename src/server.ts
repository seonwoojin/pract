import "dotenv/config";
import "./db";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";

const app = new Koa();
const router = new Router();

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, handleListening);
