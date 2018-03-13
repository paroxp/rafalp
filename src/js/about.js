(() => {
  assure('[data-details] summary', (element) => {
    element.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() !== 'a') {
        e.preventDefault();
  
        toggleClass(element.parentNode, 'active');
  
        return true;
      }
    });
  });
})();

function assure(element, cb) {
  const elements = document.querySelectorAll(element);

  for (let i = 0; i < elements.length; i++) {
    cb(elements[i]);
  }
}

function toggleClass(element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  } else {
    const classes = element.className.split(' ');
    const existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }
}
