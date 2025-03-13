export const scrollTop = () => {
	const scrollTop = document.querySelector(".btn__scroll-top");

	if (!scrollTop) return;

	scrollTop.style.display = "none";

	scrollTop.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	window.addEventListener("scroll", () => {
		if (window.scrollY > 500) {
			scrollTop.style.display = "block";
		} else {
			scrollTop.style.display = "none";
		}
	});
};
