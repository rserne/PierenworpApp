const CACHE='pierenworp-v6';
const ASSETS=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  const font=url.host==='fonts.googleapis.com'||url.host==='fonts.gstatic.com';
  if(url.origin!==location.origin&&!font) return;
  e.respondWith(caches.match(req,{ignoreSearch:url.origin===location.origin}).then(hit=>{
    const net=fetch(req).then(res=>{if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res}).catch(()=>hit||(req.mode==='navigate'?caches.match('index.html'):undefined));
    return hit||net;
  }));
});
