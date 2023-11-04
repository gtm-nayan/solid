import { encode } from "dom-expressions/src/encoder.js";
import { Computation } from "../reactive/signal.js";

export type HydrationContext = { id: string; count: number };

type SharedConfig = {
  context?: HydrationContext;
  resources?: { [key: string]: any };
  load?: (id: string) => Promise<any> | any;
  has?: (id: string) => boolean;
  gather?: (key: string) => void;
  registry?: Map<string, Element>;
  done?: boolean;
  count?: number;
  effects?: Computation<any, any>[];
};

export const sharedConfig: SharedConfig = { context: undefined, registry: undefined };

export function setHydrateContext(context?: HydrationContext): void {
  sharedConfig.context = context;
}

export function nextHydrateContext(): HydrationContext | undefined {
  return {
    ...sharedConfig.context,
    id: `${sharedConfig.context!.id}${encode(sharedConfig.context!.count++)}`,
    count: 0
  };
}
