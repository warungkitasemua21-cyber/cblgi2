import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import * as XLSX from "xlsx";
import "./style.css";

function App(){

const [sales,setSales]=useState([]);
const [activities,setActivities]=useState([]);
const [digital,setDigital]=useState([]);
const [menu,setMenu]=useState("dashboard");

const addSales=()=>{
setSales([...sales,{
name:"Sales Baru",
phone:"",
target:0
}]);
};

const exportExcel=()=>{
let wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(sales),"Master Sales");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(activities),"Input Database");
XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(digital),"Digital Marketing");
XLSX.writeFile(wb,"Jagara_CRM_Report.xlsx");
};

return <div className="layout">

<aside>
<h1>JAGARA CRM</h1>

<button onClick={()=>setMenu("dashboard")}>CEO Dashboard</button>
<button onClick={()=>setMenu("master")}>Master Sales</button>
<button onClick={()=>setMenu("offline")}>Sales Offline Input</button>
<button onClick={()=>setMenu("digital")}>Digital Marketing Input</button>
<button onClick={()=>setMenu("kpi")}>KPI Scorecard</button>
<button onClick={exportExcel}>Download Excel</button>

</aside>

<main>

<h1>Jagara Eco Park Performance System</h1>

{menu==="dashboard" &&
<div className="panel">

<h2>CEO Overview</h2>

<div className="cards">
<Card t="Total Sales" v={sales.length}/>
<Card t="Sales Activity" v={activities.length}/>
<Card t="Digital Activity" v={digital.length}/>
<Card t="KPI Score" v="Waiting Data"/>
</div>

<p>
Dashboard dimulai dari kondisi kosong.
Data akan muncul setelah input dilakukan.
</p>

</div>
}


{menu==="master" &&
<div className="panel">
<h2>Master Sales</h2>

<button onClick={addSales}>
Tambah Sales
</button>

<table>
<tr>
<th>Nama</th>
<th>Phone</th>
<th>Target</th>
</tr>

{sales.map(s=>
<tr>
<td>{s.name}</td>
<td>{s.phone}</td>
<td>{s.target}</td>
</tr>
)}

</table>

</div>
}


{menu==="offline" &&
<div className="panel">

<h2>Sales Offline Activity Input</h2>

<select>
<option>Pilih Sales</option>
{sales.map(s=><option>{s.name}</option>)}
</select>

<select>
<option>Inquiry</option>
<option>Follow Up</option>
<option>Site Visit</option>
<option>Proposal</option>
<option>Quotation</option>
<option>Booking</option>
</select>

<input placeholder="Customer"/>
<input placeholder="Revenue"/>

<input type="file"/>

<button>
Simpan Aktivitas
</button>

</div>
}


{menu==="digital" &&
<div className="panel">

<h2>Digital Marketing Activity Input</h2>

<select>
<option>Pilih PIC</option>
</select>

<select>
<option>Instagram</option>
<option>TikTok</option>
<option>Facebook</option>
<option>Google</option>
<option>WhatsApp</option>
</select>

<input placeholder="Campaign"/>
<input placeholder="Reach"/>
<input placeholder="Lead"/>
<input placeholder="Revenue Generated"/>

<input type="file"/>

<button>
Simpan Campaign
</button>

</div>
}


{menu==="kpi" &&
<div className="panel">

<h2>KPI Scorecard</h2>

<table>
<tr>
<th>KPI</th>
<th>Bobot</th>
</tr>

<tr>
<td>Sales Activity</td>
<td>40%</td>
</tr>

<tr>
<td>Sales Result</td>
<td>35%</td>
</tr>

<tr>
<td>Digital Marketing</td>
<td>25%</td>
</tr>

</table>

</div>
}

</main>

</div>
}


function Card({t,v}){
return <div className="card">
<b>{t}</b>
<h2>{v}</h2>
</div>
}

createRoot(document.getElementById("root")).render(<App/>);