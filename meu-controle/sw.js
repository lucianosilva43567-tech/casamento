const C="meucontrole-v13-reports";const F=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
const REPORTS=new Set(["https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js","https://cdn.jsdelivr.net/npm/jspdf-autotable@5.0.9/dist/jspdf.plugin.autotable.min.js","https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"]);
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
if(REPORTS.has(u.href)){e.respondWith(caches.open(C).then(async c=>{const cached=await c.match(e.request);if(cached)return cached;const response=await fetch(e.request);if(response.ok)await c.put(e.request,response.clone());return response}));return}
const cacheable=u.origin===location.origin||u.hostname==="cdn.jsdelivr.net"||u.hostname.endsWith("googleapis.com")||u.hostname.endsWith("gstatic.com");if(!cacheable)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))))});
