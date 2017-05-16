const component = () => {
  const element = document.createElement('div');
  element.innerHTML = 'Hello Babel Latest!';
  return element;
}

document.body.appendChild(component());