
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
  // 3. REGISTER & LOGIN MODALS
  // =====================================

  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");

  const closeRegisterBtn = document.getElementById("closeRegisterModal");
  const closeLoginBtn = document.getElementById("closeLoginModal");

  function closeAllModals() {

    [registerModal, loginModal].forEach(function (modal) {

      if (!modal) return;

      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");

    });

    document.body.classList.remove("modal-open");

  }

  function openModal(modal) {

    if (!modal) return;

    closeAllModals();

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

  }


  // REGISTER POPUP OPEN

  document.querySelectorAll(".register-trigger").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      openModal(registerModal);

    });

  });


  // LOGIN POPUP OPEN

  document.querySelectorAll(".login-trigger").forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      openModal(loginModal);

    });

  });


  // =====================================
  // 4. STUDENT & TEACHER FORM NAVIGATION
  // =====================================

  const studentLink = document.querySelector(
    "#registerModal .student-option"
  );

  const teacherLink = document.querySelector(
    "#registerModal .teacher-option"
  );

  function navigateToForm(link) {

    if (!link) return;

    const destination = link.getAttribute("href");

    if (!destination || destination === "#") {
      alert("Registration page link is missing.");
      return;
    }

    closeAllModals();

    window.location.href = destination;

  }

  if (studentLink) {

    studentLink.addEventListener("click", function (event) {

      event.preventDefault();

      navigateToForm(studentLink);

    });

  }

  if (teacherLink) {

    teacherLink.addEventListener("click", function (event) {

      event.preventDefault();

      navigateToForm(teacherLink);

    });

  }


  // =====================================
  // 5. CLOSE BUTTONS
  // =====================================

  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener("click", closeAllModals);
  }

  if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", closeAllModals);
  }


  // =====================================
  // 6. CLICK OUTSIDE MODAL
  // =====================================

  document.querySelectorAll(
    ".register-modal-overlay, .login-modal-overlay"
  ).forEach(function (overlay) {

    overlay.addEventListener("click", closeAllModals);

  });


  // =====================================
  // 7. ESC KEY
  // =====================================

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeAllModals();
    }

  });
(function () {

  function openLoginPopupFromLink() {

    const params = new URLSearchParams(window.location.search);

    if (params.get("openLogin") !== "true") return;

    const loginTrigger = document.querySelector(".login-trigger");

    if (loginTrigger) {
      loginTrigger.click();
    }

    // Remove query parameter after opening
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + window.location.hash
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      openLoginPopupFromLink
    );
  } else {
    openLoginPopupFromLink();
  }

})();


});
