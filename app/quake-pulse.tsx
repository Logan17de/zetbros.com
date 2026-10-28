"use client";
import { useEffect, useState } from "react";
type Snapshot = { count: number; strongest: number | null };
export default function QuakePulse() {
 const [data,setData]=useState<Snapshot|null>(null);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const ctrl=new AbortController();
  async function refresh(){
   try{
    const response=await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",{cache:"no-store",signal:ctrl.signal});
    if(!response.ok) throw new Error("Feed failure");
    const body=await response.json();
    if(!Array.isArray(body.features)) throw new Error("Bad feed");
    const mags:number[]=body.features.map((f:{properties?:{mag?:unknown}})=>f.properties?.mag).filter((x:unknown):x is number=>typeof x==="number" && Number.isFinite(x));
    setData({count:mags.length,strongest:mags.length?Math.max(...mags):null});setFailed(false);
   }catch{if(!ctrl.signal.aborted)setFailed(true);}
  }
  void refresh();const timer=setInterval(()=>{void refresh();},300000);
  return()=>{ctrl.abort();clearInterval(timer);};
 },[]);
 return <div className="quakoPulse" aria-live="polite">
  <div><span>M4.5+ / PAST 7 DAYS</span><strong>{data?data.count.toLocaleString():failed?"Unavailable":"Loading…"}</strong></div>
  <div><span>LARGEST REPORTED</span><strong>{data?.strongest!=null?"M "+data.strongest.toFixed(1):data?"None":"—"}</strong></div>
  <small>{data?"USGS reported events · refreshed every 5 minutes":failed?"USGS feed temporarily unavailable":"Connecting to USGS"}</small>
 </div>;
}
