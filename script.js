
document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // MOBILE HAMBURGER MENU
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.innerHTML = isOpen ? "&times;" : "☰";

    });

    // Close menu after clicking a link

    navMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";

      });

    });

    // Close menu when clicking outside

    document.addEventListener("click", function (event) {

      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";

      }

    });

  }


  // =====================================
  // LANGUAGE TOGGLE
  // =====================================

  const languageToggle = document.getElementById("languageToggle");

  if (languageToggle) {

    languageToggle.addEventListener("click", function () {

      const currentLanguage = document.documentElement.lang;

      if (currentLanguage === "en") {

        document.documentElement.lang = "bn";
        languageToggle.textContent = "(EN)";

      } else {

        document.documentElement.lang = "en";
        languageToggle.textContent = "(BN)";

      }

    });

  }

});
