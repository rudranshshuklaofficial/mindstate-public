import {createRoot} from 'react-dom/client';
import {useEffect,useState,useRef} from 'react';
import {MotionConfig,useReducedMotion} from 'motion/react';
import {OtpInput} from './components/arc/otp-input/otp-input';
import {Accordion} from './components/arc/accordion/accordion';
import {Dialog,DialogContent} from './components/arc/dialog/dialog';
import {Select} from './components/arc/select/select';
import {FileDropzone} from './components/arc/file-dropzone/file-dropzone';
import {CopyButton} from './components/arc/copy-button/copy-button';
import {CodeBlock} from './components/arc/code-block/code-block';
import {Tabs,TabsList,TabsTrigger,TabsContent} from './components/arc/tabs/tabs';
import {Button} from './components/arc/button/button';
import {EmptyState} from './components/arc/empty-state/empty-state';
import {Tooltip} from './components/arc/tooltip/tooltip';
import './style.css';

function Policy({children}:{children:React.ReactNode}) {const reduced=useReducedMotion();return <MotionConfig reducedMotion="always" transition={{duration:reduced?0:.15}}>{children}</MotionConfig>;}
function mount(node:HTMLElement,content:React.ReactNode) {createRoot(node).render(<Policy>{content}</Policy>);}
function island(after:Element,tag='div') {const node=document.createElement(tag);node.className='ms-island';after.after(node);return node;}
function changed(input:HTMLInputElement|HTMLSelectElement) {input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}
function conceal(input:HTMLElement) {input.classList.add('ms-native');input.setAttribute('aria-hidden','true');input.tabIndex=-1;}
function invalidFocus(input:HTMLInputElement|HTMLSelectElement,ref:React.RefObject<HTMLElement|null>) {const handler=(e:Event)=>{e.preventDefault();ref.current?.querySelector<HTMLElement>('input,button')?.focus();};input.addEventListener('invalid',handler);return()=>input.removeEventListener('invalid',handler);}

function Otp({input}:{input:HTMLInputElement}) {
 const [value,setValue]=useState(input.value);const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{conceal(input);return invalidFocus(input,ref);},[]);
 return <div ref={ref}><OtpInput value={value} label="Six-digit verification code" inputMode="numeric" onChange={code=>{setValue(code);input.value=code;changed(input);}}/></div>;
}
document.querySelectorAll<HTMLInputElement>('[data-otp-input]').forEach(input=>{const node=island(input);mount(node,<Otp input={input}/>);input.labels?.[0]?.addEventListener('click',e=>{e.preventDefault();node.querySelector('input')?.focus();});});

function Choice({select}:{select:HTMLSelectElement}) {
 const [value,setValue]=useState(select.value);const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{conceal(select);select.parentElement?.querySelectorAll('.choice-trigger,.choice-options').forEach(n=>n.remove());const sync=()=>setValue(select.value);select.addEventListener('change',sync);const cleanup=invalidFocus(select,ref);return()=>{cleanup();select.removeEventListener('change',sync);};},[]);
 const label=select.labels?.[0]?.textContent||select.getAttribute('aria-label')||'Choose an option';
 return <div ref={ref} className="ms-choice"><Select label={label} id={select.id+'-arc'} value={value||'__empty__'} disabled={select.disabled} options={Array.from(select.options).map(opt=>({value:opt.value||'__empty__',label:opt.text,disabled:opt.disabled}))} onValueChange={next=>{select.value=next==='__empty__'?'':next;setValue(select.value);changed(select);}}/></div>;
}
document.querySelectorAll<HTMLSelectElement>('.app-main select:not([multiple])').forEach(select=>{const node=island(select);node.classList.add("ms-select-island");mount(node,<Choice select={select}/>);select.labels?.[0]?.addEventListener('click',e=>{e.preventDefault();node.querySelector('button')?.focus();});});

function Note({details}:{details:HTMLDetailsElement}) {const summary=details.querySelector('summary')!;const body=useRef<HTMLDivElement>(null);useEffect(()=>{Array.from(details.children).filter(n=>n!==summary).forEach(n=>body.current?.append(n));details.hidden=true;},[]);return <Accordion defaultOpen={details.open?0:-1} items={[{title:summary.textContent||'Details',content:<div ref={body}/>}]} />;}
document.querySelectorAll<HTMLDetailsElement>('details[data-enhance-disclosure]').forEach(details=>{const node=island(details,'section');node.classList.add('workspace-panel');mount(node,<Note details={details}/>);});
// Review appearance links remain links: the server owns each revision view.

function Upload({input,box}:{input:HTMLInputElement,box:HTMLElement}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{conceal(input);box.classList.add('ms-upload-enhanced');return invalidFocus(input,ref);},[]);
 const label=input.labels?.[0]?.textContent?.trim()||'Choose a file';
 return <div ref={ref}><FileDropzone multiple={input.multiple} maxFiles={input.multiple?5:1} accept={input.accept||undefined} label={label} description="Choose or drop a file. Choose again to replace it." maxSize={input.hasAttribute("data-card-photo")?5*1024*1024:undefined} note={input.dataset.uploadNote||"Files are saved only when you submit this form."} onFilesChange={files=>{const transfer=new DataTransfer();files.forEach(file=>transfer.items.add(file));input.files=transfer.files;changed(input);}}/></div>;
}
document.querySelectorAll<HTMLInputElement>('.app-form input[type=file], [data-collaboration-form] input[type=file], [data-card-options] input[type=file]').forEach(input=>{if(input.closest('[data-image-upload]'))return;const box=input.closest<HTMLElement>('.image-picker');const node=island(box||input);mount(node,<Upload input={input} box={box||input}/>);});

function WorkPreview() {
 const trigger=useRef<HTMLElement|null>(null);const [url,setUrl]=useState('');const [image,setImage]=useState<{src:string;alt:string}|null>(null);const [expanded,setExpanded]=useState(false);
 useEffect(()=>{const handler=(e:MouseEvent)=>{const target=e.target as HTMLElement;const link=target.closest<HTMLAnchorElement>('[data-collab-preview]');const button=target.closest<HTMLElement>('[data-expand-image]');if(!link&&!button)return;const photo=button?.querySelector('img');if(button&&!photo)return;e.preventDefault();e.stopImmediatePropagation();trigger.current=link||button;setExpanded(false);if(link){setImage(null);setUrl(link.href+(link.href.includes('?')?'&':'?')+'dialog=1');}else{setUrl('');setImage({src:photo!.src,alt:photo!.alt||'Enlarged submitted image'});}};document.addEventListener('click',handler,true);return()=>document.removeEventListener('click',handler,true);},[]);
 return <Dialog open={!!url||!!image} onOpenChange={open=>{if(!open){setUrl('');setImage(null);}}}><DialogContent title={image?'Enlarged submitted image':'Preview essay / art'} description={image?'Review the submitted image.':'This work belongs to its creator. Do not copy, reuse or publish it without permission.'} className={'ms-island ms-preview '+(expanded?'ms-expanded':'')} onCloseAutoFocus={e=>{e.preventDefault();trigger.current?.focus();}}><button type="button" className="ms-button" onClick={()=>setExpanded(!expanded)}>{expanded?'Reduce':'Expand'}</button>{url&&<iframe title="Collaboration work preview" src={url}/>} {image&&<img className="ms-review-image" src={image.src} alt={image.alt}/>}</DialogContent></Dialog>;
}
if(document.querySelector('[data-collab-preview],[data-expand-image]')){const node=document.createElement('div');document.body.append(node);mount(node,<WorkPreview/>);}

document.querySelectorAll<HTMLElement>('[data-copy-component]').forEach(button=>{const code=button.closest('details')?.querySelector('pre');if(!code)return;const node=island(button);mount(node,<CopyButton value={code.textContent||''} label="Copy code"/>);button.hidden=true;});
document.querySelectorAll<HTMLElement>('.design-component pre').forEach(pre=>{const node=island(pre);mount(node,<CodeBlock code={pre.textContent||''} language="html" maxLines={12}/>);pre.hidden=true;pre.closest('details')?.querySelectorAll('[data-copy-component], [data-copy-component]+.ms-island').forEach(n=>(n as HTMLElement).hidden=true);});

function Submit({original}:{original:HTMLButtonElement}) {const [busy,setBusy]=useState(false);useEffect(()=>{const form=original.form;if(!form)return;const handler=(e:SubmitEvent)=>{if(e.submitter!==original)return;queueMicrotask(()=>{if(!e.defaultPrevented)setBusy(true);});};const restore=()=>setBusy(false);form.addEventListener('submit',handler);window.addEventListener('pageshow',restore);return()=>{form.removeEventListener('submit',handler);window.removeEventListener('pageshow',restore);};},[]);return <Button type="button" className={original.className+' ms-submit'} variant={original.classList.contains('app-outline')?'secondary':'primary'} loading={busy} disabled={original.disabled||busy} onClick={()=>original.form?.requestSubmit(original)}><span dangerouslySetInnerHTML={{__html:original.innerHTML}} /></Button>;}
document.querySelectorAll<HTMLButtonElement>('.app-form button.app-button:not([type=button]):not([name]), .recovery-panel form button.app-button:not([type=button]):not([name])').forEach(original=>{const node=island(original,'span');mount(node,<Submit original={original}/>);original.hidden=true;});

function Empty({empty}:{empty:HTMLElement}) {const action=useRef<HTMLDivElement>(null);useEffect(()=>{empty.querySelectorAll('a,button').forEach(link=>action.current?.append(link));empty.hidden=true;},[]);return <EmptyState title={empty.querySelector('h2,h3')?.textContent||'Nothing here yet.'} description={empty.querySelector('p')?.textContent||empty.textContent||''} label="Empty collection" action={<div ref={action}/>}/>;}
document.querySelectorAll<HTMLElement>('[data-arc-empty]').forEach(empty=>{const node=island(empty);mount(node,<Empty empty={empty}/>);});
function ExistingTooltip({button}:{button:HTMLButtonElement}) {const slot=useRef<HTMLSpanElement>(null);useEffect(()=>{slot.current?.append(button);},[]);return <Tooltip content={button.getAttribute('aria-label')||button.title}><span ref={slot} className="ms-tooltip-anchor"/></Tooltip>;}
document.querySelectorAll<HTMLButtonElement>('.composer-toolbar button[aria-label],.member-card-tools button[aria-label]').forEach(button=>{const node=island(button,'span');mount(node,<ExistingTooltip button={button}/>);});
function Examples(){return <Tabs defaultValue="behaviour"><TabsList aria-label="Component documentation"><TabsTrigger value="behaviour">Behaviour</TabsTrigger><TabsTrigger value="usage">Usage</TabsTrigger></TabsList><TabsContent value="behaviour"><p>Native Django forms remain the source of truth. Enhanced controls retain validation, keyboard access and private-media permissions.</p></TabsContent><TabsContent value="usage"><CodeBlock code={'import { Dialog, DialogContent } from "./components/arc/dialog/dialog";\n// Mount inside the MindState component skin; see frontend/README.md.'} language="tsx"/></TabsContent></Tabs>;}
document.querySelectorAll<HTMLElement>('[data-arc-examples]').forEach(node=>{node.classList.add('ms-island');mount(node,<Examples/>);});
