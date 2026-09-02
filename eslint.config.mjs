import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Worktrees de agentes (Claude Code) podem existir em qualquer profundidade
    // e trazem seu próprio node_modules/.next — sem "**/" na frente, os padrões
    // acima só cobrem a raiz do projeto.
    "**/.claude/**",
    "**/node_modules/**",
  ]),
]);

export default eslintConfig;
