document.addEventListener("DOMContentLoaded", function () {
    // Mobile Hamburger Menu
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
                if (!link.classList.contains("open-modal")) {
                    closeMobileMenu();
                }
            });
        });
    }

    // Modal Popup Logic
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    }

    document.querySelectorAll(".open-modal").forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            closeMobileMenu();
            const targetId = this.getAttribute("data-target");
            openModal(targetId);
        });
    });

    document.querySelectorAll(".modal-close").forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
            const targetId = this.getAttribute("data-close");
            closeModal(targetId);
        });
    });

    document.querySelectorAll(".switch-modal").forEach(function (switchBtn) {
        switchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const fromModal = this.getAttribute("data-from");
            const toModal = this.getAttribute("data-to");
            closeModal(fromModal);
            openModal(toModal);
        });
    });

    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
        backdrop.addEventListener("click", function (e) {
            if (e.target === backdrop) {
                closeModal(backdrop.id);
            }
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-backdrop.show").forEach(function (openBackdrop) {
                closeModal(openBackdrop.id);
            });
        }
    });

    // Conditional Program Field
    const regProgram = document.getElementById("regProgram");
    const deptGroup = document.getElementById("deptGroup");
    const regDept = document.getElementById("regDept");

    if (regProgram && deptGroup) {
        regProgram.addEventListener("change", function () {
            if (this.value === "Diploma" || this.value === "SSC" || this.value === "HSC") {
                deptGroup.style.display = "block";
                if (regDept) regDept.setAttribute("required", "required");
            } else {
                deptGroup.style.display = "none";
                if (regDept) regDept.removeAttribute("required");
            }
        });
    }

    // Form Submission Handlers
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Login submitted! Connect your backend/Firebase authentication here.");
            closeModal("loginModal");
            loginForm.reset();
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Registration submitted successfully!");
            closeModal("registerModal");
            registerForm.reset();
            if (deptGroup) deptGroup.style.display = "none";
        });
    }
});
