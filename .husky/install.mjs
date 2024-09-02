// Skip Husky install if the package isn't found, eg using pnpm i --prod
let husky;
try {
  const { default: huskyDefault } = await import("husky");
  husky = huskyDefault;
} catch (err) {
  if (process.env.NODE_ENV !== "production" || !process.env.CI !== "true") {
    console.warn("Unable to import husky, git hooks will not be set up");
  }
  process.exit(0);
}
husky();
