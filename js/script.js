document.addEventListener("DOMContentLoaded", () => {
  //TOGGLE
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  const navList = document.querySelector(".navbar ul");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("open");

      if (navbar.classList.contains("open")) {
        navList.classList.remove("hide");
        navList.classList.add("show");
      } else {
        navList.classList.remove("show");
        navList.classList.add("hide");
      }
    });
  }

  
