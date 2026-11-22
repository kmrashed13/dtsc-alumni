
/* ==========================================
   DTSC ALUMNI DIRECTORY
   SEARCH + FILTER + PROFILE
   NAVY BLUE + GOLD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. DEMO MEMBER DATA
     Replace with Supabase data later
  ========================================== */

  const members = [

    {
      id: "DTSC-2020-001",
      name: "RASHEDUL ISLAM",
      category: "STUDENT",
      designation: "System Admin",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Machine Tools Operation",
      year: "2024",
      blood: "O+",
      status: "VERIFIED",
      thana: "Dewanganj",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01516503120"
    },

    {
      id: "DTSC-2021-002",
      name: "S. M. M. MUSABBIR UDDIN",
      category: "STUDENT",
      designation: "Content Writing Team",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "General Electrical Works",
      year: "2025",
      blood: "A+",
      status: "ACTIVE",
      thana: "Jamalpur Sadar",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000001"
    },

    {
      id: "DTSC-2022-003",
      name: "RAHIM UDDIN",
      category: "STUDENT",
      designation: "Moderator",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Refrigeration And Air Conditions",
      year: "2025",
      blood: "B+",
      status: "VERIFIED",
      thana: "Islampur",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000002"
    },

    {
      id: "DTSC-T-001",
      name: "MD. ABDUL KARIM",
      category: "TEACHER",
      designation: "Senior Instructor",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Electrical Works and Maintenance",
      year: "2020",
      blood: "AB+",
      status: "VERIFIED",
      thana: "Dewanganj",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000003"
    },

    {
      id: "DTSC-2023-004",
      name: "TANVIR AHMED",
      category: "STUDENT",
      designation: "",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Agro Machinery",
      year: "2026",
      blood: "O-",
      status: "PENDING",
      thana: "Melandaha",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000004"
    },

    {
      id: "DTSC-T-002",
      name: "MD. RAFIQUL ISLAM",
      category: "TEACHER",
      designation: "",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Machine Tools Operation",
      year: "2020",
      blood: "B-",
      status: "ACTIVE",
      thana: "Dewanganj",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000005"
    },

    {
      id: "DTSC-2024-005",
      name: "SHAKIL HOSSAIN",
      category: "STUDENT",
      designation: "",
      photo: "../assets/default-user.png",
      exam: "DIPLOMA",
      trade: "Firm Machinery",
      year: "2025",
      blood: "AB-",
      status: "ACTIVE",
      thana: "Bakshiganj",
      district: "Jamalpur",
      division: "Mymensingh",
      contact: "01700000006"
    }

  ];


  /* ==========================================
     2. HTML ELEMENTS
  ========================================== */

  const $ = id => document.getElementById(id);

  const searchInput = $("searchInput");
  const clearSearch = $("clearSearch");

  const categoryFilter = $("categoryFilter");
  const examFilter = $("examFilter");
  const tradeFilter = $("tradeFilter");
  const yearFilter = $("yearFilter");
  const bloodFilter = $("bloodFilter");
  const statusFilter = $("statusFilter");

  const searchBtn = $("searchBtn");
  const resetBtn = $("resetBtn");

  const resultsCount = $("resultsCount");
  const memberList = $("memberList");
  const emptyState = $("emptyState");

  const profileModal = $("profileModal");
  const closeModal = $("closeModal");
  const modalOverlay = $("modalOverlay");

  const profilePhoto = $("profilePhoto");
  const profileName = $("profileName");
  const profileId = $("profileId");
  const profileBadges = $("profileBadges");
  const profileDetails = $("profileDetails");


  /* ==========================================
     3. HELPER FUNCTIONS
  ========================================== */

  function normalize(value) {
    return String(value ?? "").toLowerCase().trim();
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function categoryClass(category) {
    return category === "TEACHER" ? "teacher" : "student";
  }

  function categoryName(category) {
    return category === "TEACHER" ? "TEACHER" : "STUDENT";
  }

  function setImageFallback(image) {
    image.onerror = () => {
      image.onerror = null;
      image.src = "https://placehold.co/120x120?text=DTSC";
    };
  }


  /* ==========================================
     4. MEMBER CARD
  ========================================== */

  function createMemberCard(member) {

    const card = document.createElement("article");
    card.className = "member-card";

    const designationHTML = member.designation
      ? `
        <span class="member-designation">
          <i class="fas fa-award"></i>
          ${escapeHTML(member.designation)}
        </span>
      `
      : "";

    card.innerHTML = `

      <div class="member-info">

        <img
          class="member-photo"
          src="${escapeHTML(member.photo)}"
          alt="${escapeHTML(member.name)}"
        >

        <div class="member-text">

          <h3>${escapeHTML(member.name)}</h3>

          <p>${escapeHTML(member.id)}</p>

          ${designationHTML}

        </div>

      </div>

      <div class="member-actions">

        <div class="member-badges">

          <span class="role-badge ${categoryClass(member.category)}">
            ${categoryName(member.category)}
          </span>

        </div>

        <button type="button" class="view-profile">
          <i class="fas fa-eye"></i>
          View Profile
        </button>

      </div>

    `;

    setImageFallback(card.querySelector(".member-photo"));

    card.querySelector(".view-profile").addEventListener("click", () => {
      openProfile(member);
    });

    return card;
  }


  /* ==========================================
     5. DISPLAY MEMBERS
  ========================================== */

  function displayMembers(list) {

    memberList.innerHTML = "";

    list.forEach(member => {
      memberList.appendChild(createMemberCard(member));
    });

    resultsCount.innerHTML = `
      <strong>${list.length}</strong>
      <span>Members Found</span>
    `;

    memberList.style.display = list.length ? "flex" : "none";
    emptyState.style.display = list.length ? "none" : "block";
  }


  /* ==========================================
     6. SEARCH + FILTER
  ========================================== */

  function filterMembers() {

    const query = normalize(searchInput.value);

    const category = categoryFilter.value;
    const exam = examFilter.value;
    const trade = tradeFilter.value;
    const year = yearFilter.value;
    const blood = bloodFilter.value;
    const status = statusFilter.value;

    const filtered = members.filter(member => {

      // Search: Name / ID / Thana / District /
      // Division / Contact No

      const searchFields = [
        member.name,
        member.id,
        member.thana,
        member.district,
        member.division,
        member.contact
      ];

      const matchesSearch =
        !query ||
        searchFields.some(value =>
          normalize(value).includes(query)
        );

      const matchesCategory =
        !category || member.category === category;

      const matchesExam =
        !exam || member.exam === exam;

      const matchesTrade =
        !trade || member.trade === trade;

      const matchesYear =
        !year || member.year === year;

      const matchesBlood =
        !blood || member.blood === blood;

      const matchesStatus =
        !status || member.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesExam &&
        matchesTrade &&
        matchesYear &&
        matchesBlood &&
        matchesStatus
      );

    });

    displayMembers(filtered);
  }


  /* ==========================================
     7. PROFILE MODAL
  ========================================== */

  function openProfile(member) {

    profilePhoto.src = member.photo;
    setImageFallback(profilePhoto);

    profileName.textContent = member.name;
    profileId.textContent = member.id;

    profileBadges.innerHTML = `

      <span class="role-badge ${categoryClass(member.category)}">
        ${categoryName(member.category)}
      </span>

      ${member.designation ? `
        <span class="role-badge admin">
          <i class="fas fa-award"></i>
          ${escapeHTML(member.designation)}
        </span>
      ` : ""}

    `;

    const details = [
      ["Examination", member.exam],
      ["Trade / Technology", member.trade],
      ["Passing Year", member.year],
      ["Blood Group", member.blood],
      ["Status", member.status],
      ["Thana", member.thana],
      ["District", member.district],
      ["Division", member.division],
      ["Contact No", member.contact]
    ];

    profileDetails.innerHTML = details.map(([label, value]) => `

      <div class="profile-detail-item">
        <span>${escapeHTML(label)}</span>
        <strong>${escapeHTML(value || "Not Provided")}</strong>
      </div>

    `).join("");

    profileModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }


  /* ==========================================
     8. CLOSE PROFILE MODAL
  ========================================== */

  function closeProfile() {

    profileModal.classList.remove("active");
    document.body.style.overflow = "";

  }

  closeModal.addEventListener("click", closeProfile);
  modalOverlay.addEventListener("click", closeProfile);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeProfile();
    }
  });


  /* ==========================================
     9. SEARCH EVENTS
  ========================================== */

  searchBtn.addEventListener("click", filterMembers);

  searchInput.addEventListener("input", filterMembers);

  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      filterMembers();
    }
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterMembers();
    searchInput.focus();
  });


  /* ==========================================
     10. FILTER EVENTS
  ========================================== */

  [
    categoryFilter,
    examFilter,
    tradeFilter,
    yearFilter,
    bloodFilter,
    statusFilter
  ].forEach(filter => {
    filter.addEventListener("change", filterMembers);
  });


  /* ==========================================
     11. RESET FILTERS
  ========================================== */

  resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    [
      categoryFilter,
      examFilter,
      tradeFilter,
      yearFilter,
      bloodFilter,
      statusFilter
    ].forEach(filter => {
      filter.value = "";
    });

    displayMembers(members);

  });


  /* ==========================================
     12. INITIAL LOAD
  ========================================== */

  displayMembers(members);

  console.log("DTSC Alumni Directory Loaded Successfully");

});
