// index.js

const baseURL = "http://localhost:3000/ramens";
let currentRamenId = null;

// Afficher les ramens dans le menu
export function displayRamens() {
    const ramenMenuDiv = document.getElementById("ramen-menu");
    if (!ramenMenuDiv) return;

    ramenMenuDiv.innerHTML = "";

    testResponseData.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", (event) => handleClick(ramen, event));
        ramenMenuDiv.appendChild(img);
    });
}

// Afficher les détails d'un ramen
export function handleClick(ramen, event) {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    if (detailImg) detailImg.src = ramen.image;
    if (detailName) detailName.textContent = ramen.name;
    if (detailRestaurant) detailRestaurant.textContent = ramen.restaurant;
    if (detailsRating) detailsRating.textContent = ramen.rating.toString();
    if (detailsComment) detailsComment.textContent = ramen.comment;

    currentRamenId = ramen.id;
}

// Ajouter un listener pour le formulaire
export function addSubmitListener(form) {
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRamen = {
            id: testResponseData.length + 1,
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value,
        };

        testResponseData.push(newRamen);

        const ramenMenuDiv = document.getElementById("ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener("click", (event) => handleClick(newRamen, event));
        ramenMenuDiv.appendChild(img);

        form.reset();
    });
}

// Fonction principale
export function main() {
    const ramenForm = document.getElementById("new-ramen");
    addSubmitListener(ramenForm);
    displayRamens();
}

// Lancer main après que le DOM soit chargé
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}

