
document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // 1. MOBILE HAMBURGER MENU
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.innerHTML = isOpen ? "&times;" : "☰";

    });

    navMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";

      });

    });

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
  // 2. LANGUAGE TOGGLE
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


  // =====================================
  // 3. REGISTER & LOGIN POPUPS
  // =====================================

  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");

  const closeRegisterBtn = document.getElementById("closeRegisterModal");
  const closeLoginBtn = document.getElementById("closeLoginModal");

  function closeAllModals() {

    if (registerModal) {
      registerModal.classList.remove("active");
      registerModal.setAttribute("aria-hidden", "true");
    }

    if (loginModal) {
      loginModal.classList.remove("active");
      loginModal.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("modal-open");

  }

  function openModal(modal) {

    if (!modal) return;

    closeAllModals();

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

  }


  // REGISTER BUTTONS

  document.querySelectorAll(".register-trigger").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      openModal(registerModal);

    });

  });


  // LOGIN BUTTONS

  document.querySelectorAll(".login-trigger").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      openModal(loginModal);

    });

  });


  // CLOSE REGISTER

  if (closeRegisterBtn) {

    closeRegisterBtn.addEventListener("click", closeAllModals);

  }


  // CLOSE LOGIN

  if (closeLoginBtn) {

    closeLoginBtn.addEventListener("click", closeAllModals);

  }


  // CLICK OUTSIDE POPUP

  document.querySelectorAll(
    ".register-modal-overlay, .login-modal-overlay"
  ).forEach(function (overlay) {

    overlay.addEventListener("click", closeAllModals);

  });


  // ESC KEY

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      closeAllModals();

    }

  });

});
