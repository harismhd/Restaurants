const http = new XMLHttpRequest();
http.open('get', 'data.json', true);
http.send();

http.onload = function handleLoad() {
  if (this.readyState === 4 && this.status === 200) {
    const products = JSON.parse(this.responseText);

    const output = products
      .map(
        (item, index) => `
          <div class="product" data-index="${index}">
            <p class="title">${item.title}</p>
            <img src="${item.image}" alt="${item.description}">
            <p class="description">${item.description}</p>
            <p class="location">${item.location}</p>
            <button class="details-btn">Get Details</button>
          </div>
          <div class="modal" id="myModal${index}">
            <div class="modal-content">
              <span class="close" data-index="${index}">&times;</span>
              <p class="title"> ${item.title}</p>
              <img src="${item.image}" alt="${item.description}">
               <p>Location: ${item.location}</p>
              <p>Cuisine: ${item.cuisine}</p>
              <p class="text">${item.text}</p>
            </div>
          </div>
        `,
      )
      .join('');

    document.querySelector('.products').innerHTML = output;

    const detailsButtons = document.querySelectorAll('.details-btn');
    const modalCloseButtons = document.querySelectorAll('.close');

    detailsButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(`myModal${index}`);
        modal.style.display = 'block';
      });
    });

    modalCloseButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(`myModal${index}`);
        modal.style.display = 'none';
      });
    });
  }
};
