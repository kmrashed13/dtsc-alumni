
/* =========================================
   DTSC ALUMNI ASSOCIATION
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* MOBILE MENU */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }


  /* ACCOUNT DROPDOWN */
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


  /* LANGUAGE TRANSLATION */
  const languageToggle = document.getElementById("languageToggle");

  let currentLanguage = "EN";

  const translations = {
    "Home": "হোম",
    "About Us": "আমাদের সম্পর্কে",
    "Events": "ইভেন্টসমূহ",
    "Gallery": "গ্যালারি",
    "Membership Directory": "সদস্য ডিরেক্টরি",
    "Contact": "যোগাযোগ",
    "Account": "অ্যাকাউন্ট",
    "Register": "নিবন্ধন",
    "Login": "লগইন",
    "Welcome to": "স্বাগতম",
    "DTSC Alumni Association": "ডিটিএসসি অ্যালামনাই অ্যাসোসিয়েশন",
    "A Bond Beyond Graduation": "স্নাতকের পরেও অটুট বন্ধন",
    "Join Our Community": "আমাদের কমিউনিটিতে যোগ দিন",
    "About Our Association": "আমাদের সংগঠন সম্পর্কে",
    "Our History, Our Pride, Our Community": "আমাদের ইতিহাস, আমাদের গর্ব, আমাদের কমিউনিটি",
    "Welcome to Our Alumni Community": "আমাদের অ্যালামনাই কমিউনিটিতে স্বাগতম",
    "Read More →": "আরও পড়ুন →",
    "Notice Board": "নোটিশ বোর্ড",
    "Latest announcements and updates": "সর্বশেষ ঘোষণা ও আপডেট",
    "No notices available at the moment.": "এই মুহূর্তে কোনো নোটিশ নেই।",
    "Upcoming Events": "আসন্ন ইভেন্টসমূহ",
    "Stay connected with our activities": "আমাদের কার্যক্রমের সঙ্গে যুক্ত থাকুন",
    "Upcoming events will be published here.": "আসন্ন ইভেন্টের তথ্য এখানে প্রকাশ করা হবে।",
    "View All Events →": "সব ইভেন্ট দেখুন →",
    "Photo Gallery": "ফটো গ্যালারি",
    "Memories that bring us together": "যেসব স্মৃতি আমাদের একত্রিত করে",
    "Explore Gallery →": "গ্যালারি দেখুন →",
    "Become a Member": "সদস্য হোন",
    "Reconnect with your institution and alumni family.": "আপনার প্রতিষ্ঠান ও অ্যালামনাই পরিবারের সঙ্গে যুক্ত হোন।",
    "Register Now": "এখনই নিবন্ধন করুন",
    "Contact Us": "যোগাযোগ করুন",
    "We would love to hear from you": "আপনার কথা শুনতে আমরা আগ্রহী",
    "About": "আমাদের সম্পর্কে",
    "Membership": "সদস্যপদ",
    "Connecting Generations, Building the Future": "প্রজন্মের বন্ধন, ভবিষ্যৎ নির্মাণ",
    "All Rights Reserved.": "সর্বস্বত্ব সংরক্ষিত।"
  };


  function translatePage() {

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(function (node) {

      const originalText = node.textContent.trim();

      if (!originalText) return;

      if (currentLanguage === "BN") {

        if (translations[originalText]) {
          node.textContent = translations[originalText];
        }

      } else {

        const reverseTranslations = {};

        Object.keys(translations).forEach(function (key) {
          reverseTranslations[translations[key]] = key;
        });

        if (reverseTranslations[originalText]) {
          node.textContent = reverseTranslations[originalText];
        }

      }

    });


    /* UPDATE LANGUAGE BUTTON */
    if (languageToggle) {
      languageToggle.textContent =
        currentLanguage === "EN" ? "(BN)" : "(EN)";
    }

    document.documentElement.lang =
      currentLanguage === "EN" ? "en" : "bn";
  }


  if (languageToggle) {

    languageToggle.addEventListener("click", function () {

      currentLanguage =
        currentLanguage === "EN" ? "BN" : "EN";

      translatePage();

    });

  }


  /* CLOSE MOBILE MENU AFTER NAVIGATION */
  if (navMenu) {

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
      });

    });

  }

});
