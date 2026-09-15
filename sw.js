const C='miami-v8-distanze';
const DIST=[
['Key Biscayne — Crandon + Cape Florida','🚗 ~55 km A/R'],
['Oleta River State Park','🚗 ~55 km A/R'],
['Miami completa — Wynwood, Design District, Little Havana, Coconut Grove','🚗 ~50 km totali'],
['Vizcaya + Coconut Grove + Coral Gables','🚗 ~50 km totali'],
['Fairchild Tropical Garden + Deering Estate','🚗 ~75 km A/R'],
['Zoo Miami','🚗 ~100 km A/R'],
['Coral Castle + Homestead','🚗 ~120 km A/R'],
['Everglades — Shark Valley','🚗 ~145 km A/R'],
['Everglades completa — Homestead, Anhinga Trail, Flamingo','🚗 ~270 km A/R'],
['Biscayne National Park','🚗 ~150 km A/R'],
['Key Largo — John Pennekamp','🚗 ~210 km A/R'],
['Islamorada + Upper Keys','🚗 ~260 km A/R'],
['Key West','🚗 ~540 km A/R'],
['Fort Lauderdale + Hollywood Beach','🚗 ~100 km A/R']
];
function addDistances(t){for(const [name,d] of DIST){const h='<h3>';const pos=t.indexOf(name);if(pos<0)continue;const end=t.indexOf('</h3>',pos);if(end<0)continue;const after=end+5;const next=t.slice(after,after+350);if(next.includes(d))continue;const secondPillEnd=(()=>{const a=t.indexOf('</span>',after);if(a<0)return -1;const b=t.indexOf('</span>',a+7);return b<0?-1:b+7})();if(secondPillEnd>0)t=t.slice(0,secondPillEnd)+'<span class="pill">'+d+'</span>'+t.slice(secondPillEnd)}return t}
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.mode==='navigate'&&u.origin===location.origin){e.respondWith(fetch(e.request).then(async r=>{let t=await r.text();t=addDistances(t);return new Response(t,{status:r.status,statusText:r.statusText,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-cache'}})}).catch(()=>caches.match('./index.html')));return}e.respondWith(fetch(e.request).then(r=>{let q=r.clone();caches.open(C).then(c=>c.put(e.request,q));return r}).catch(()=>caches.match(e.request)))});