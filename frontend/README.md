# MindState enhanced components

Run `npm ci --prefix frontend`, `npm run check --prefix frontend`, and
`npm run build --prefix frontend` from the project root. Django serves the
result from static/enhanced; no separate frontend server is required.

## Sources and credits

Selected free MIT sources: [Arc UI / UIArc](https://uiarc.dev/) by Elia Kuratli.
The complete notice is in src/components/arc/LICENSE. Per-component source,
dependency and accessibility records are in catalog-selection.json and in
MindState's /contribute/design-system/#component-credits.

React, Motion, Radix UI and Lucide retain their own package licences.
Rare UI OTP, shadcn wrappers and Motion Primitives disclosure are superseded.
Do not remove an upstream notice while its source is still present.

## MindState adaptations

- arc-main.tsx bridges controls to the existing native Django inputs. Native
  inputs remain the submitted source of truth; JavaScript failures leave usable
  HTML. Field names, validation, permissions and approved-image removal are not
  reimplemented in React.
- arc-skin.css scopes semantic tokens to .ms-island, including portal roots.
  UIArc's global foundation/reset is deliberately not imported.
- lib/quiet-motion.ts selects quiet component variants. motion-tokens.ts limits
  timing, removes stagger and blur, and honours the OS reduced-motion setting.
- Dialog/select/tooltip portals carry the skin class. Dialog uses no backdrop
  blur. File-video icon is aliased for the project's installed Lucide version.
- Review appearance is server navigation, so it stays links. UIArc Tabs is used
  for actual in-page documentation panels.
- Uploads are plain selections, not simulated asynchronous uploads: no fake
  progress, upload success or network retries. The form performs the upload.

scripts/vendor-uiarc.py checks the free tier before fetching source. It is an
upstream refresh tool, not part of a normal build. Refreshing overwrites local
adaptations: compare the diff and reapply the listed changes before building.

No paid Arc source, Pro imitation, or unrelated page redesign is included.
