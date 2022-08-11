import Router from "koa-router";
import { postAdmin } from "./adminController";

const admin = new Router();

admin.post("/upload", postAdmin);

export default admin;
