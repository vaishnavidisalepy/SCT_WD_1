(function(){
	const sections = Array.from(document.querySelectorAll('.section'));
	const colors = [
		'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
		'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
		'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)'
	];

	function updateBg(){
		const y = window.scrollY + window.innerHeight/2;
		for(let i=0;i<sections.length;i++){
			const s = sections[i];
			const rect = s.getBoundingClientRect();
			const top = window.scrollY + rect.top;
			const bottom = top + rect.height;
			if(y >= top && y < bottom){
				document.body.style.background = colors[i];
				break;
			}
		}
	}

	// Initial update
	updateBg();
	window.addEventListener('scroll', throttle(updateBg, 100));
	window.addEventListener('resize', throttle(updateBg, 150));

	// Simple throttle
	function throttle(fn, wait){
		let last = 0;
		return function(){
			const now = Date.now();
			if(now - last > wait){ last = now; fn(); }
		}
	}

	// Fade-up reveal with IntersectionObserver
	const observer = new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting) entry.target.classList.add('in-view');
		});
	},{threshold:0.12});

	document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

})();

// Interactive button click animation
(function(){
	const buttons = document.querySelectorAll('.btn');
	buttons.forEach(btn => {
		btn.addEventListener('click', function(e){
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size/2;
			const y = e.clientY - rect.top - size/2;
			
			ripple.style.width = ripple.style.height = size + 'px';
			ripple.style.left = x + 'px';
			ripple.style.top = y + 'px';
			ripple.classList.add('ripple');
			this.appendChild(ripple);
			
			setTimeout(() => ripple.remove(), 600);
		});
	});
})();

// Smooth hover effects on cards
(function(){
	const cards = document.querySelectorAll('.card, .product-card');
	cards.forEach(card => {
		card.addEventListener('mouseenter', function(){
			this.style.transition = 'all 300ms ease';
		});
	});
})();

// Add smooth scroll on nav links
(function(){
	const navLinks = document.querySelectorAll('.nav a');
	navLinks.forEach(link => {
		link.addEventListener('click', function(e){
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if(target){
				target.scrollIntoView({behavior:'smooth'});
			}
		});
	});
})();

