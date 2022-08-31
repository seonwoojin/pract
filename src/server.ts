import "dotenv/config";
import "./db";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import cors from "@koa/cors";
import serve from "koa-static";
import send from "koa-send";

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

const corsOptions = {
  origin: "*",
  Credential: true,
};

router.use("/api", api.routes());

app.use(bodyParser());
app.use(serve(__dirname + "/build"));
app.use(cors(corsOptions));
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  if (ctx.status === 404)
    await send(ctx, "index.html", { root: __dirname + "/build" });
});

app.listen(PORT, handleListening);
