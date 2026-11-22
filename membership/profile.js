
/* ==========================================
   DTSC ALUMNI PROFILE
   Dynamic Profile Loader
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. DEMO DATABASE

     These IDs must match directory.js
     Later connect with Supabase.
  ========================================== */

  const members = [

    {
      name: "Md. Rahim Uddin",
      id: "DTSC-2020-001",
      image: "https://i.pravatar.cc/160?img=12",

      category: "Student",
      blood: "O+",
      status: "Verified",

      upazila: "Dewanganj",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Diploma in Engineering",
      trade: "70 - Mechanical Technology",
      year: "2020",
      institute: "Dewanganj Technical School & College",

      profession: "Service Holder",
      designation: "Mechanical Technician",
      organization: "ABC Engineering Ltd.",
      workLocation: "Dhaka, Bangladesh",

      role: "General Secretary",
      memberSince: "2026",

      contact: "01700000001",
      email: "rahim@example.com",
      address: "Dewanganj, Jamalpur, Bangladesh"
    },

    {
      name: "Nusrat Jahan",
      id: "DTSC-2018-014",
      image: "https://i.pravatar.cc/160?img=47",

      category: "Teacher",
      blood: "A+",
      status: "Verified",

      upazila: "Jamalpur Sadar",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Secondary School Certificate",
      trade: "67 - Electrical Technology",
      year: "2018",
      institute: "Dewanganj Technical School & College",

      profession: "Teacher",
      designation: "Instructor",
      organization: "Technical Institute",
      workLocation: "Jamalpur, Bangladesh",

      role: "",
      memberSince: "2026",

      contact: "01700000002",
      email: "nusrat@example.com",
      address: "Jamalpur Sadar, Jamalpur, Bangladesh"
    },

    {
      name: "Sabbir Ahmed",
      id: "DTSC-2022-027",
      image: "https://i.pravatar.cc/160?img=13",

      category: "Student",
      blood: "B+",
      status: "Pending",

      upazila: "Islampur",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Diploma in Engineering",
      trade: "30 - Machine Tools Operation and Maintenance",
      year: "2022",
      institute: "Dewanganj Technical School & College",

      profession: "Student",
      designation: "Not Provided",
      organization: "Not Provided",
      workLocation: "Not Provided",

      role: "Executive Member",
      memberSince: "2026",

      contact: "01700000003",
      email: "sabbir@example.com",
      address: "Islampur, Jamalpur, Bangladesh"
    },

    {
      name: "Mst. Tania Akter",
      id: "DTSC-2021-035",
      image: "https://i.pravatar.cc/160?img=44",

      category: "Student",
      blood: "AB+",
      status: "Verified",

      upazila: "Melandaha",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Higher Secondary Certificate",
      trade: "General Electrical Works",
      year: "2021",
      institute: "Dewanganj Technical School & College",

      profession: "Student",
      designation: "",
      organization: "",
      workLocation: "",

      role: "",
      memberSince: "2026",

      contact: "01700000004",
      email: "tania@example.com",
      address: "Melandaha, Jamalpur, Bangladesh"
    },

    {
      name: "Abdullah Al Mamun",
      id: "DTSC-2019-042",
      image: "https://i.pravatar.cc/160?img=14",

      category: "Teacher",
      blood: "O-",
      status: "Verified",

      upazila: "Sarishabari",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Diploma in Engineering",
      trade: "27 - Electrical Works and Maintenance",
      year: "2019",
      institute: "Dewanganj Technical School & College",

      profession: "Teacher",
      designation: "Senior Instructor",
      organization: "Technical Institute",
      workLocation: "Jamalpur, Bangladesh",

      role: "President",
      memberSince: "2026",

      contact: "01700000005",
      email: "mamun@example.com",
      address: "Sarishabari, Jamalpur, Bangladesh"
    },

    {
      name: "Mehedi Hasan",
      id: "DTSC-2023-052",
      image: "https://i.pravatar.cc/160?img=15",

      category: "Student",
      blood: "B-",
      status: "Pending",

      upazila: "Dewanganj",
      district: "Jamalpur",
      division: "Mymensingh",

      exam: "Junior School Certificate",
      trade: "Refrigeration And Air Conditions",
      year: "2023",
      institute: "Dewanganj Technical School & College",

      profession: "",
      designation: "",
      organization: "",
      workLocation: "",

      role: "",
      memberSince: "2026",

      contact: "01700000006",
      email: "",
      address: "Dewanganj, Jamalpur, Bangladesh"
    }

  ];


  /* ==========================================
     2. GET MEMBER ID FROM URL
  ========================================== */

  const params = new URLSearchParams(window.location.search);

  const memberID = params.get("id");


  /* ==========================================
     3. FIND MEMBER
  ========================================== */

  const member = members.find(item => item.id === memberID);


  /* ==========================================
     4. ELEMENT HELPERS
  ========================================== */

  function setText(elementID, value) {

    const element = document.getElementById(elementID);

    if (!element) return;

    element.textContent =
      value && String(value).trim()
        ? value
        : "N/A";
  }


  /* ==========================================
     5. PROFILE NOT FOUND
  ========================================== */

  if (!member) {

    document.querySelectorAll(
      ".profile-hero, .profile-section"
    ).forEach(section => {
      section.hidden = true;
    });

    document.getElementById("profileNotFound").hidden = false;

    document.title = "Profile Not Found | DTSC Alumni";

    return;
  }


  /* ==========================================
     6. PROFILE HEADER
  ========================================== */

  setText("profileName", member.name);

  setText("profileID", "ID: " + member.id);

  const profileImage = document.getElementById("profileImage");

  profileImage.src = member.image;

  profileImage.alt = member.name;

  profileImage.onerror = function () {
    this.src = "https://placehold.co/160x160?text=Alumni";
  };


  /* VERIFICATION STATUS */

  const verificationStatus =
    document.getElementById("verificationStatus");

  if (member.status === "Verified") {

    verificationStatus.textContent = "✓ Verified Alumni";

    verificationStatus.className = "verified-status";

  } else {

    verificationStatus.textContent = "● Pending Verification";

    verificationStatus.className = "pending-status";

  }


  /* PROFILE TAGS */

  const tags = [
    member.category,
    member.blood,
    member.upazila + ", " + member.district
  ];

  document.getElementById("profileTags").innerHTML =
    tags.map(tag => {

      const span = document.createElement("span");

      span.className = "profile-tag";

      span.textContent = tag;

      return span.outerHTML;

    }).join("");


  /* ==========================================
     7. PERSONAL INFORMATION
  ========================================== */

  setText("personalName", member.name);
  setText("personalID", member.id);
  setText("personalCategory", member.category);
  setText("personalBlood", member.blood);
  setText("personalUpazila", member.upazila);
  setText("personalDistrict", member.district);
  setText("personalDivision", member.division);


  /* ==========================================
     8. EDUCATIONAL INFORMATION
  ========================================== */

  setText("educationExam", member.exam);
  setText("educationTrade", member.trade);
  setText("educationYear", member.year);
  setText("educationInstitute", member.institute);


  /* ==========================================
     9. PROFESSIONAL INFORMATION
  ========================================== */

  setText("profession", member.profession);
  setText("designation", member.designation);
  setText("organization", member.organization);
  setText("workLocation", member.workLocation);


  /* ==========================================
     10. ASSOCIATION INFORMATION
  ========================================== */

  const roleBox = document.getElementById("associationRole");

  if (member.role && member.role.trim()) {

    roleBox.textContent =
      member.role + " · DTSC Alumni Association";

    roleBox.hidden = false;

  } else {

    roleBox.hidden = true;

  }

  setText("membershipStatus", member.status);
  setText("memberSince", member.memberSince);


  /* ==========================================
     11. CONTACT INFORMATION
  ========================================== */

  const contactNumber = document.getElementById("contactNumber");

  if (member.contact) {

    contactNumber.textContent = member.contact;

    contactNumber.href =
      "tel:" + member.contact.replace(/[^\d+]/g, "");

  } else {

    contactNumber.textContent = "N/A";

    contactNumber.removeAttribute("href");

  }


  const contactEmail = document.getElementById("contactEmail");

  if (member.email) {

    contactEmail.textContent = member.email;

    contactEmail.href = "mailto:" + member.email;

  } else {

    contactEmail.textContent = "N/A";

    contactEmail.removeAttribute("href");

  }


  setText("contactAddress", member.address);


  /* ==========================================
     12. PAGE TITLE
  ========================================== */

  document.title =
    member.name + " | DTSC Alumni Profile";


});
