const baseURL = "http://localhost:3000/ramens";
let currentRamenId = null; // ID du ramen sélectionné

//! Affiche tous les ramens dans le menu
function displayRamens() {
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

//! Affiche les détails du ramen sélectionné
function handleClick(ramen) {
    currentRamenId = ramen.id;

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
}

//! Gère l'ajout d'un nouveau ramen via le formulaire
function addSubmitListener(form) {
    if (!form) return;

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

        // Ajoute le ramen au DOM
        const ramenMenuDiv = document.getElementById("ramen-menu");
        if (!ramenMenuDiv) return;

        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener("click", () => handleClick(newRamen));
        ramenMenuDiv.appendChild(img);

        // Reset du formulaire
        form.reset();
    });
}

//! Fonction principale pour lancer l'app
function main() {
    const ramenForm = document.getElementById("new-ramen");
    addSubmitListener(ramenForm);
    displayRamens();
}

//! Export pour les tests
export { addSubmitListener, displayRamens, handleClick, main };


