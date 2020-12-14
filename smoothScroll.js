export default function smoothScroll(to = 0, duration = 500, power = 3) {
	power = Math.max(power, 1);
	const currentScroll = window.pageYOffset;
	let delta = null;
	if (typeof to === "object" && to.scrollTop !== undefined) {to = to.offsetTop;}
	if (typeof to === "string") {
		const target = document.querySelector(to);
		if (target) {to = target.offsetTop;} else {return false;}
	}
	delta = to - currentScroll;
	duration = duration * Math.abs(delta/1000); // 500 msec for 1000 px
	const start = performance.now();
	requestAnimationFrame(animate);
	return false;

	function animate(time) {
		let timeFraction = (time - start) / duration;
		timeFraction = Math.min(Math.max(timeFraction, 0), 1); //clamp
		let progress = timing(timeFraction, power);
		window.scrollTo(0, currentScroll + delta * progress);
		if (timeFraction < 1) {requestAnimationFrame(animate);}
	}

	function timing(timeFraction, power) {
		return (timeFraction ** power) / ((timeFraction ** power) + ((1 - timeFraction) ** power));
	}
}