import {defineConfig} from "vite";
import {fileURLToPath, URL} from "node:url";
export default defineConfig({esbuild:{jsx:"automatic"},define:{"process.env.NODE_ENV":JSON.stringify("production")},resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}},build:{minify:"esbuild",outDir:"../static/enhanced",emptyOutDir:true,lib:{entry:"src/arc-main.tsx",formats:["es"],fileName:()=>"mindstate-ui.js",cssFileName:"mindstate-ui"}}});
