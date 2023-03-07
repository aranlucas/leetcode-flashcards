declare module "*.md" {
  import { type VFC } from "react";
  const attributes: Record<string, unknown>;

  const react: VFC;
  export { react, attributes };
}
