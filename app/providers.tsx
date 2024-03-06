// providers.js (app directory)
"use client";

import { Provider } from "jotai";

export default function Providers({ children }: { children: any }) {
  return <Provider>{children}</Provider>;
}
