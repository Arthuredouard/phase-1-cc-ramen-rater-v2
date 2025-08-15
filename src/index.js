// src/index.js

//! Afficher tous les ramens
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

//! Afficher les détails d’un ramen
export function handleClick(ramen, event) {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailsRating.textContent = ramen.rating.toString();
    detailsComment.textContent = ramen.comment;
}

//! Ajouter un nouveau ramen via le formulaire
export function addSubmitListener(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.querySelector("#new-name").value;
        const restaurant = form.querySelector("#new-restaurant").value;
        const image = form.querySelector("#new-image").value;
        const rating = form.querySelector("#new-rating").value;
        const comment = form.querySelector("#new-comment").value;

        const newRamen = {
            id: testResponseData.length + 1,
            name,
            restaurant,
            image,
            rating,
            comment
        };

        // Ajouter le nouveau ramen au DOM
        const ramenMenuDiv = document.getElementById("ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener("click", (event) => handleClick(newRamen, event));
        ramenMenuDiv.appendChild(img);

        // Réinitialiser le formulaire
        form.reset();
    });
}

//! Fonction principale
export function main() {
    displayRamens();
    const ramenForm = document.getElementById('new-ramen');
    addSubmitListener(ramenForm);
}

// Exécuter main quand le DOM est prêt
document.addEventListener("DOMContentLoaded", main);
