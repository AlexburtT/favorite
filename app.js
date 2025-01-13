import cardFilm from "./src/js/cardFilm.js";
import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/dialog.js";
import scrollTop from "./src/js/scrollTop.js";

const btn = document.querySelector("#add-button");
btn.addEventListener("click", () => {
    console.log("click");
    const dialog = new Dialog('dialog-id');
    dialog.open();
});

cardFilm();

scrollTop();


