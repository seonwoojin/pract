import "dotenv/config";
import "./db";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true,
};

router.use("/api", api.routes());

app.use(bodyParser());
app.use(cors(corsOptions));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, handleListening);
