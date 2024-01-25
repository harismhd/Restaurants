import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

// import viteLogo from '../assets/images/vite.svg';
// import javascriptLogo from '../assets/images/javascript.svg';

const dependencies = [
  'ESlint',
  'Prettier',
  'PostCSS',
  'PostCSS Nesting',
  'Autoprefixer',
  'CSS Nano',
  'CSS Reset',
];

document.querySelector('#app').innerHTML = `
  <div>

  
  
  </div>
`;

const setupCounter = (element) => {
  let counter = 0;
  const counterElement = element;
  const setCounter = (count) => {
    counter = count;
    counterElement.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
};

setupCounter(document.querySelector('#counter'));

document.querySelector('.tags').innerHTML = dependencies
  .map((dependency) => `<p>${dependency}</p>`)
  .join('');
