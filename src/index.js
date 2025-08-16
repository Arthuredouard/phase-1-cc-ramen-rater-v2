const baseURL = "http://localhost:3000/ramens";

const renderRamenThumbnail = (ramen) => {
  const menu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  menu.appendChild(img);
};

const handleClick = (ramen) => {
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".detail-image").alt = ramen.name;
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value
    };
    renderRamenThumbnail(newRamen);
    form.reset();
  });
};

const displayRamens = () => {
  fetch(baseURL)
    .then((res) => res.json())
    .then((ramens) => {
      ramens.forEach(renderRamenThumbnail);
      if (ramens.length > 0) handleClick(ramens[0]);
    })
    .catch((err) => console.error("Erè chajman done:", err));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener("DOMContentLoaded", main);

// 👉 Ekspòte fonksyon pou tès
export { displayRamens, addSubmitListener, handleClick, main };


