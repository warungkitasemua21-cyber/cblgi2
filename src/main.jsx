import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import * as XLSX from "xlsx";
import "./style.css";

const get=(k)=>JSON.parse(localStorage.getItem(k)||"[]");
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

function App(){

const [sales,setSales]=useState(get("sales"));
const [offline,setOffline]=useState(get("offline"));
const [digital,setDigital]=useState(get("digital"));
const [menu,setMenu]=useState("dashboard");

const [master,setMaster]=useState({
name:"",phone:"",address:"",target:""
});

const [form,setForm]=useState({});
const [dm,setDm]=useState({});

function saveSales(){
let x=[...sales,master];
setSales(x);save("sales",x);
setMaster({name:"",phone:"",address:"",target:""});
}

function saveOffline(){
let x=[...offline,form];
setOffline(x);save("offline",x);
setForm({});
}

function saveDigital(){
let x=[...digital,dm];
setDigital(x);save("digital",x);
setDm({});
}

function exportExcel(){
let wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(offline),"Input Database");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(digital),"Digital Marketing Activity");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(sales),"Master Sales");
XLSX.writeFile(wb,"Jagara_CRM_Report.xlsx");
}

const site=offline.filter(x=>x.activity==="Site Visit").length;
const proposal=offline.filter(x=>x.activity==="Proposal").length;
const booking=offline.filter(x=>x.activity==="Booking").length;

return <div className="layout">

<aside>
<h1>JAGARA CRM</h1>
<button onClick={()=>setMenu("dashboard")}>CEO Dashboard</button>
<button onClick={()=>setMenu("master")}>Master Sales</button>
<button onClick={()=>setMenu("offline")}>Input Database Sales</button>
<button onClick={()=>setMenu("digital")}>Digital Marketing Activity</button>
<button onClick={()=>setMenu("kpi")}>KPI Scorecard</button>
<button onClick={exportExcel}>Download Excel</button>
</aside>

<main>
<h1>Jagara Eco Park Performance System</h1>

{menu==="dashboard"&&<div className="cards">
<Card t="Sales Activity" v={offline.length}/>
<Card t="Digital Activity" v={digital.length}/>
<Card t="Site Visit" v={site}/>
<Card t="Booking" v={booking}/>
</div>}

{menu==="master"&&<Panel title="Master Sales">
<input placeholder="Nama Sales" value={master.name} onChange={e=>setMaster({...master,name:e.target.value})}/>
<input placeholder="Nomor HP" value={master.phone} onChange={e=>setMaster({...master,phone:e.target.value})}/>
<input placeholder="Alamat" value={master.address} onChange={e=>setMaster({...master,address:e.target.value})}/>
<input placeholder="Target Revenue" value={master.target} onChange={e=>setMaster({...master,target:e.target.value})}/>
<button onClick={saveSales}>Simpan Sales</button>
</Panel>}

{menu==="offline"&&<Panel title="Input Database Sales Offline">
<input placeholder="Customer" onChange={e=>setForm({...form,customer:e.target.value})}/>
<select onChange={e=>setForm({...form,segment:e.target.value})}>
<option>Corporate</option><option>School</option><option>Family</option><option>Community</option>
</select>
<select onChange={e=>setForm({...form,activity:e.target.value})}>
<option>Inquiry</option><option>Follow Up</option><option>Site Visit</option><option>Proposal</option><option>Quotation</option><option>Booking</option>
</select>
<input placeholder="Source Lead" onChange={e=>setForm({...form,source:e.target.value})}/>
<input placeholder="Product" onChange={e=>setForm({...form,product:e.target.value})}/>
<input placeholder="Revenue" onChange={e=>setForm({...form,revenue:e.target.value})}/>
<input placeholder="Next Action" onChange={e=>setForm({...form,next:e.target.value})}/>
<input type="file"/>
<button onClick={saveOffline}>Simpan Aktivitas</button>
</Panel>}

{menu==="digital"&&<Panel title="Digital Marketing Activity">
<input placeholder="PIC Digital Marketing" onChange={e=>setDm({...dm,pic:e.target.value})}/>
<select onChange={e=>setDm({...dm,platform:e.target.value})}>
<option>Instagram</option><option>TikTok</option><option>Facebook</option><option>Google</option><option>WhatsApp</option>
</select>
<input placeholder="Jenis Aktivitas" onChange={e=>setDm({...dm,type:e.target.value})}/>
<input placeholder="Campaign/Program" onChange={e=>setDm({...dm,campaign:e.target.value})}/>
<input placeholder="Content Created" onChange={e=>setDm({...dm,content:e.target.value})}/>
<input placeholder="Reach" onChange={e=>setDm({...dm,reach:e.target.value})}/>
<input placeholder="WhatsApp Lead" onChange={e=>setDm({...dm,lead:e.target.value})}/>
<input placeholder="Booking Generated" onChange={e=>setDm({...dm,booking:e.target.value})}/>
<input placeholder="Revenue Generated" onChange={e=>setDm({...dm,revenue:e.target.value})}/>
<input type="file"/>
<button onClick={saveDigital}>Simpan Campaign</button>
</Panel>}

{menu==="kpi"&&<Panel title="KPI Scorecard">
<table>
<tr><td>Sales Activity</td><td>40%</td></tr>
<tr><td>Sales Result</td><td>35%</td></tr>
<tr><td>Digital Marketing</td><td>25%</td></tr>
</table>
</Panel>}

</main></div>
}

function Panel(p){return <div className="panel"><h2>{p.title}</h2>{p.children}</div>}
function Card(p){return <div className="card"><b>{p.t}</b><h2>{p.v}</h2></div>}

createRoot(document.getElementById("root")).render(<App/>);