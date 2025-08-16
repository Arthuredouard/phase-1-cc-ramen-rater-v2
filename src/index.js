// index.js

//! Fetch and display all ramens
export async function displayRamens() {
  const ramenMenu = document.getElementById('ramen-menu');

  try {
    const response = await fetch('http://localhost:3000/ramens');
    if (!response.ok) throw new Error('Network response was not ok');
    const ramens = await response.json();

    ramenMenu.innerHTML = '';

    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });

    if (ramens.length > 0) {
      handleClick(ramens[0]);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

//! Display ramen details
export function handleClick(ramen) {
  const detailImg = document.querySelector('#ramen-detail > .detail-image');
  const detailName = document.querySelector('#ramen-detail > .name');
  const detailRestaurant = document.querySelector('#ramen-detail > .restaurant');
  const detailsRating = document.getElementById('rating-display');
  const detailsComment = document.getElementById('comment-display');

  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;

  window.selectedRamen = ramen;
}

//! Add submit listener for new ramen (compatible with tests)
export function addSubmitListener(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('#new-name');
    const restaurantInput = form.querySelector('#new-restaurant');
    const imageInput = form.querySelector('#new-image');
    const ratingInput = form.querySelector('#new-rating');
    const commentInput = form.querySelector('#new-comment');

    const newRamen = {
      name: nameInput.value,
      restaurant: restaurantInput.value,
      image: imageInput.value,
      rating: ratingInput.value,
      comment: commentInput.value,
    };

    // Pour tests Vitest : ajoute l'image directement dans le DOM
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Extra Advanced Deliverable : POST vers le serveur pour persistance
    try {
      await fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRamen),
      });
    } catch (error) {
      console.error('Failed to persist new ramen', error);
    }

    form.reset();
  });
}

//! Add submit listener for edit ramen
export function addEditListener(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const ramen = window.selectedRamen;
    if (!ramen) return;

    const ratingInput = form.querySelector('#edit-rating');
    const commentInput = form.querySelector('#edit-comment');

    const updatedRamen = {
      rating: ratingInput.value,
      comment: commentInput.value,
    };

    try {
      // PATCH pour persister les modifications
      const response = await fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRamen),
      });
      if (!response.ok) throw new Error('Failed to update ramen');
      const savedRamen = await response.json();

      handleClick(savedRamen);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });
}

//! Add delete listener
export function addDeleteListener(button) {
  button.addEventListener('click', async () => {
    const ramen = window.selectedRamen;
    if (!ramen) return;

    try {
      // DELETE pour persister
      const response = await fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete ramen');

      const ramenMenu = document.getElementById('ramen-menu');
      const imgs = ramenMenu.querySelectorAll('img');
      imgs.forEach((img) => {
        if (img.alt === ramen.name) ramenMenu.removeChild(img);
      });

      // Reset détails
      const detailImg = document.querySelector('#ramen-detail > .detail-image');
      const detailName = document.querySelector('#ramen-detail > .name');
      const detailRestaurant = document.querySelector('#ramen-detail > .restaurant');
      const detailsRating = document.getElementById('rating-display');
      const detailsComment = document.getElementById('comment-display');

      detailImg.src = './assets/image-placeholder.jpg';
      detailImg.alt = 'Insert Name Here';
      detailName.textContent = 'Insert Name Here';
      detailRestaurant.textContent = 'Insert Restaurant Here';
      detailsRating.textContent = 'Insert rating here';
      detailsComment.textContent = 'Insert comment here';

      window.selectedRamen = null;
    } catch (error) {
      console.error(error);
    }
  });
}

//! Main function
export function main() {
  const newRamenForm = document.getElementById('new-ramen');
  const editRamenForm = document.getElementById('edit-ramen');
  const deleteButton = document.getElementById('delete-btn');

  displayRamens();
  addSubmitListener(newRamenForm);
  addEditListener(editRamenForm);
  addDeleteListener(deleteButton);
}

// Start app
document.addEventListener('DOMContentLoaded', main);



           






