import cardFilm from "./js/cardFilm.js";
import Dialog from "./js/dialog.js";

console.log("Hello with Server");

const btn = document.querySelector("#add-button");
btn.addEventListener("click", () => {
    console.log("click");
    const dialog = new Dialog('dialog-id');
    dialog.open();
});

cardFilm();

