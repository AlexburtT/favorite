export const dateYearFooter = () => {
	const dateYearFooter = new Date().getFullYear();

	document.querySelector(".footer__year").textContent = dateYearFooter;
};
