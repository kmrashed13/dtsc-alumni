document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // MOBILE HAMBURGER MENU
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMobileMenu() {
    if (menuToggle && navMenu) {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = "&#9776;";
    }
  }

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";

    });

    navMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        closeMobileMenu();
      });

    });

    document.addEventListener("click", function (event) {

      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
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


  // =====================================
  // REGISTER & LOGIN POPUP MODALS
  // =====================================

  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");
  const closeRegisterModal = document.getElementById("closeRegisterModal");
  const closeLoginModal = document.getElementById("closeLoginModal");

  function openModal(modal) {
    if (!modal) return;
    closeMobileMenu();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".register-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(registerModal);
    });
  });

  document.querySelectorAll(".login-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(loginModal);
    });
  });

  if (closeRegisterModal) {
    closeRegisterModal.addEventListener("click", function () {
      closeModal(registerModal);
    });
  }

  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", function () {
      closeModal(loginModal);
    });
  }

  document.querySelectorAll(".auth-modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function () {
      closeModal(registerModal);
      closeModal(loginModal);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal(registerModal);
      closeModal(loginModal);
    }
  });

});
