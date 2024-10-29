# Fal Abort Issue

To reproduce:

1. Create `.env.local` in the project root, and add your `FAL_KEY="..."`.
2. `bun i`
3. `bun dev`
4. In another terminal, fire two requests: `curl -X POST http://localhost:3799 && curl -X POST http://localhost:3799`

The expected behavior is for the first fal stream request to be aborted and second one to start without throwing an error. Currently, it throws:

```
208 |         this.done = () => __awaiter(this, void 0, void 0, function* () { return this.donePromise; });
209 |         /**
210 |          * Aborts the streaming request.
211 |          */
212 |         this.abort = () => {
213 |             this.abortController.abort();
                                       ^
AbortError: The operation was aborted.
 code: "ABORT_ERR"

      at /Users/moroshko/temp/fal-abort-issue/node_modules/@fal-ai/client/src/streaming.js:213:34
      at /Users/moroshko/temp/fal-abort-issue/src/index.ts:14:14
      at /Users/moroshko/temp/fal-abort-issue/src/index.ts:13:22
      at dispatch (/Users/moroshko/temp/fal-abort-issue/node_modules/hono/dist/hono-base.js:187:36)
```