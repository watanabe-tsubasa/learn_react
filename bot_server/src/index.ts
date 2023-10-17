import { WebhookEvent } from "@line/bot-sdk";
import { Elysia } from "elysia";
import { handler } from "./handler";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/webhook", async({ request }) => {
    const data = await request.json();
    const events: WebhookEvent[] = data.events;
    await Promise.all(
      events.map(async (event: WebhookEvent) => await handler(event))
    )    
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);