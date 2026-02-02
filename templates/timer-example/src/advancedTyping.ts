import {
  type ParamSchemas,
  type PluginEventHandler,
  type PluginContext,
  defineEvent,
  definePlugin,
} from "@ps-maker/plugin-api";

// Example: defining the function outside of defineEvent
// first define parameterDefs separately (with `as const` for literal types)
const timerParams = {
  message: {
    description: "A greeting message.",
    type: "string",
    defaultValue: "Hello, world!",
  },
  duration: {
    description: "Duration in milliseconds.",
    type: "number",
    defaultValue: 1000,
  },
  enabled: {
    description: "Whether the timer is enabled.",
    type: "boolean",
  },
} satisfies ParamSchemas;
// then you can define the function separately with proper typing
const fnExample: PluginEventHandler<typeof timerParams> = (params, ctx) => {
  params.message; // ✅ string
  params.duration; // ✅ number
  params.enabled; // ✅ boolean
  // params.test; // ❌ TS error
};

// Exampple: explicitly typed function
interface ExplicitParams {
  message: string;
  duration: number;
  enabled: boolean;
  notInParamsDef: boolean;
}
const explicitelyTypedFn = (params: ExplicitParams, ctx: PluginContext) => {
  params.message; // ✅ string
  params.duration; // ✅ number
  params.enabled; // ✅ boolean
  params.notInParamsDef; // ✅ boolean, no TS error but not in params def
};

const testEvent = defineEvent({
  name: "timer",
  description: "Starts a timer and ends event when timer completes.",
  parameterDefs: timerParams,
  execute: fnExample,
  // fn: explicitelyTypedFn, // ❌ TS error since param types don't match inferred types by timer Params
});

export default definePlugin({
  name: "__PLUGIN_NAME__",
  description: "A brief description my plugin.",
  version: "0.1.0",

  events: [testEvent],
});
