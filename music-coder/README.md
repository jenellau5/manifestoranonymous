# Paid Song-to-Gate Coder

Standalone Next.js version of the owner's exported paid coder. The existing
static Manifestor Anonymous website remains at the repository root. This app
must run on a Node-capable host, not GitHub Pages.

## Features preserved

- Original black, lime and purple interface and four-step flow
- All 64 gates and the original three-result scoring method
- Server-side shared access-code check and HTTP-only session cookie
- Browser library, Google Sheets copying/template, CSV backup/restore and print

## Run and deploy

Use Node 22.13+ and pnpm. Run `pnpm install --frozen-lockfile`, then `pnpm build`.
`pnpm start` starts the production server. `pnpm dev` starts local development.

On a Next.js-compatible host (for example Vercel), import this GitHub repository
and choose **music-coder** as the project root. Configure private environment
variables `ACCESS_CODE` (the buyer code) and `SESSION_TOKEN` (a random secret of
at least 32 characters). Neither is public or prefixed with `NEXT_PUBLIC_`.
Never commit their real values. Missing configuration leaves access locked.

After deployment is tested, assign a coder subdomain using the host's verified
DNS instructions and update `assets/ma-config.js` in the parent website. Do not
change the main website's DNS or replace the working coder link before then.
The buyer code is deliberately not stored in this source folder.

## Data and access

No customer accounts or database are needed. The browser library stays local.
Changing domains does not move existing browser data: buyers should download
their CSV backup at the old coder and restore it on the new one, or continue
using their permanent Google Sheet.

Shared access is not per-buyer licensing. Rotating SESSION_TOKEN logs out all
existing sessions. The repository is public, so source and gate data are
readable there; the server gate controls use of the hosted coding endpoint.

## Validation

`pnpm build` checks production compilation and TypeScript. After building, run
`node tests/access.test.mjs` to verify wrong-code rejection, no-cookie/forged-cookie
rejection, correct-code access, cookie flags, three distinct gate results and
invalid-request handling. Tests use temporary credentials only in process memory.

The original Cloudflare/Sites adapter and unused starter components were omitted.
API routes now read standard server environment variables. No secrets, Sites
credentials, generated builds or dependencies belong in Git.
