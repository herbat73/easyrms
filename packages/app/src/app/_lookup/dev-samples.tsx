import type { ReactElement } from "react";
import { listFakeOrderSamples, selectOrderSource } from "@easyrms/core";

import { showTestData } from "./test-data-visibility";

/** Resolves the active order source for display only; `allowFakeInProduction` never changes which source serves orders. */
function activeOrderSource(): string | undefined {
  try {
    return selectOrderSource({
      nodeEnv: process.env.NODE_ENV,
      source: process.env.EASYRMS_ORDER_SOURCE,
      allowFakeInProduction: true,
    });
  } catch {
    return undefined;
  }
}

/** Server Component: lists the seeded example customers and orders when `EASYRMS_PRELOAD_TEST_DATA=true` (any environment). */
export function DevSamples(): ReactElement | null {
  if (!showTestData({ flag: process.env.EASYRMS_PRELOAD_TEST_DATA, orderSource: activeOrderSource() })) return null;
  return (
    <section aria-labelledby="dev-samples-title" className="space-y-3 rounded-md border border-dashed border-warning-subtle-border bg-warning-subtle text-warning-subtle-foreground p-4 text-sm">
      <h2 id="dev-samples-title" className="font-semibold">
        Dane testowe
      </h2>
      <ul className="space-y-3">
        {listFakeOrderSamples().map((sample) => (
          <li key={sample.orderNumber} className="space-y-1">
            <p>
              <code className="font-mono font-semibold">{sample.orderNumber}</code> ·{" "}
              <code className="font-mono">{sample.email}</code>
            </p>
            <p className="text-muted-foreground">{sample.scenario}</p>
            <p className="text-xs text-muted-foreground">
              {sample.lines.map((line) => `${line.quantity}× ${line.name}${line.returnable ? "" : " (bez zwrotu)"}`).join("; ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
