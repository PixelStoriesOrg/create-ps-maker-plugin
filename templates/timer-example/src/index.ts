interface PluginContext<
  TParams extends Record<string, any> = Record<string, any>,
> {
  params: TParams;
}

type PluginEvent<TParams extends Record<string, any>> = {
  name: string;
  description: string;
  params: TParams;
  fn: (ctx: PluginContext<TParams>) => void;
};

// Helper to create an event with proper type inference between params and fn
export function defineEvent<const TParams extends Record<string, any>>(event: {
  name: string;
  description: string;
  params: TParams;
  fn: (ctx: PluginContext<TParams>) => void;
}): PluginEvent<TParams> {
  return event;
}

interface Plugin {
  name: string;
  description: string;
  version: string;
  events: PluginEvent<any>[];
}

export default {
  name: "__PLUGIN_NAME__",
  description: "A brief description my plugin.",
  version: "0.1.0",

  events: [
    defineEvent({
      name: "timer",
      description: "Starts a timer and ends event when timer completes.",
      params: {
        hello: "hello",
      },
      fn: (ctx) => {
        const { params } = ctx;
        params.hello; // ✅ typed
      },
    }),
  ],
} satisfies Plugin;
