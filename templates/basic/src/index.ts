import { defineEvent, definePlugin } from "@ps-maker/plugin-api";

const fooEvent = defineEvent({
  name: "timer",
  description: "Starts a timer and ends event when timer completes.",
  parameterDefs: {
    message: {
      description: "A greeting message.",
      type: "string",
      defaultValue: "Hello, world!",
    },
  },
  execute: (params, ctx) => {
    params.message;
  },
});

export default definePlugin({
  name: "__PLUGIN_NAME__",
  description: "A brief description my plugin.",
  version: "0.1.0",
  events: [fooEvent],
});
