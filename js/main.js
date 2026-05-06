const bottoneMenu = document.querySelector("header button");
const navbar = document.querySelector("header nav");

bottoneMenu.addEventListener("click", () => {
  navbar.classList.toggle("is-open");
  const isOpen = navbar.classList.contains("is-open");
  bottoneMenu.setAttribute("aria-expanded", isOpen.toString());
});

bottoneMenu.addEventListener("pointerdown", () => {
  gsap.to(bottoneMenu, {
    x: 3,
    y: 3,
    boxShadow: "0px 0px 0 #0d0d0d",
    duration: 0.1,
    ease: "power2.out",
  });
});

bottoneMenu.addEventListener("pointerup", () => {
  gsap.to(bottoneMenu, {
    x: 0,
    y: 0,
    boxShadow: "3px 3px 0 #0d0d0d",
    duration: 0.2,
    ease: "back.out(2)",
  });
});

bottoneMenu.addEventListener("pointerleave", () => {
  gsap.to(bottoneMenu, {
    x: 0,
    y: 0,
    boxShadow: "3px 3px 0 #0d0d0d",
    duration: 0.2,
    ease: "power2.out",
  });
});
