import "./demo.css";

/**
 * Everything under /demo. Sits outside the (greene) group, so it inherits
 * only <html>/<body>, no Greene nav, footer, cursor, smooth scroll or
 * atmosphere. Per-brand tokens are injected further down by DemoShell.
 */
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
