import next from "eslint-config-next";
import prettier from "eslint-config-prettier/flat";

export default [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "prisma/generated/**"],
  },
  ...next,
  prettier,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
];
