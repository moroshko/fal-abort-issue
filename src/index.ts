import { fal } from "@fal-ai/client";
import { FalStream } from '@fal-ai/client/src/streaming';
import { Hono } from 'hono';

fal.config({
  credentials: Bun.env.FAL_KEY,
});

const app = new Hono()

let falStream: FalStream<{},any> | null = null;

app.post('/', async (c) => {
  falStream?.abort();
  falStream = await fal.stream(
    "phonic-fal/phonic-tts-streaming",
    {
      input: {},
      accept: "audio/*",
    },
  );

  return c.text('Fal abort issue')
})

export default {
  port: 3799,
  fetch: app.fetch,
}