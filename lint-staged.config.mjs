import path from 'node:path';

const root = process.cwd();
const quote = (file) => JSON.stringify(file);

/**
 * ESLint's flat config (v9) does not walk up the directory tree, and lint-staged
 * runs from the repo root where there is no config. So we group staged files by
 * workspace package and run each package's own ESLint from its directory.
 * eslint-plugin-prettier applies formatting in the same pass, so TS/TSX files
 * don't need a separate Prettier command.
 *
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,cjs,mjs,json,css,md,yml,yaml}': (files) =>
    `prettier --write ${files.map(quote).join(' ')}`,

  '*.{ts,tsx}': (files) => {
    const byPackage = new Map();

    for (const file of files) {
      const [top, name] = path.relative(root, file).split(path.sep);
      if (top !== 'apps' && top !== 'packages') continue;

      const pkg = `${top}/${name}`;
      const bucket = byPackage.get(pkg) ?? [];
      bucket.push(quote(file));
      byPackage.set(pkg, bucket);
    }

    return [...byPackage].map(
      ([pkg, pkgFiles]) =>
        `pnpm --filter ./${pkg} exec eslint --fix --no-warn-ignored ${pkgFiles.join(' ')}`,
    );
  },
};
