
/* ==========================================
   DTSC ALUMNI DIRECTORY
   Navy Blue + Gold
   Demo Version
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. DEMO MEMBER DATA
  ========================================== */

  const members = [
    {
      id: "DTSC-2020-001",
      name: "Rahim Uddin",
      category: "STUDENT",
      designation: "System Admin",
      photo: "https://i.pravatar.cc/200?img=12",
      exam: "Diploma",
      trade: "Computer",
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
      exam: "Diploma",
      trade: "Mechanical",
      year: "2018",
      blood: "O+",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mirpur",
      contact: "01700000002"
    },
    {
      id: "DTSC-T-003",
      name: "Abdul Mannan",
      category: "TEACHER",
      designation: "Executive Admin",
      photo: "https://i.pravatar.cc/200?img=14",
      exam: "Teacher",
      trade: "Mechanical",
      year: "1998",
      blood: "A+",
      status: "Active",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Dewanganj",
      contact: "01700000003"
    },
    {
      id: "DTSC-T-004",
      name: "Nusrat Jahan",
      category: "TEACHER",
      designation: "",
      photo: "https://i.pravatar.cc/200?img=47",
      exam: "Teacher",
      trade: "Civil",
      year: "2005",
      blood: "O-",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mirpur",
      contact: "01700000004"
    },
    {
      id: "DTSC-2022-005",
      name: "Hasan Mahmud",
      category: "STUDENT",
      designation: "Verified Member",
      photo: "https://i.pravatar.cc/200?img=15",
      exam: "Diploma",
      trade: "Electrical",
      year: "2022",
      blood: "AB+",
      status: "Pending",
      division: "Chattogram",
      district: "Cumilla",
      upazila: "Laksham",
      contact: "01700000005"
    },
    {
      id: "DTSC-2015-006",
      name: "Arif Hossain",
      category: "STUDENT",
      designation: "",
      photo: "https://i.pravatar.cc/200?img=16",
      exam: "Diploma",
      trade: "Civil",
      year: "2015",
      blood: "B-",
      status: "Inactive",
      division: "Mymensingh",
      district: "Jamalpur",
      upazila: "Melandaha",
      contact: "01700000006"
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
     Supports common existing ID variations
  ========================================== */

  function getElement(ids) {
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) return element;
    }
    return null;
  }

  const categoryFilter = getElement([
    "categoryFilter",
    "memberCategory",
    "categorySelect"
  ]);

  const examFilter = getElement([
    "examFilter",
    "lastExamFilter",
    "lastExam"
  ]);

  const tradeFilter = getElement([
    "tradeFilter",
    "tradeSelect"
  ]);

  const yearFilter = getElement([
    "yearFilter",
    "passingYearFilter",
    "passingYear"
  ]);

  const bloodFilter = getElement([
    "bloodFilter",
    "bloodGroupFilter",
    "bloodGroup"
  ]);

  const statusFilter = getElement([
    "statusFilter",
    "membershipStatusFilter",
    "membershipStatus"
  ]);


  /* ==========================================
     4. FOOTER YEAR
  ========================================== */

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* ==========================================
     5. CATEGORY OPTIONS
     Only STUDENT and TEACHER
  ========================================== */

  function setupCategoryFilter() {

    if (!categoryFilter) return;

    categoryFilter.innerHTML = `
      <option value="">All Categories</option>
      <option value="STUDENT">Student</option>
      <option value="TEACHER">Teacher</option>
    `;
  }

  setupCategoryFilter();


  /* ==========================================
     6. DYNAMIC PASSING YEARS
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
     7. INITIALS AVATAR
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

    return avatar;
  }


  /* ==========================================
     8. CREATE CATEGORY BADGE
  ========================================== */

  function createCategoryBadge(category) {

    const badge = document.createElement("span");

    badge.className = "role-badge";

    if (category === "STUDENT") {

      badge.classList.add("student");

    } else {

      badge.classList.add("teacher");

    }

    badge.textContent = category;

    return badge;
  }


  /* ==========================================
     9. MEMBER CARD
     LEFT: PHOTO + NAME + ID + DESIGNATION

     RIGHT: CATEGORY BADGE + VIEW PROFILE
  ========================================== */

  function createMemberCard(member) {

    const card = document.createElement("article");

    card.className = "member-card";

    /* LEFT SIDE */

    const info = document.createElement("div");

    info.className = "member-info";

    /* Profile Photo */

    let photo;

    if (member.photo) {

      photo = document.createElement("img");

      photo.className = "member-photo";

      photo.src = member.photo;

      photo.alt = member.name;

      photo.loading = "lazy";

      photo.onerror = function () {

        const avatar = createAvatar(member.name);

        this.replaceWith(avatar);

      };

    } else {

      photo = createAvatar(member.name);

    }

    /* Member Text */

    const textBox = document.createElement("div");

    textBox.className = "member-text";

    const name = document.createElement("h3");

    name.textContent = member.name;

    const id = document.createElement("p");

    id.textContent = member.id;

    textBox.appendChild(name);

    textBox.appendChild(id);

    /* Admin Given Designation */

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

    /* Only Main Category Badge */

    badges.appendChild(
      createCategoryBadge(member.category)
    );

    /* View Profile Button */

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
     10. FILTERING SYSTEM
  ========================================== */

  function getValue(element) {

    return element ? element.value.trim() : "";

  }

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

      empty.textContent = "No members found. Please try another search.";

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

    if (profilePhoto) {

      profilePhoto.src = member.photo || "";

      profilePhoto.alt = member.name;

      profilePhoto.style.borderRadius = "50%";

      profilePhoto.onerror = function () {

        this.style.display = "none";

      };

      profilePhoto.style.display = member.photo ? "block" : "none";

    }

    if (profileName) {
      profileName.textContent = member.name;
    }

    if (profileId) {
      profileId.textContent = member.id;
    }

    /* Profile Badges */

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


    /* Profile Details */

    if (profileDetails) {

      profileDetails.innerHTML = "";

      const details = [

        ["Membership Status", member.status],
        ["Last Exam", member.exam],
        ["Trade", member.trade],
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
     13. CLOSE MODAL
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
     15. FILTER EVENTS
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
     17. RESET BUTTON
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
