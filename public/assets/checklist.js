const printButton = document.querySelector('.print');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
