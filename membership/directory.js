
/* ==========================================
   DTSC ALUMNI DIRECTORY
   Navy Blue + Gold
   Demo Version
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. DEMO MEMBER DATA
     Replace with database data later
  ========================================== */

  const members = [

    {
      id: "DTSC-2020-001",
      name: "Rahim Uddin",
      category: "STUDENT",
      designation: "System Admin",
      photo: "https://i.pravatar.cc/200?img=12",
      exam: "Diploma in Engineering",
      trade: "70 - Mechanical Technology",
      year: "2020",
      blood: "B+",
      status: "Active",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Dewanganj",
      contact: "01700000001"
    },

    {
      id: "DTSC-2018-002",
      name: "Sakib Ahmed",
      category: "STUDENT",
      designation: "Moderator",
      photo: "https://i.pravatar.cc/200?img=13",
      exam: "Diploma in Engineering",
      trade: "27 - Electrical Works and Maintenance",
      year: "2018",
      blood: "O+",
      status: "Active",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Dewanganj",
      contact: "01700000002"
    },

    {
      id: "DTSC-2016-003",
      name: "Karim Ahmed",
      category: "STUDENT",
      designation: "Verified Member",
      photo: "https://i.pravatar.cc/200?img=15",
      exam: "Diploma in Engineering",
      trade: "32 - Refrigeration and Air-conditioning",
      year: "2016",
      blood: "A+",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mirpur",
      contact: "01700000003"
    },

    {
      id: "DTSC-2022-004",
      name: "Hasan Mahmud",
      category: "STUDENT",
      designation: "",
      photo: "https://i.pravatar.cc/200?img=14",
      exam: "Diploma in Engineering",
      trade: "67 - Electrical Technology",
      year: "2022",
      blood: "AB+",
      status: "Pending",
      division: "Chattogram",
      district: "Cumilla",
      upazila: "Laksham",
      contact: "01700000004"
    },

    {
      id: "DTSC-2015-005",
      name: "Arif Hossain",
      category: "STUDENT",
      designation: "",
      photo: "https://i.pravatar.cc/200?img=16",
      exam: "Secondary School Certificate",
      trade: "Machine Tools Operation",
      year: "2015",
      blood: "B-",
      status: "Inactive",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Melandaha",
      contact: "01700000005"
    },

    {
      id: "DTSC-T-006",
      name: "Abdul Mannan",
      category: "TEACHER",
      designation: "Teacher",
      photo: "https://i.pravatar.cc/200?img=11",
      exam: "",
      trade: "",
      year: "",
      blood: "A+",
      status: "Active",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Dewanganj",
      contact: "01700000006"
    },

    {
      id: "DTSC-T-007",
      name: "Nusrat Jahan",
      category: "TEACHER",
      designation: "Senior Teacher",
      photo: "https://i.pravatar.cc/200?img=47",
      exam: "",
      trade: "",
      year: "",
      blood: "O-",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mirpur",
      contact: "01700000007"
    }

  ];


  /* ==========================================
     2. HTML ELEMENTS
  ========================================== */

  const searchInput = document.getElementById("searchInput");
  const memberList = document.getElementById("memberList");
  const resultsCount = document.getElementById("resultsCount");

  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  const footerYear = document.getElementById("footerYear");

  const profileModal = document.getElementById("profileModal");
  const closeModal = document.getElementById("closeModal");

  const profilePhoto = document.getElementById("profilePhoto");
  const profileName = document.getElementById("profileName");
  const profileId = document.getElementById("profileId");
  const profileBadges = document.getElementById("profileBadges");
  const profileDetails = document.getElementById("profileDetails");


  /* ==========================================
     3. FILTER ELEMENTS
  ========================================== */

  const categoryFilter = document.getElementById("categoryFilter");
  const examFilter = document.getElementById("examFilter");
  const tradeFilter = document.getElementById("tradeFilter");
  const yearFilter = document.getElementById("yearFilter");
  const bloodFilter = document.getElementById("bloodFilter");
  const statusFilter = document.getElementById("statusFilter");


  /* ==========================================
     4. FOOTER YEAR
  ========================================== */

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* ==========================================
     5. DYNAMIC PASSING YEARS
     Current Year to 1966
  ========================================== */

  function generatePassingYears() {

    if (!yearFilter) return;

    yearFilter.innerHTML = `
      <option value="">All Passing Years</option>
    `;

    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1966; year--) {

      const option = document.createElement("option");

      option.value = String(year);
      option.textContent = String(year);

      yearFilter.appendChild(option);

    }

  }

  generatePassingYears();


  /* ==========================================
     6. INITIALS AVATAR
  ========================================== */

  function getInitials(name) {

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join("");

  }


  function createAvatar(name) {

    const avatar = document.createElement("div");

    avatar.className = "member-photo member-avatar";
    avatar.textContent = getInitials(name);

    avatar.style.display = "grid";
    avatar.style.placeItems = "center";
    avatar.style.fontWeight = "800";
    avatar.style.fontSize = "19px";
    avatar.style.color = "#101d36";
    avatar.style.background = "#f0d99f";
    avatar.style.borderRadius = "50%";
    avatar.style.flexShrink = "0";

    return avatar;

  }


  /* ==========================================
     7. CATEGORY BADGE
  ========================================== */

  function createCategoryBadge(category) {

    const badge = document.createElement("span");

    badge.className = "role-badge";

    if (category === "STUDENT") {

      badge.classList.add("student");
      badge.textContent = "STUDENT";

    } else {

      badge.classList.add("teacher");
      badge.textContent = "TEACHER";

    }

    return badge;

  }


  /* ==========================================
     8. MEMBER CARD
     LEFT: PHOTO + NAME + ID + DESIGNATION
     RIGHT: CATEGORY + VIEW PROFILE
  ========================================== */

  function createMemberCard(member) {

    const card = document.createElement("article");
    card.className = "member-card";


    /* LEFT SIDE */

    const info = document.createElement("div");
    info.className = "member-info";


    /* PROFILE PHOTO */

    let photo;

    if (member.photo) {

      photo = document.createElement("img");

      photo.className = "member-photo";
      photo.src = member.photo;
      photo.alt = member.name;
      photo.loading = "lazy";

      photo.onerror = function () {

        this.replaceWith(createAvatar(member.name));

      };

    } else {

      photo = createAvatar(member.name);

    }


    /* MEMBER INFORMATION */

    const textBox = document.createElement("div");
    textBox.className = "member-text";

    const name = document.createElement("h3");
    name.textContent = member.name;

    const id = document.createElement("p");
    id.textContent = member.id;

    textBox.appendChild(name);
    textBox.appendChild(id);


    /* ADMIN GIVEN DESIGNATION */

    if (member.designation) {

      const designation = document.createElement("span");

      designation.className = "member-designation";
      designation.textContent = member.designation;

      textBox.appendChild(designation);

    }

    info.appendChild(photo);
    info.appendChild(textBox);


    /* RIGHT SIDE */

    const actions = document.createElement("div");
    actions.className = "member-actions";

    const badges = document.createElement("div");
    badges.className = "member-badges";

    badges.appendChild(
      createCategoryBadge(member.category)
    );


    /* VIEW PROFILE */

    const viewButton = document.createElement("button");

    viewButton.type = "button";
    viewButton.className = "view-profile";
    viewButton.textContent = "View Profile";

    viewButton.addEventListener("click", () => {
      openProfile(member);
    });

    actions.appendChild(badges);
    actions.appendChild(viewButton);

    card.appendChild(info);
    card.appendChild(actions);

    return card;

  }


  /* ==========================================
     9. GET FILTER VALUE
  ========================================== */

  function getValue(element) {

    return element ? element.value.trim() : "";

  }


  /* ==========================================
     10. FILTERING SYSTEM
  ========================================== */

  function filterMembers() {

    const search = getValue(searchInput).toLowerCase();

    const category = getValue(categoryFilter);
    const exam = getValue(examFilter);
    const trade = getValue(tradeFilter);
    const year = getValue(yearFilter);
    const blood = getValue(bloodFilter);
    const status = getValue(statusFilter);


    return members.filter(member => {

      const searchContent = [

        member.name,
        member.id,
        member.category,
        member.designation,
        member.exam,
        member.trade,
        member.year,
        member.blood,
        member.status,
        member.division,
        member.district,
        member.upazila,
        member.contact

      ].join(" ").toLowerCase();


      const matchesSearch =
        !search || searchContent.includes(search);


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

  }


  /* ==========================================
     11. DISPLAY MEMBERS
  ========================================== */

  function displayMembers() {

    if (!memberList) return;

    const filteredMembers = filterMembers();

    memberList.innerHTML = "";

    if (resultsCount) {

      resultsCount.textContent =
        `${filteredMembers.length} Members`;

    }


    if (filteredMembers.length === 0) {

      const empty = document.createElement("div");

      empty.className = "empty-state";
      empty.textContent =
        "No members found. Please try another search.";

      memberList.appendChild(empty);

      return;

    }


    filteredMembers.forEach(member => {

      memberList.appendChild(
        createMemberCard(member)
      );

    });

  }


  /* ==========================================
     12. PROFILE MODAL
  ========================================== */

  function openProfile(member) {

    if (!profileModal) return;


    /* PROFILE PHOTO */

    if (profilePhoto) {

      profilePhoto.style.display = "block";
      profilePhoto.src = member.photo || "";
      profilePhoto.alt = member.name;

      profilePhoto.onerror = function () {
        this.style.display = "none";
      };

      if (!member.photo) {
        profilePhoto.style.display = "none";
      }

    }


    /* NAME AND ID */

    if (profileName) {
      profileName.textContent = member.name;
    }

    if (profileId) {
      profileId.textContent = member.id;
    }


    /* CATEGORY AND DESIGNATION */

    if (profileBadges) {

      profileBadges.innerHTML = "";

      profileBadges.appendChild(
        createCategoryBadge(member.category)
      );

      if (member.designation) {

        const designation = document.createElement("span");

        designation.className = "role-badge admin";
        designation.textContent = member.designation;

        profileBadges.appendChild(designation);

      }

    }


    /* PROFILE DETAILS */

    if (profileDetails) {

      profileDetails.innerHTML = "";

      const details = [

        ["Membership Status", member.status],
        ["Last Exam", member.exam],
        ["Trade / Technology", member.trade],
        ["Passing Year", member.year],
        ["Blood Group", member.blood],
        ["Division", member.division],
        ["District", member.district],
        ["Upazila", member.upazila]

      ];


      details.forEach(([label, value]) => {

        const item = document.createElement("div");
        item.className = "profile-detail";

        const title = document.createElement("span");
        title.textContent = label;

        const content = document.createElement("strong");
        content.textContent = value || "Not Available";

        item.appendChild(title);
        item.appendChild(content);

        profileDetails.appendChild(item);

      });

    }


    profileModal.classList.add("active");
    document.body.style.overflow = "hidden";

  }


  /* ==========================================
     13. CLOSE PROFILE MODAL
  ========================================== */

  function closeProfile() {

    if (!profileModal) return;

    profileModal.classList.remove("active");
    document.body.style.overflow = "";

  }


  if (closeModal) {

    closeModal.addEventListener("click", closeProfile);

  }


  if (profileModal) {

    profileModal.addEventListener("click", event => {

      if (event.target === profileModal) {
        closeProfile();
      }

    });

  }


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeProfile();
    }

  });


  /* ==========================================
     14. INSTANT SEARCH
  ========================================== */

  if (searchInput) {

    searchInput.addEventListener("input", displayMembers);

  }


  /* ==========================================
     15. FILTER CHANGE EVENTS
  ========================================== */

  [

    categoryFilter,
    examFilter,
    tradeFilter,
    yearFilter,
    bloodFilter,
    statusFilter

  ].forEach(filter => {

    if (filter) {

      filter.addEventListener("change", displayMembers);

    }

  });


  /* ==========================================
     16. SEARCH BUTTON
  ========================================== */

  if (searchBtn) {

    searchBtn.addEventListener("click", displayMembers);

  }


  /* ==========================================
     17. RESET FILTERS
  ========================================== */

  if (resetBtn) {

    resetBtn.addEventListener("click", () => {

      if (searchInput) searchInput.value = "";

      if (categoryFilter) categoryFilter.value = "";
      if (examFilter) examFilter.value = "";
      if (tradeFilter) tradeFilter.value = "";
      if (yearFilter) yearFilter.value = "";
      if (bloodFilter) bloodFilter.value = "";
      if (statusFilter) statusFilter.value = "";

      displayMembers();

    });

  }


  /* ==========================================
     18. INITIAL LOAD
  ========================================== */

  displayMembers();

});
