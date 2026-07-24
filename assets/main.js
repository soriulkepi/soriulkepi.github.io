// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close the menu when a link is chosen
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});
