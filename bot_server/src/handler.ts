import { ClientConfig, HTTPError, TextMessage, WebhookEvent } from "@line/bot-sdk";
import { MessagingApiClient, ReplyMessageResponse } from "@line/bot-sdk/dist/messaging-api/api";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
};
const client = new MessagingApiClient(clientConfig);

export const handler = async(event: WebhookEvent): Promise<ReplyMessageResponse | void> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  const { text } = event.message;
  const messages: TextMessage[] = [
    {
      type: 'text',
      text: text
    },
  ]
  return await client
    .replyMessage({
      replyToken: replyToken,
      messages: messages
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        console.error(err.statusCode);
      }
    });
}