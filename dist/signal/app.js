'use strict';
const flows={
 abstention:{label:'Threshold-conditioned abstention',caveat:'An explanation of the research pipeline. This page does not run an LLM.',base:'https://github.com/AkankshCaimi/LLM-Abstention-Tuning',steps:[
  ['Split','Data','Start with a clean separation.','The research separates 2,000 training questions from 500 held-out TriviaQA questions, with split checks to prevent exact overlap.','/blob/410d5bdf45b9f4c31f2ce7b427dc8ed6233c3cf6/src/build_training_set_triviaqa.py'],
  ['Sample','Confidence','Let repeated answers inform the label.','The pipeline samples answers repeatedly and grades them to construct confidence labels for the training examples. These labels are part of a research method, not guarantees of correctness.',''],
  ['Tune','Training','One adapter. A variable threshold.','Parameter-efficient LoRA training teaches the model to condition its response on a threshold supplied in the prompt, rather than requiring a separately trained adapter at every setting.','/blob/410d5bdf45b9f4c31f2ce7b427dc8ed6233c3cf6/src/step5_train_new.py'],
  ['Decide','Inference','Answer—or explicitly abstain.','The tuned model is prompted with a threshold. Its response is then classified as an answer or an abstention. A higher threshold changes behaviour; it is not itself a calibrated probability.','/blob/410d5bdf45b9f4c31f2ce7b427dc8ed6233c3cf6/src/step6_eval_new.py'],
  ['Evaluate','Evidence','Count what was answered, too.','Evaluation tracks incorrect answers, answer coverage and accuracy among answered questions. The SimpleQA boundary test matters: at high thresholds the tuned model answers almost nothing.','/blob/410d5bdf45b9f4c31f2ce7b427dc8ed6233c3cf6/src/analysis/stats_tests.py']
 ]},
 community:{label:'Community-centre booking application',caveat:'Project in development. This is a flow explanation, not a live booking form. Email currently logs rather than sends.',base:'https://github.com/AkankshCaimi/community-centre-website',steps:[
  ['Request','Interface','Start with the visitor’s request.','A React interface collects a booking request and submits it to a Flask API. The portfolio explains the implemented flow without creating a real booking.',''],
  ['Validate','Boundary','Check before writing.','The booking service validates input, checks CAPTCHA and applies rate and active-booking limits before accepting the request.','/blob/ffb258d3d845b9bc2cf24fec79ef5f7d38a7020a/backend/app/services/booking_service.py'],
  ['Store','Persistence','Make the database part of the decision.','The service takes a database lock before inserting the request into PostgreSQL. Submission controls belong in the service and persistence layer as well as the interface.','/blob/ffb258d3d845b9bc2cf24fec79ef5f7d38a7020a/backend/app/services/booking_service.py'],
  ['Review','State','Give administrators an explicit next step.','Administrator workflows handle review and controlled booking-state changes. Scheduled job code handles automatic declines; running those jobs requires an external scheduler.',''],
  ['Verify','Delivery','Check the system around the feature.','GitHub Actions runs linting, backend/frontend tests and a container build. Database-backed tests start against a fresh PostgreSQL instance. The inspected commit passed its CI run.','/actions/runs/38577402574']
 ]},
 riscv:{label:'32-bit RISC-V simulator',caveat:'An explanatory pipeline diagram, not an in-browser emulator. The original simulator is a four-person team project.',base:'https://github.com/AkankshCaimi/CS204-RISCV-Sim',steps:[
  ['Fetch','Instruction','Bring the next instruction into view.','Instruction fetch starts the simulator’s execution path. The project includes instruction-cache behaviour as part of its staged implementation.',''],
  ['Decode','Operands','Turn bits into an operation.','The decode stage identifies the operation and operands. The project exposes processor state through a Python interface.',''],
  ['Execute','Computation','Apply the operation.','Execution performs the operation. The pipelined implementation includes hazard handling, forwarding and branch-prediction logic.',''],
  ['Memory','Data','Read or write when the instruction requires it.','The memory stage handles data access. Separate instruction and data caches provide an additional layer of system behaviour to inspect.',''],
  ['Write back','State','Make the result part of the machine state.','Writeback completes the instruction’s result path. The repository contains sequential and pipelined variants plus design documentation; no claim of full ISA compliance is made.','']
 ]}
};
let current='abstention',step=0;
const flow=document.querySelector('.flow');
function showStage(){
 const f=flows[current],s=f.steps[step];
 document.querySelector('#flow-label').textContent=f.label.toUpperCase();
 document.querySelector('#stage-count').textContent=String(step+1).padStart(2,'0')+'—05';
 document.querySelector('.stage-number').textContent=String(step+1).padStart(2,'0');
 document.querySelector('#stage-kind').textContent=s[1];
 document.querySelector('#stage-title').textContent=s[2];
 document.querySelector('#stage-copy').textContent=s[3];
 document.querySelector('#stage-source').href=f.base+s[4];
 document.querySelector('#flow-caveat').textContent=f.caveat;
 [...flow.children].forEach((b,i)=>{if(i===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 document.querySelector('#next-stage').firstChild.textContent=step===4?'Back to start ':'Next stage ';
}
function buildFlow(){
 flow.replaceChildren(...flows[current].steps.map((s,i)=>{const b=document.createElement('button');const n=document.createElement('span');n.textContent=String(i+1).padStart(2,'0');b.append(n,document.createTextNode(s[0]));b.setAttribute('aria-label',`Stage ${i+1}: ${s[0]}`);b.addEventListener('click',()=>{step=i;showStage();});return b;}));showStage();
}
document.querySelectorAll('[data-system]').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.system;step=0;document.querySelectorAll('[data-system]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));buildFlow();}));
document.querySelector('#next-stage').addEventListener('click',()=>{step=(step+1)%5;showStage();});
buildFlow();
function addText(tag,text,parent){const e=document.createElement(tag);e.textContent=text;parent.append(e);return e;}
fetch('../assets/content.json').then(r=>{if(!r.ok)throw new Error('Content unavailable');return r.json();}).then(data=>{
 const list=document.querySelector('#project-list');
 for(const [i,p] of data.projects.entries()){
  const d=document.createElement('details'),s=document.createElement('summary');addText('span',String(i+1).padStart(2,'0'),s);const title=addText('div','',s);addText('strong',p.title,title);addText('small',p.subtitle+' / '+p.status,title);addText('span',p.category,s);const plus=addText('span','+',s);plus.className='plus';plus.setAttribute('aria-hidden','true');d.append(s);
  const record=addText('div','',d);record.className='record';
  for(const [key,label] of [['question','The question'],['contribution','My contribution'],['implementation','Implementation'],['evidence','Evidence'],['limits','Scope & limits']]){const b=addText('div','',record);addText('h4',label,b);addText('p',p[key],b);}
  const links=addText('div','',record);links.className='links';for(const l of p.links){const a=addText('a',l.label+' ↗',links);a.href=l.url;}
  list.append(d);
 }
}).catch(()=>{const list=document.querySelector('#project-list');addText('p','Project records are temporarily unavailable. Explore the source work on GitHub.',list);const a=addText('a','View Akanksh’s repositories ↗',list);a.href='https://github.com/AkankshCaimi';});
