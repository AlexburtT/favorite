document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-id");
    const addBtn = document.getElementById("add-button");

    addBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    document.addEventListener("click", (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
});