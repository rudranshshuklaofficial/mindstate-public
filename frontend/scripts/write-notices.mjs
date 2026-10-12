import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const notice=readFileSync(new URL('src/components/arc/LICENSE',root),'utf8');
writeFileSync(new URL('../static/enhanced/UIARC-LICENSE.txt',root),notice);
const bundle=fileURLToPath(new URL('../static/enhanced/mindstate-ui.js',root));
writeFileSync(bundle,'/*! Arc UI / UIArc © 2026 Elia Kuratli. MIT: ./UIARC-LICENSE.txt. Other notices: ./THIRD-PARTY-NOTICES.txt. MindState adaptations. */\n'+readFileSync(bundle,'utf8').replace(/^\/\*! Arc UI[^\n]*\n/,''));
const packages=['react','react-dom','scheduler','motion','framer-motion','motion-dom','motion-utils','lucide-react'];
for(const name of readdirSync(new URL('node_modules/@radix-ui/',root))) packages.push('@radix-ui/'+name);
const notices=[];
for(const name of packages){
 for(const filename of ['LICENSE','LICENSE.txt','LICENSE.md']){
  const path=new URL('node_modules/'+name+'/'+filename,root);
  if(existsSync(path)){notices.push(name+'\n\n'+readFileSync(path,'utf8'));break;}
 }
}
writeFileSync(new URL('../static/enhanced/THIRD-PARTY-NOTICES.txt',root),notices.join('\n\n---\n\n'));
