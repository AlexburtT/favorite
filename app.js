// import cardFilm from "./src/js/cardFilm.js";
import Dialog from "./src/js/dialog.js";

const btn = document.querySelector("#add-button");
btn.addEventListener("click", () => {
    console.log("click");
    const dialog = new Dialog('dialog-id');
    dialog.open();
});

// cardFilm();

