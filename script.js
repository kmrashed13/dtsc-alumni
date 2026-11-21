document.addEventListener("DOMContentLoaded", function () {
    // ================= MOBILE HAMBURGER MENU =================
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
    }

    // ================= MODAL POPUP LOGIC =================
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

    // Open Login / Register Modals
    document.querySelectorAll(".open-modal").forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            closeMobileMenu();
            const targetId = this.getAttribute("data-target");
            openModal(targetId);
        });
    });

    // Close Modal via Close (×) Button
    document.querySelectorAll(".modal-close").forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
            const targetId = this.getAttribute("data-close");
            closeModal(targetId);
        });
    });

    // Switch between Login and Register Modals
    document.querySelectorAll(".switch-modal").forEach(function (switchBtn) {
        switchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const fromModal = this.getAttribute("data-from");
            const toModal = this.getAttribute("data-to");
            closeModal(fromModal);
            openModal(toModal);
        });
    });

    // Close Modal when clicking outside the dialog box
    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
        backdrop.addEventListener("click", function (e) {
            if (e.target === backdrop) {
                closeModal(backdrop.id);
            }
        });
    });

    // Close Modal on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-backdrop.show").forEach(function (openBackdrop) {
                closeModal(openBackdrop.id);
            });
        }
    });

    // ================= CONDITIONAL PROGRAM FIELD =================
    const regProgram = document.getElementById("regProgram");
    const deptGroup = document.getElementById("deptGroup");
    const regDept = document.getElementById("regDept");

    if (regProgram && deptGroup) {
        regProgram.addEventListener("change", function () {
            if (this.value === "Diploma" || this.value === "SSC" || this.value === "HSC") {
                deptGroup.style.display = "block";
                regDept.setAttribute("required", "required");
            } else {
                deptGroup.style.display = "none";
                regDept.removeAttribute("required");
            }
        });
    }

    // ================= FORM SUBMISSION HANDLERS =================
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
