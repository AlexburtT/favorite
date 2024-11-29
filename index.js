console.log("Hello with Server");

const btn = document.querySelector("#add-button");
btn.addEventListener("click", () => {
    console.log("click");
    fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
});