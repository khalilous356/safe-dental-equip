import fs from 'node:fs';
import path from 'node:path';
const forbidden = /localStorage\s*\.|sessionStorage\s*\./;
const files=[];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    if(['.git','node_modules'].includes(name)) continue;
    const p=path.join(dir,name);
    const st=fs.statSync(p);
    if(st.isDirectory()) walk(p);
    else if(/\.(html|js|mjs)$/.test(name)) files.push(p);
  }
}
walk(process.cwd());
const bad=[];
for(const f of files){
  const text=fs.readFileSync(f,'utf8');
  if(forbidden.test(text)) bad.push(f);
}
if(bad.length){
  console.error('Browser persistence API references found\n'+bad.join('\n'));
  process.exit(1);
}
console.log('OK: no browser persistence API usage.');
