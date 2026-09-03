import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import * as XLSX from "xlsx";
import "./style.css";

function App(){

const [sales,setSales]=useState([]);
const [activity,setActivity]=useState([]);
const [digital,setDigital]=useState([]);
const [menu,setMenu]=useState("dashboard");

const [master,setMaster]=useState({name:"",phone:"",target:""});
const [form,setForm]=useState({});

function addMaster(){
setSales([...sales,master]);
setMaster({name:"",phone:"",target:""});
}

function addActivity(){
setActivity([...activity,form]);
setForm({});
}

function exportExcel(){
let wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(sales),"Master Sales");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(activity),"Input Database");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(digital),"Digital Marketing");
XLSX.writeFile(wb,"Jagara_CRM_V5_Report.xlsx");
}

let revenue=activity.reduce((a,b)=>a+Number(b.revenue||0),0);

return <div className="layout">

<aside>
<h1>JAGARA CRM V5</h1>
<button onClick={()=>setMenu("dashboard")}>CEO Dashboard</button>
<button onClick={()=>setMenu("master")}>Master Sales</button>
<button onClick={()=>setMenu("sales")}>Sales Activity</button>
<button onClick={()=>setMenu("digital")}>Digital Marketing</button>
<button onClick={()=>setMenu("kpi")}>KPI Scorecard</button>
<button onClick={exportExcel}>Download Excel</button>
</aside>

<main>

<h1>Jagara Eco Park Performance System</h1>

{menu==="dashboard"&&
<div className="cards">
<Card t="Total Sales" v={sales.length}/>
<Card t="Sales Activity" v={activity.length}/>
<Card t="Digital Activity" v={digital.length}/>
<Card t="Revenue" v={"Rp "+revenue}/>
</div>
}

{menu==="master"&&
<div className="panel">
<h2>Master Sales</h2>
<input placeholder="Nama Sales" value={master.name}
onChange={e=>setMaster({...master,name:e.target.value})}/>
<input placeholder="Nomor HP"
onChange={e=>setMaster({...master,phone:e.target.value})}/>
<input placeholder="Target Revenue"
onChange={e=>setMaster({...master,target:e.target.value})}/>
<button onClick={addMaster}>Simpan Sales</button>
</div>
}

{menu==="sales"&&
<div className="panel">
<h2>Sales Offline Activity Input</h2>

<select>
<option>Pilih Sales</option>
{sales.map(s=><option>{s.name}</option>)}
</select>

<select onChange={e=>setForm({...form,activity:e.target.value})}>
<option>Inquiry</option>
<option>Follow Up</option>
<option>Meeting</option>
<option>Site Visit</option>
<option>Proposal</option>
<option>Quotation</option>
<option>Booking</option>
</select>

<select onChange={e=>setForm({...form,segment:e.target.value})}>
<option>Corporate</option>
<option>School</option>
<option>Family</option>
<option>Community</option>
</select>

<input placeholder="Customer"
onChange={e=>setForm({...form,customer:e.target.value})}/>
<input placeholder="Source Lead"
onChange={e=>setForm({...form,source:e.target.value})}/>
<input placeholder="Revenue"
onChange={e=>setForm({...form,revenue:e.target.value})}/>
<input placeholder="Next Action"
onChange={e=>setForm({...form,next:e.target.value})}/>
<input type="file"/>

<button onClick={addActivity}>Simpan Aktivitas</button>
</div>
}

{menu==="digital"&&
<div className="panel">
<h2>Digital Marketing KPI Input</h2>
<input placeholder="PIC Marketing"/>
<select>
<option>Instagram</option>
<option>TikTok</option>
<option>Facebook</option>
<option>Google</option>
<option>WhatsApp</option>
</select>
<input placeholder="Campaign"/>
<input placeholder="Content Published"/>
<input placeholder="Reach"/>
<input placeholder="Impression"/>
<input placeholder="Engagement"/>
<input placeholder="WhatsApp Lead"/>
<input placeholder="Booking Generated"/>
<input placeholder="Revenue Generated"/>
<input type="file"/>
<button>Simpan Campaign</button>
</div>
}

{menu==="kpi"&&
<div className="panel">
<h2>KPI Scorecard</h2>
<table>
<tr><td>Sales Activity</td><td>40%</td></tr>
<tr><td>Sales Result</td><td>35%</td></tr>
<tr><td>Digital Marketing</td><td>25%</td></tr>
</table>
</div>
}

</main>
</div>
}

function Card({t,v}){return <div className="card"><b>{t}</b><h2>{v}</h2></div>}

createRoot(document.getElementById("root")).render(<App/>);