
/* =========================================
   DTSC ALUMNI ASSOCIATION
   MAIN JAVASCRIPT
========================================= */

// CURRENT YEAR
document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // MOBILE MENU
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // ACCOUNT DROPDOWN
    const accountToggle = document.getElementById("accountToggle");
    const accountDropdown = document.getElementById("accountDropdown");

    if (accountToggle && accountDropdown) {

        accountToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            accountDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (
                !accountDropdown.contains(event.target) &&
                !accountToggle.contains(event.target)
            ) {
                accountDropdown.classList.remove("show");
            }
        });
    }

    // LANGUAGE TRANSLATION
    const languageToggle = document.getElementById("languageToggle");

    let currentLanguage = "bn";

    const translations = {

        en: {
            "হোম": "Home",
            "আমাদের সম্পর্কে": "About Us",
            "সদস্যবৃন্দ": "Members",
            "শিক্ষকমণ্ডলী": "Teachers",
            "নোটিশ": "Notices",
            "ইভেন্ট": "Events",
            "গ্যালারি": "Gallery",
            "অ্যাকাউন্ট": "Account",
            "নিবন্ধন": "Register",
            "লগইন": "Login",
            "আমাদের অ্যালামনাই পরিবারে স্বাগতম": "Welcome to Our Alumni Community",
            "একসাথে গড়ি আগামীর ভবিষ্যৎ": "Together We Build Our Future",
            "প্রাক্তন শিক্ষার্থী, সম্মানিত শিক্ষক ও প্রতিষ্ঠানের মধ্যে গড়ে তুলি আজীবনের বন্ধন।":
                "Connecting former students, respected teachers and the institution through a lifelong community.",
            "সদস্য হোন": "Become a Member",
            "আরও জানুন": "Explore More",
            "আমাদের পরিবার": "OUR COMMUNITY",
            "DTSC Alumni Association-এ স্বাগতম": "Welcome to DTSC Alumni Association",
            "প্রাক্তন শিক্ষার্থী ও শিক্ষকদের একত্রিত করার একটি সম্মিলিত প্ল্যাটফর্ম।":
                "A platform that connects generations of students and teachers.",
            "প্রাক্তন শিক্ষার্থী": "Alumni Members",
            "সহপাঠী ও বন্ধুদের সঙ্গে যোগাযোগ রাখুন।":
                "Stay connected with your classmates and friends.",
            "সদস্য দেখুন →": "View Members →",
            "সম্মানিত শিক্ষক": "Honorable Teachers",
            "আমাদের শ্রদ্ধেয় শিক্ষকদের সঙ্গে যুক্ত থাকুন।":
                "Remember and connect with our respected teachers.",
            "শিক্ষক দেখুন →": "View Teachers →",
            "সর্বশেষ নোটিশ": "Latest Notices",
            "গুরুত্বপূর্ণ তথ্য ও ঘোষণা জানুন।":
                "Get important updates and announcements.",
            "নোটিশ পড়ুন →": "Read Notices →",
            "ইভেন্ট ও পুনর্মিলনী": "Events & Reunion",
            "বিভিন্ন অনুষ্ঠান ও পুনর্মিলনীতে অংশগ্রহণ করুন।":
                "Join our programs, events and alumni reunions.",
            "ইভেন্ট দেখুন →": "Explore Events →",
            "আমাদের প্রতিষ্ঠান": "OUR INSTITUTION",
            "দেওয়ানগঞ্জ সরকারি টেকনিক্যাল স্কুল ও কলেজ":
                "Dewanganj Govt. Technical School & College",
            "এই প্রতিষ্ঠান আমাদের স্মৃতি, বন্ধুত্ব ও অর্জনের এক অবিচ্ছেদ্য অংশ।":
                "Our institution is the foundation of our memories, friendships and achievements.",
            "বিস্তারিত জানুন →": "Learn More →",
            "আমাদের অ্যালামনাই পরিবারের অংশ হোন":
                "Be a Part of Our Alumni Family",
            "পুরোনো বন্ধুদের সঙ্গে আবার যুক্ত হোন, গড়ে তুলুন নতুন সম্পর্ক।":
                "Reconnect with old friends and build new connections.",
            "এখনই নিবন্ধন করুন": "Register Now",
            "গুরুত্বপূর্ণ লিংক": "Quick Links",
            "যোগাযোগ": "Contact",
            "সর্বস্বত্ব সংরক্ষিত।": "All Rights Reserved."
        }

    };

    function translatePage(language) {

        const elements = document.querySelectorAll("[data-en]");

        elements.forEach(function (element) {

            if (language === "en") {

                if (!element.dataset.bn) {
                    element.dataset.bn = element.textContent;
                }

                element.textContent =
                    element.dataset.en || element.dataset.bn;

            } else {

                if (element.dataset.bn) {
                    element.textContent = element.dataset.bn;
                }
            }

        });

        // Translate elements without data-en
        document.querySelectorAll("body *").forEach(function (element) {

            if (
                element.children.length === 0 &&
                element.textContent.trim() !== ""
            ) {

                const originalText = element.textContent.trim();

                if (translations.en[originalText]) {

                    if (!element.dataset.originalText) {
                        element.dataset.originalText = originalText;
                    }

                    element.textContent = language === "en"
                        ? translations.en[originalText]
                        : element.dataset.originalText;

                }
            }

        });

        document.documentElement.lang = language;

        if (languageToggle) {
            languageToggle.textContent =
                language === "bn" ? "English" : "বাংলা";
        }

    }

    if (languageToggle) {

        languageToggle.addEventListener("click", function () {

            currentLanguage =
                currentLanguage === "bn" ? "en" : "bn";

            translatePage(currentLanguage);

        });

    }

});
