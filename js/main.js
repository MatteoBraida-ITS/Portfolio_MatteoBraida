const bottoneMenu = document.querySelector("header button");
const navbar = document.querySelector("header nav");

bottoneMenu.addEventListener("click", () => {
  navbar.classList.toggle("is-open");
  const isOpen = navbar.classList.contains("is-open");
  bottoneMenu.setAttribute("aria-expanded", isOpen.toString());
});
