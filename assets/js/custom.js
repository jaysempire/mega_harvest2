  
  document.addEventListener('DOMContentLoaded', function () {
    // Copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typewriter (kept, non-critical)
    (function typewriter(){
      const el = document.querySelector('.typed-text');
      if(!el) return;
      const texts = ["On the frontline of global evangelism", "Reaching nations with the Gospel", "Training believers worldwide", "Expanding God's Kingdom together"];
      let i=0, j=0, deleting=false;
      function tick(){
        const current = texts[i];
        el.textContent = deleting ? current.slice(0, j--) : current.slice(0, j++);
        if(!deleting && j===current.length+1){ deleting=true; setTimeout(tick,2000); return; }
        if(deleting && j===0){ deleting=false; i=(i+1)%texts.length; setTimeout(tick,500); return; }
        setTimeout(tick, deleting ? 30 : 50);
      }
      setTimeout(tick,800);
    })();

    // COUNTERS — restored and animate when in view
    (function counters(){
      const counters = document.querySelectorAll('.counter');
      if(!counters.length) return;
      const animate = (el) => {
        const target = +el.dataset.target || 0;
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.round(target / 600));
        const run = () => {
          current += step;
          if(current < target){
            el.textContent = current.toLocaleString() + suffix;
            requestAnimationFrame(run);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };
        run();
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if(e.isIntersecting){ animate(e.target); observer.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(c => observer.observe(c));
    })();

    // Parallax minor effect for partner hero
    (function parallaxHero(){
      const hero = document.querySelector('.partner-hero');
      if(!hero) return;
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPosition = `center ${Math.max(-120, -scrolled * 0.12)}px`;
      });
    })();

    // Draggable scroll for events-row (mouse + touch)
    (function dragScroll(){
      const slider = document.getElementById('eventsRow');
      if(!slider) return;
      let isDown=false, startX, scrollLeft;
      slider.addEventListener('mousedown', e => { isDown=true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
      slider.addEventListener('mouseleave', ()=>{ isDown=false; slider.classList.remove('active'); });
      slider.addEventListener('mouseup', ()=>{ isDown=false; slider.classList.remove('active'); });
      slider.addEventListener('mousemove', e => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.6;
        slider.scrollLeft = scrollLeft - walk;
      });
      // touch support
      let touchStartX=0, touchScrollLeft=0;
      slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].pageX; touchScrollLeft = slider.scrollLeft; }, {passive:true});
      slider.addEventListener('touchmove', e => {
        const x = e.touches[0].pageX;
        const walk = (x - touchStartX) * 1.4;
        slider.scrollLeft = touchScrollLeft - walk;
      }, {passive:true});
      // arrows
      const leftBtn = document.querySelector('.left-arrow');
      const rightBtn = document.querySelector('.right-arrow');
      if(leftBtn) leftBtn.addEventListener('click', ()=> slider.scrollBy({ left: -400, behavior: 'smooth' }));
      if(rightBtn) rightBtn.addEventListener('click', ()=> slider.scrollBy({ left: 400, behavior: 'smooth' }));
    })();

    // Navbar shrink on scroll
    (function navShrink(){
      const nav = document.querySelector('.mega-navbar');
      if(!nav) return;
      function check(){ if(window.scrollY>40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
      check();
      window.addEventListener('scroll', check);
    })();

    // Basic visual ripple animations for CTA buttons (non-critical)
    (function ripple(){
      document.querySelectorAll('.animated-button').forEach(btn=>{
        btn.addEventListener('mouseenter', (e)=>{
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const ripple = document.createElement('span');
          ripple.style.position='absolute';
          ripple.style.left = `${x}px`; ripple.style.top = `${y}px`;
          ripple.style.width='80px'; ripple.style.height='80px';
          ripple.style.background='rgba(255,255,255,0.24)';
          ripple.style.borderRadius='50%'; ripple.style.transform='translate(-50%,-50%)';
          ripple.style.pointerEvents='none'; ripple.style.opacity='1';
          ripple.style.transition='opacity .6s, transform .6s';
          btn.appendChild(ripple);
          setTimeout(()=>{ ripple.style.opacity='0'; ripple.style.transform='translate(-50%,-50%) scale(2)'; }, 10);
          setTimeout(()=> ripple.remove(), 700);
        });
      });
    })();

    // Newsletter form basic validation (client only)
    (function newsletterForm(){
      const form = document.getElementById('newsletterForm');
      if(!form) return;
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
          email.focus();
          email.classList.add('is-invalid');
          setTimeout(()=> email.classList.remove('is-invalid'), 2500);
          return;
        }
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        setTimeout(()=> {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i> Subscribe to Blessings';
          alert('Thanks — you are subscribed (demo). Connect this to your mail provider to complete process.');
          form.reset();
        }, 1200);
      });
    })();
  });