// Edit dist/assets/content.json, then run this script to refresh shared browser data.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const content=JSON.parse(fs.readFileSync(path.join(root,'dist/assets/content.json'),'utf8'));
if(!content.person?.name||!Array.isArray(content.projects))throw new Error('Expected person and projects in content.json');
fs.writeFileSync(path.join(root,'dist/assets/portfolio-data.js'),'window.PORTFOLIO_DATA = '+JSON.stringify({person:content.person,projects:content.projects}).replace(/</g,'\\u003c')+';\n');
console.log('Updated shared data for '+content.projects.length+' projects.');
