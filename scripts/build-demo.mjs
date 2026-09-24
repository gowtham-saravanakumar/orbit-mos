import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const temp=path.join(root,'.sites-runtime','demo-build');
const destination=path.resolve(root,process.argv[2]||'outputs/Orbit-MOS-Demo.html');
await build({
  root,
  configFile:false,
  plugins:[react()],
  resolve:{alias:{'@':root}},
  define:{'process.env.NODE_ENV':JSON.stringify('production')},
  build:{
    outDir:temp,
    emptyOutDir:true,
    target:'es2020',
    cssCodeSplit:false,
    minify:true,
    lib:{entry:path.join(root,'preview/main.tsx'),name:'OrbitDemo',formats:['iife'],fileName:()=> 'orbit-demo.js'},
  },
});
const files=await readdir(temp);
const css=(await Promise.all(files.filter(f=>f.endsWith('.css')).map(f=>readFile(path.join(temp,f),'utf8')))).join('\n');
const script=await readFile(path.join(temp,'orbit-demo.js'),'utf8');
const icon=await readFile(path.join(root,'public/favicon.svg'),'utf8');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="Orbit Marketing Operating System: interactive offline demo with illustrative data. Changes reset on reload."><title>Orbit MOS — Interactive demo</title><link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}"><style>${css.replace(/<\/style/gi,'<\\/style')}</style></head>
<body><div id="orbit-root"></div><noscript>Enable JavaScript to explore the Orbit marketing workspace.</noscript><script>${script.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
await mkdir(path.dirname(destination),{recursive:true});
await writeFile(destination,html);
console.log(`Offline demo saved: ${destination} (${Math.round(Buffer.byteLength(html)/1024)} KiB)`);
