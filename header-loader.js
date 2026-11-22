document.addEventListener("DOMContentLoaded", async function () {
  const headerContainer = document.getElementById("global-header");

  if (!headerContainer) {
    console.error("Global Header container not found!");
    return;
  }

  try {
    const response = await fetch("/components/header.html");

    if (!response.ok) {
      throw new Error(`Header file could not be loaded (Status: ${response.status}).`);
    }

    const headerHTML = await response.text();
    headerContainer.innerHTML = headerHTML;

    // Mobile Navigation
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    function closeMenu() {
      if (!navMenu) return;
      navMenu.classList.remove("active");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open Menu");
      }
    }

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
      });

      // Close menu after clicking a navigation link
      navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (
          navMenu.classList.contains("active") &&
          !navMenu.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          closeMenu();
        }
      });

      // Close menu on Escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
          closeMenu();
          menuToggle.focus();
        }
      });
    }

    // Language Toggle (EN / BN)
    const languageToggle = document.getElementById("languageToggle");

    function applyLanguage(lang) {
      document.documentElement.setAttribute("lang", lang.toLowerCase());
      localStorage.setItem("siteLanguage", lang);

      if (languageToggle) {
        // Displays the language the user can switch TO
        languageToggle.textContent = lang === "EN" ? "(BN)" : "(EN)";
        languageToggle.setAttribute(
          "aria-label",
          lang === "EN" ? "Switch to Bangla" : "Switch to English"
        );
      }

      // Automatically translate any element with data-en and data-bn attributes
      document.querySelectorAll("[data-en][data-bn]").forEach(function (el) {
        el.textContent = lang === "BN" ? el.getAttribute("data-bn") : el.getAttribute("data-en");
      });

      // Notify other scripts on the page if they need to react to language changes
      document.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
    }

    if (languageToggle) {
      // Restore saved language or default to EN
      const savedLanguage = localStorage.getItem("siteLanguage") || "EN";
      applyLanguage(savedLanguage);

      languageToggle.addEventListener("click", function () {
        const currentLang = localStorage.getItem("siteLanguage") || "EN";
        const nextLang = currentLang === "EN" ? "BN" : "EN";
        applyLanguage(nextLang);
      });
    }

    console.log("Global Header Loaded Successfully!");
  } catch (error) {
    console.error("Global Header Error:", error);

    headerContainer.innerHTML = `
      <p style="text-align:center;padding:15px;color:red;" role="alert">
        Header could not be loaded. Please refresh the page.
      </p>
    `;
  }
});
