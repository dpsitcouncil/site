$(window).scroll(function () {
	$("nav").toggleClass("scrolled", $(this).scrollTop() > 50)
})

const words = ["Developers", "Designers", "Gamers", "Writers", "Animators"]

let cursor = gsap.to(".cursor", {
	opacity: 0,
	ease: "power2.inOut",
	repeat: -1,
})
let masterTl = gsap.timeline({ repeat: -1 }).pause()
let boxTl = gsap.timeline()

boxTl
	.to(".box", {
		duration: 1,
		width: "10em",
		delay: 0.5,
		ease: "power4.inOut",
	})
	.from(".hi", { duration: 1, y: "7vw", ease: "power3.out" })
	.to(".box", {
		duration: 1,
		height: "7vw",
		ease: "elastic.out",
		onComplete: () => masterTl.play(),
	})
	.to(".box", {
		duration: 2,
		autoAlpha: 0.7,
		yoyo: true,
		repeat: -1,
		ease: "rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})",
	})
words.forEach((word) => {
	let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
	tl.to(".text", { duration: 1, text: word })
	masterTl.add(tl)
})

particlesJS("particles-js", {
	particles: {
		number: { value: 200, density: { enable: true, value_area: 1500 } },
		color: { value: "#00659b" },
		shape: {
			type: ["circle", "polygon"],
			stroke: { width: 0, color: "#000000" },
			polygon: { nb_sides: 5 },
			image: { src: "img/github.svg", width: 100, height: 100 },
		},
		opacity: {
			value: 1,
			random: true,
			anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
		},
		size: {
			value: 6,
			random: true,
			anim: {
				enable: false,
				speed: 21.926084732136317,
				size_min: 0.3,
				sync: false,
			},
		},
		line_linked: {
			enable: false,
			distance: 150,
			color: "#ffffff",
			opacity: 0.4,
			width: 1,
		},
		move: {
			enable: true,
			speed: 3,
			direction: "right",
			random: true,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: { enable: false, rotateX: 600, rotateY: 600 },
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: { enable: true, mode: "bubble" },
			onclick: { enable: true, mode: "repulse" },
			resize: true,
		},
		modes: {
			grab: { distance: 400, line_linked: { opacity: 1 } },
			bubble: {
				distance: 250,
				size: 0,
				duration: 2,
				opacity: 0,
				speed: 3,
			},
			repulse: { distance: 400, duration: 0.4 },
			push: { particles_nb: 4 },
			remove: { particles_nb: 2 },
		},
	},
	retina_detect: true,
})

//mail
