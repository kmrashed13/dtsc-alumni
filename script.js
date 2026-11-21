
/* =========================================
   DTSC ALUMNI ASSOCIATION
   MAIN JAVASCRIPT
========================================= */

// CURRENT YEAR
document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("currentYear");

/* ==========================================
   DTSC ALUMNI ASSOCIATION
   MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. CURRENT YEAR
    ====================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ======================================
       2. MOBILE NAVIGATION MENU
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        // Close menu after clicking a link
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* ======================================
       3. ACCOUNT DROPDOWN
    ====================================== */

    const accountToggle = document.getElementById("accountToggle");
    const accountDropdown = document.getElementById("accountDropdown");

    if (accountToggle && accountDropdown) {

        accountToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            accountDropdown.classList.toggle("show");

        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !accountDropdown.contains(event.target) &&
                !accountToggle.contains(event.target)
            ) {

                accountDropdown.classList.remove("show");

            }

        });

        // Close dropdown after selecting Register/Login
        accountDropdown.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                accountDropdown.classList.remove("show");

            });

        });

    }


    /* ======================================
       4. ENGLISH - BANGLA TRANSLATION
       Default Language: ENGLISH
    ====================================== */

    const languageToggle = document.getElementById("languageToggle");

    let currentLanguage = "en";

    const translations = {

        "Home": "হোম",
        "About Us": "আমাদের সম্পর্কে",
        "Events": "ইভেন্ট",
        "Gallery": "গ্যালারি",
        "Membership Directory": "সদস্য তালিকা",
        "Contact": "যোগাযোগ",
        "Account": "অ্যাকাউন্ট",

        "Register": "নিবন্ধন",
        "Login": "লগইন",

        "Welcome to": "স্বাগতম",
        "DTSC Alumni Association": "ডিটিএসসি অ্যালামনাই অ্যাসোসিয়েশন",

        "Connecting Our Alumni, Celebrating Our Bond,": "প্রাক্তন শিক্ষার্থীদের একত্রিত করি, সম্পর্কের বন্ধন উদযাপন করি,",
        "Building a Stronger Community Together.": "একসাথে গড়ে তুলি আরও শক্তিশালী একটি কমিউনিটি।",

        "Join Our Community": "আমাদের কমিউনিটিতে যোগ দিন",

        "ABOUT US": "আমাদের সম্পর্কে",
        "About Us": "আমাদের সম্পর্কে",

        "DTSC Alumni Association is a proud platform for all former students of Dewanganj Govt. Technical School & College. Our goal is to keep the bond alive, support each other, and contribute to the growth of our alma mater and society.":

        "ডিটিএসসি অ্যালামনাই অ্যাসোসিয়েশন দেওয়ানগঞ্জ সরকারি টেকনিক্যাল স্কুল ও কলেজের প্রাক্তন শিক্ষার্থীদের একটি সম্মিলিত প্ল্যাটফর্ম। আমাদের লক্ষ্য বন্ধন অটুট রাখা, একে অপরকে সহযোগিতা করা এবং আমাদের প্রিয় প্রতিষ্ঠানের উন্নয়নে অবদান রাখা।",

        "Learn More →": "আরও জানুন →",

        "📢 Notice Board": "📢 নোটিশ বোর্ড",
        "View All →": "সব দেখুন →",

        "Annual Reunion": "বার্ষিক পুনর্মিলনী",
        "DTSC Alumni Association is going to organize the annual reunion...":
            "ডিটিএসসি অ্যালামনাই অ্যাসোসিয়েশন বার্ষিক পুনর্মিলনীর আয়োজন করতে যাচ্ছে...",

        "Website Launch": "ওয়েবসাইট উদ্বোধন",
        "Our new website is now live!": "আমাদের নতুন ওয়েবসাইট এখন চালু!",

        "Scholarship Program": "বৃত্তি কার্যক্রম",
        "Applications are open...": "আবেদন গ্রহণ চলছে...",

        "📅 Upcoming Events": "📅 আসন্ন ইভেন্ট",

        "Annual Reunion 2025": "বার্ষিক পুনর্মিলনী ২০২৫",
        "📍 DTSC College Campus": "📍 ডিটিএসসি কলেজ ক্যাম্পাস",
        "◷ 9:00 AM – 5:00 PM": "◷ সকাল ৯টা – বিকাল ৫টা",

        "Career Guidance Seminar": "ক্যারিয়ার গাইডেন্স সেমিনার",
        "📍 DTSC Auditorium": "📍 ডিটিএসসি অডিটোরিয়াম",
        "◷ 2:00 PM – 5:00 PM": "◷ দুপুর ২টা – বিকাল ৫টা",

        "Alumni Get-Together": "অ্যালামনাই গেট-টুগেদার",
        "📍 Jamalpur": "📍 জামালপুর",
        "◷ 6:00 PM – 9:00 PM": "◷ সন্ধ্যা ৬টা – রাত ৯টা",

        "📷 Our Gallery": "📷 আমাদের গ্যালারি",
        "🏆 Our Achievements": "🏆 আমাদের অর্জন",

        "5,000+": "৫,০০০+",
        "Alumni Members": "অ্যালামনাই সদস্য",
        "50+": "৫০+",
        "100+": "১০০+",
        "Events": "ইভেন্ট",
        "Notices": "নোটিশ",

        "Contact DTSC Alumni Association": "ডিটিএসসি অ্যালামনাই অ্যাসোসিয়েশনে যোগাযোগ করুন",

        "Dewanganj, Jamalpur": "দেওয়ানগঞ্জ, জামালপুর",
        "✉️ Email: info@dtscalumni.org": "✉️ ইমেইল: info@dtscalumni.org",

        "Contact Us": "যোগাযোগ করুন",
        "Follow Us": "আমাদের অনুসরণ করুন",

        "Proud to be DTSCian": "গর্বিত DTSCian",

        "All Rights Reserved.": "সর্বস্বত্ব সংরক্ষিত।",
        "Privacy Policy": "গোপনীয়তা নীতি",
        "Terms of Service": "সেবার শর্তাবলি"

    };


    /* ======================================
       5. TRANSLATION FUNCTION
    ====================================== */

    const originalTexts = new WeakMap();

    function translatePage(language) {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {

            const parent = node.parentElement;

            if (
                !parent ||
                ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
            ) {
                return;
            }

            if (!originalTexts.has(node)) {
                originalTexts.set(node, node.nodeValue);
            }

            const original = originalTexts.get(node);
            const trimmed = original.trim();

            if (!trimmed) return;

            let translated = trimmed;

            if (language === "bn" && translations[trimmed]) {
                translated = translations[trimmed];
            }

            // Restore original English text
            if (language === "en") {
                node.nodeValue = original;
                return;
            }

            const start = original.indexOf(trimmed);
            const end = start + trimmed.length;

            node.nodeValue =
                original.slice(0, start) +
                translated +
                original.slice(end);

        });


        // Update document language
        document.documentElement.lang = language;

        // Update language button
        if (languageToggle) {

            languageToggle.textContent =
                language === "en" ? "(BN)" : "(EN)";

            languageToggle.setAttribute(
                "aria-label",
                language === "en"
                    ? "Switch to Bangla"
                    : "Switch to English"
            );

        }

        currentLanguage = language;

    }


    /* ======================================
       6. LANGUAGE BUTTON CLICK
    ====================================== */

    if (languageToggle) {

        languageToggle.addEventListener("click", function () {

            const nextLanguage =
                currentLanguage === "en" ? "bn" : "en";

            translatePage(nextLanguage);

        });

    }


    /* ======================================
       7. DEFAULT ENGLISH
    ====================================== */

    translatePage("en");


});
