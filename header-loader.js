
document.addEventListener("DOMContentLoaded", async function () {

  const headerContainer = document.getElementById("global-header");

  if (!headerContainer) {
    console.error("Global Header container not found!");
    return;
  }

  try {

    const response = await fetch("/components/header.html");

    if (!response.ok) {
      throw new Error("Header file could not be loaded.");
    }

    const headerHTML = await response.text();

    headerContainer.innerHTML = headerHTML;

    // Mobile Navigation
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

      menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close Menu" : "Open Menu"
        );

      });

    }

    // Close menu after clicking a navigation link
    if (navMenu) {

      navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

          navMenu.classList.remove("active");

          if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open Menu");
          }

        });

      });

    }

    // Language Toggle
    const languageToggle = document.getElementById("languageToggle");

    if (languageToggle) {

      languageToggle.addEventListener("click", function () {

        const currentLanguage = languageToggle.textContent.trim();

        languageToggle.textContent =
          currentLanguage === "(BN)" ? "(EN)" : "(BN)";

      });

    }

    console.log("Global Header Loaded Successfully!");

  } catch (error) {

    console.error("Global Header Error:", error);

    headerContainer.innerHTML = `
      <p style="text-align:center;padding:15px;color:red;">
        Header could not be loaded. Please refresh the page.
      </p>
    `;

  }

});
