import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import * as XLSX from 'xlsx';
import './style.css';

function App(){

const [sales,setSales]=useState([]);
const [activities,setActivities]=useState([]);
const [digital,setDigital]=useState([]);
const [page,setPage]=useState('dashboard');

const [master,setMaster]=useState([]);

const addSales=()=>{
setMaster([...master,{
name:'New Sales',
phone:'',
target:''
}]);
};

const exportExcel=()=>{
let wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(activities),'Input Database');
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(digital),'Digital Marketing Activity');
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(master),'Master Sales');
XLSX.writeFile(wb,'Jagara_CRM_Report.xlsx');
};

return <div className="layout">

<aside>
<h1>JAGARA</h1>
<button onClick={()=>setPage('dashboard')}>CEO Dashboard</button>
<button onClick={()=>setPage('master')}>Master Sales</button>
<button onClick={()=>setPage('sales')}>Sales Activity Input</button>
<button onClick={()=>setPage('digital')}>Digital Marketing Input</button>
<button onClick={()=>setPage('kpi')}>KPI Scorecard</button>
<button onClick={exportExcel}>Download Excel</button>
</aside>

<main>

<h1>Jagara Eco Park CRM</h1>

{page==='dashboard' &&
<div className="panel">
<h2>CEO Overview</h2>
<div className="cards">
<Card t="Total Sales" v={master.length}/>
<Card t="Sales Activity" v={activities.length}/>
<Card t="Digital Activity" v={digital.length}/>
<Card t="Revenue" v="Rp 0"/>
</div>
<p>Dashboard akan aktif setelah data input dilakukan.</p>
</div>
}

{page==='master' &&
<div className="panel">
<h2>Master Data Sales</h2>
<button onClick={addSales}>Tambah Sales</button>
<table>
<tr><th>Nama</th><th>Phone</th><th>Target</th></tr>
{master.map(x=><tr><td>{x.name}</td><td>{x.phone}</td><td>{x.target}</td></tr>)}
</table>
</div>
}

{page==='sales' &&
<Form title="Sales Activity Input">
<input placeholder="Nama Sales"/>
<input placeholder="Customer"/>
<select>
<option>Inquiry</option>
<option>Follow Up</option>
<option>Site Visit</option>
<option>Proposal</option>
<option>Quotation</option>
<option>Booking</option>
</select>
<input placeholder="Revenue"/>
<input type="file"/>
<button>Simpan</button>
</Form>
}

{page==='digital' &&
<Form title="Digital Marketing Activity">
<input placeholder="PIC Digital Marketing"/>
<select>
<option>Instagram</option>
<option>TikTok</option>
<option>Facebook</option>
<option>Google</option>
</select>
<input placeholder="Campaign"/>
<input placeholder="Reach"/>
<input placeholder="Lead"/>
<input placeholder="Revenue"/>
<input type="file"/>
<button>Simpan</button>
</Form>
}

{page==='kpi' &&
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

function Form({title,children}){
return <div className="panel"><h2>{title}</h2>{children}</div>
}

function Card({t,v}){
return <div className="card"><b>{t}</b><h2>{v}</h2></div>
}

createRoot(document.getElementById('root')).render(<App/>);