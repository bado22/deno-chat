import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const messages = [];
const channel = new BroadcastChannel("chat");
channel.onmessages = (event) => {
  messages.push(event.data);
};

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Chat Server!";
  })
  .get("/messages", (context) => {
    context.response.body = messages;
  })
  .post("/messages", async (context) => {
    console.log("in messages endpoint");
    const message = await context.request.body().value;
    messages.push(message);
    channel.postMessage(message);
    context.response.body = messages;
  });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
