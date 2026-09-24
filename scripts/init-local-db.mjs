import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
let built;
try{built=JSON.parse(await readFile(path.join(root,'dist/server/wrangler.json'),'utf8'));}
catch{throw new Error('Run pnpm build before initializing the local database.');}
const binding=built.d1_databases?.find(item=>item.binding==='DB');
if(!binding)throw new Error('The build has no DB binding.');
await mkdir(path.join(root,'.sites-runtime'),{recursive:true});
const config=path.join(root,'.sites-runtime/local-migrations.json');
await writeFile(config,JSON.stringify({
  name:built.name,
  compatibility_date:built.compatibility_date,
  d1_databases:[{...binding,migrations_dir:path.join(root,'drizzle')}],
}));
const result=spawnSync(process.execPath,[
  '--import',path.join(root,'scripts/sites-env.mjs'),
  path.join(root,'node_modules/wrangler/bin/wrangler.js'),
  'd1','migrations','apply','DB','--local','--config',config,
  '--persist-to',path.join(root,'.wrangler/state'),
],{cwd:root,stdio:'inherit'});
if(result.error)throw result.error;
process.exitCode=result.status??1;
