# Fal Abort Issue

To reproduce:

1. Create `.env.local` in the project root, and add your `FAL_KEY="..."`.
2. `bun i`
3. `bun dev`
4. In another terminal, fire two requests: `curl -X POST http://localhost:3799 && curl -X POST http://localhost:3799`

The expected behavior is for the first fal stream request to be aborted and second one to start without throwing an error. Currently, it throws:

```
13 | exports.defaultResponseHandler = defaultResponseHandler;
14 | exports.resultResponseHandler = resultResponseHandler;
15 | const REQUEST_ID_HEADER = "x-fal-request-id";
16 | class ApiError extends Error {
17 |     constructor({ message, status, body }) {
18 |         super(message);
             ^
ApiError: The operation was aborted.
      at new ApiError (/Users/moroshko/temp/fal-abort-issue/node_modules/@fal-ai/client/src/response.js:18:9)
      at /Users/moroshko/temp/fal-abort-issue/node_modules/@fal-ai/client/src/streaming.js:171:19
      at /Users/moroshko/temp/fal-abort-issue/node_modules/@fal-ai/client/src/streaming.js:85:22
      at rejected (/Users/moroshko/temp/fal-abort-issue/node_modules/@fal-ai/client/src/streaming.js:6:57)
```