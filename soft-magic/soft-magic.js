/* Soft Magic - drop-in tiger-eye cursor. No sound. Respects prefers-reduced-motion.
   Turn off: SoftMagic.off()  |  <html data-soft-magic="off">  |  localStorage.softMagic="off"  |  ?softmagic=off */
(function(){
  'use strict';
  var d=document, root=d.documentElement, w=window;
  var SVG='<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
   '<defs><radialGradient id="smIris" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="#FFECB4"/><stop offset=".45" stop-color="#FFB020"/><stop offset="1" stop-color="#B8600E"/></radialGradient>'+
   '<radialGradient id="smHalo"><stop offset="0" stop-color="#FFB020" stop-opacity=".55"/><stop offset="1" stop-color="#FFB020" stop-opacity="0"/></radialGradient></defs>'+
   '<circle class="sm-halo" cx="16" cy="16" r="17" fill="url(#smHalo)"/>'+
   '<g fill="#FFD28C"><path class="sm-star" d="M16 -4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/><path class="sm-star" d="M33 22l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path class="sm-star" d="M-1 22l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></g>'+
   '<path d="M2 16Q16 4 30 16Q16 28 2 16Z" fill="#06040C"/><path d="M4.5 16Q16 6.5 27.5 16Q16 25.5 4.5 16Z" fill="#FFC85A"/>'+
   '<circle cx="16" cy="16" r="6.6" fill="url(#smIris)" stroke="#963F0A" stroke-width=".7"/>'+
   '<ellipse class="sm-pupil" cx="16" cy="16" rx="1.4" ry="6.1" fill="#06040C"/><circle cx="18.4" cy="13.3" r="1" fill="#fff" opacity=".9"/></svg>';
  function disabled(){ try{ if(/[?&]softmagic=off/.test(location.search)) return true; if(localStorage.getItem('softMagic')==='off') return true; }catch(e){} return root.getAttribute('data-soft-magic')==='off'; }
  var mq=w.matchMedia?w.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
  var fine=w.matchMedia?!w.matchMedia('(pointer: coarse)').matches:true;
  var layer,eye,cv,ctx,pts=[],x=-100,y=-100,raf=0,on=false;
  function mk(){
    layer=d.createElement('div'); layer.id='sm-layer';
    cv=d.createElement('canvas'); cv.id='sm-trail'; layer.appendChild(cv); ctx=cv.getContext('2d');
    eye=d.createElement('div'); eye.id='sm-eye'; eye.innerHTML=SVG; layer.appendChild(eye);
    d.body.appendChild(layer); size();
  }
  function size(){ if(!cv) return; var r=w.devicePixelRatio||1; cv.width=innerWidth*r; cv.height=innerHeight*r; ctx.setTransform(r,0,0,r,0,0); }
  function move(e){ x=e.clientX; y=e.clientY; if(!mq.matches){ pts.push({x:x,y:y,t:performance.now()}); if(pts.length>14) pts.shift(); } if(!raf) raf=requestAnimationFrame(frame); }
  function frame(){
    raf=0; eye.style.transform='translate3d('+x+'px,'+y+'px,0)';
    ctx.clearRect(0,0,innerWidth,innerHeight);
    var now=performance.now(); pts=pts.filter(function(p){return now-p.t<260;});
    for(var i=0;i<pts.length;i++){ var p=pts[i], a=1-(now-p.t)/260; ctx.beginPath(); ctx.fillStyle='rgba(255,176,32,'+(a*.55)+')'; ctx.arc(p.x,p.y,1+a*2.4,0,7); ctx.fill(); }
    if(pts.length) raf=requestAnimationFrame(frame);
  }
  function click(e){ if(mq.matches) return; var r=d.createElement('span'); r.className='sm-ripple'; r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px'; layer.appendChild(r); setTimeout(function(){r.remove();},650); }
  function leave(){ eye.style.opacity='0'; } function enter(){ eye.style.opacity='1'; }
  function start(){
    if(on) return; on=true; root.classList.add('sm-on');
    if(!fine) return;            // touch devices: accent vars only
    if(!layer) mk(); layer.style.display='';
    root.classList.add('sm-live');
    addEventListener('pointermove',move,{passive:true}); addEventListener('pointerdown',click,{passive:true});
    addEventListener('resize',size); d.addEventListener('mouseleave',leave); d.addEventListener('mouseenter',enter);
  }
  function stop(){
    on=false; root.classList.remove('sm-on','sm-live'); if(layer) layer.style.display='none';
    removeEventListener('pointermove',move); removeEventListener('pointerdown',click); removeEventListener('resize',size);
    d.removeEventListener('mouseleave',leave); d.removeEventListener('mouseenter',enter);
  }
  w.SoftMagic={ on:function(){ try{localStorage.removeItem('softMagic');}catch(e){} start(); }, off:function(){ try{localStorage.setItem('softMagic','off');}catch(e){} stop(); }, get active(){return on;}, sound:'none' };
  function boot(){ if(!disabled()) start(); }
  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',boot); else boot();
})();
