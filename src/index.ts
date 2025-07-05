import { fromHono } from "chanfana";
import { Hono } from "hono";
import { PasteCreate } from "./endpoints/pasteCreate";
import { PasteFetch } from "./endpoints/pasteFetch";

const app = new Hono<{ Bindings: Env }>();

const openapi = fromHono(app, {
  docs_url: "/",
});

openapi.get("/:user/:pasteSlug", PasteFetch);
openapi.post("/:user", PasteCreate);
openapi.post("/:user/:pasteSlug", PasteCreate);

export default app;
