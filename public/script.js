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

const client = supabase.createClient(
  'https://gxwsfvtvgbntyzsewsyy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3NmdnR2Z2JudHl6c2V3c3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MTQ0NTMsImV4cCI6MjAyMjA5MDQ1M30.vsWkGcLTuPchdd82-Q3a3tX0w42n3IhdUIGf7E3aXVQ',
);

const fetchData = async () => {
  const { data, error } = await client.from('hotels').select('*');

  if (error) {
    console.error(error);
    return;
  }

  displayData(data);
};

function displayData(data) {
  const output = data
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

document.getElementById('addRestaurantBtn').addEventListener('click', () => {
  document.getElementById('addRestaurantForm').style.display = 'block';
});

document
  .getElementById('submitRestaurant')
  .addEventListener('click', async () => {
    const newRestaurant = {
      title: document.getElementById('title').value,
      image: document.getElementById('image').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value,
      text: document.getElementById('text').value,
      cuisine: document.getElementById('cuisine').value,
    };

    const { data, error } = await client.from('hotels').upsert([newRestaurant]);

    if (error) {
      console.error(error);
      return;
    }

    console.log('New restaurant added:', data);

    document.getElementById('addRestaurantForm').style.display = 'none';

    fetchData();
  });

fetchData();
