
/* ==========================================
   DTSC ALUMNI DIRECTORY
   Frontend Demo Version
========================================== */

// ==========================================
// 1. DEMO MEMBER DATA
// ==========================================

const members = [
  {
    name: "Rahim Uddin",
    id: "DTSC-2020-001",
    roles: ["Student"],
    exam: "Diploma",
    trade: "Computer",
    year: "2020",
    blood: "B+",
    status: "Active",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhanmondi",
    contact: "01700000001",
    photo: ""
  },
  {
    name: "Karim Ahmed",
    id: "DTSC-2018-002",
    roles: ["Student", "Admin"],
    exam: "Diploma",
    trade: "Mechanical",
    year: "2018",
    blood: "O+",
    status: "Active",
    division: "Dhaka",
    district: "Jamalpur",
    upazila: "Dewanganj",
    contact: "01700000002",
    photo: ""
  },
  {
    name: "Abdul Mannan",
    id: "DTSC-T-003",
    roles: ["Teacher"],
    exam: "Teacher",
    trade: "Mechanical",
    year: "1998",
    blood: "A+",
    status: "Active",
    division: "Dhaka",
    district: "Jamalpur",
    upazila: "Dewanganj",
    contact: "01700000003",
    photo: ""
  },
  {
    name: "Sakib Hasan",
    id: "DTSC-2022-004",
    roles: ["Student"],
    exam: "Diploma",
    trade: "Electrical",
    year: "2022",
    blood: "AB+",
    status: "Pending",
    division: "Chattogram",
    district: "Cumilla",
    upazila: "Laksham",
    contact: "01700000004",
    photo: ""
  },
  {
    name: "Nusrat Jahan",
    id: "DTSC-T-005",
    roles: ["Teacher", "Admin"],
    exam: "Teacher",
    trade: "Civil",
    year: "2005",
    blood: "O-",
    status: "Active",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Mirpur",
    contact: "01700000005",
    photo: ""
  },
  {
    name: "Hasan Mahmud",
    id: "DTSC-A-006",
    roles: ["Admin"],
    exam: "Administration",
    trade: "General",
    year: "2010",
    blood: "A-",
    status: "Inactive",
    division: "Dhaka",
    district: "Mymensingh",
    upazila: "Mymensingh Sadar",
    contact: "01700000006",
    photo: ""
  }
];


// ==========================================
// 2. HTML ELEMENTS
// ==========================================

const searchInput = document.getElementById("searchInput");

const memberType = document.getElementById("memberType");
const lastExam = document.getElementById("lastExam");
const trade = document.getElementById("trade");
const passingYear = document.getElementById("passingYear");
const bloodGroup = document.getElementById("bloodGroup");
const membershipStatus = document.getElementById("membershipStatus");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const resultsCount = document.getElementById("resultsCount");
const memberList = document.getElementById("memberList");

const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");

const profilePhoto = document.getElementById("profilePhoto");
const profileName = document.getElementById("profileName");
const profileId = document.getElementById("profileId");
const profileBadges = document.getElementById("profileBadges");
const profileDetails = document.getElementById("profileDetails");


// ==========================================
// 3. DYNAMIC PASSING YEAR
// Current Year to 1966
// ==========================================

function generatePassingYears() {
  if (!passingYear) return;

  // Keep only the default option
  passingYear.innerHTML = '<option value="">All Passing Years</option>';

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1966; year--) {
    const option = document.createElement("option");

    option.value = String(year);
    option.textContent = String(year);

    passingYear.appendChild(option);
  }
}


// ==========================================
// 4. MEMBER ROLE HANDLER
// ==========================================

function getRoles(member) {
  if (Array.isArray(member.roles)) {
    return member.roles;
  }

  if (member.type) {
    return Array.isArray(member.type)
      ? member.type
      : [member.type];
  }

  return [];
}


// ==========================================
// 5. CREATE ROLE BADGES
// ==========================================

function createBadges(member, container) {
  container.replaceChildren();

  getRoles(member).forEach(role => {
    const badge = document.createElement("span");

    badge.className = "role-badge";

    if (role === "Student") {
      badge.textContent = "STUDENT";
    } else if (role === "Teacher") {
      badge.textContent = "HONORABLE TEACHER";
    } else if (role === "Admin") {
      badge.textContent = "ADMIN";
    } else {
      badge.textContent = role.toUpperCase();
    }

    container.appendChild(badge);
  });
}


// ==========================================
// 6. MEMBER PHOTO
// ==========================================

function setMemberImage(imageElement, member) {
  if (!member.photo) {
    imageElement.removeAttribute("src");
    imageElement.alt = member.name;
    imageElement.style.display = "none";
    return;
  }

  imageElement.src = member.photo;
  imageElement.alt = member.name;
  imageElement.style.display = "block";
}


// ==========================================
// 7. CREATE MEMBER CARD
// ==========================================

function createMemberCard(member) {
  const card = document.createElement("div");
  card.className = "member-card";

  // Left information section
  const left = document.createElement("div");
  left.className = "member-info";

  const photo = document.createElement("img");
  photo.className = "member-photo";

  setMemberImage(photo, member);

  const textArea = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = member.name;

  const id = document.createElement("p");
  id.textContent = member.id;

  textArea.append(name, id);
  left.append(photo, textArea);

  // Right action section
  const right = document.createElement("div");
  right.className = "member-actions";

  const badges = document.createElement("div");
  badges.className = "member-badges";

  createBadges(member, badges);

  const viewButton = document.createElement("button");
  viewButton.className = "view-profile";
  viewButton.textContent = "View Profile";
  viewButton.type = "button";

  viewButton.addEventListener("click", () => {
    openProfile(member);
  });

  right.append(badges, viewButton);
  card.append(left, right);

  return card;
}


// ==========================================
// 8. RENDER MEMBERS
// ==========================================

function renderMembers(list) {
  if (!memberList || !resultsCount) return;

  memberList.replaceChildren();

  resultsCount.textContent =
    `Showing ${list.length} member${list.length !== 1 ? "s" : ""}`;

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No members found. Try another search.";

    memberList.appendChild(empty);
    return;
  }

  list.forEach(member => {
    memberList.appendChild(createMemberCard(member));
  });
}


// ==========================================
// 9. SEARCH AND FILTER
// ==========================================

function searchMembers() {
  const query = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const selectedType = memberType?.value || "";
  const selectedExam = lastExam?.value || "";
  const selectedTrade = trade?.value || "";
  const selectedYear = passingYear?.value || "";
  const selectedBlood = bloodGroup?.value || "";
  const selectedStatus = membershipStatus?.value || "";

  const filteredMembers = members.filter(member => {

    // Search across public details and contact internally
    const searchableText = [
      member.name,
      member.id,
      member.division,
      member.district,
      member.upazila,
      member.contact
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(query);

    // Match selected role, including multiple roles
    const roles = getRoles(member);

    const matchesType =
      !selectedType || roles.includes(selectedType);

    const matchesExam =
      !selectedExam || member.exam === selectedExam;

    const matchesTrade =
      !selectedTrade || member.trade === selectedTrade;

    const matchesYear =
      !selectedYear || member.year === selectedYear;

    const matchesBlood =
      !selectedBlood || member.blood === selectedBlood;

    const matchesStatus =
      !selectedStatus || member.status === selectedStatus;

    return (
      matchesSearch &&
      matchesType &&
      matchesExam &&
      matchesTrade &&
      matchesYear &&
      matchesBlood &&
      matchesStatus
    );
  });

  renderMembers(filteredMembers);
}


// ==========================================
// 10. RESET ALL FILTERS
// ==========================================

function resetFilters() {
  if (searchInput) searchInput.value = "";

  if (memberType) memberType.value = "";
  if (lastExam) lastExam.value = "";
  if (trade) trade.value = "";
  if (passingYear) passingYear.value = "";
  if (bloodGroup) bloodGroup.value = "";
  if (membershipStatus) membershipStatus.value = "";

  renderMembers(members);
}


// ==========================================
// 11. OPEN PROFILE MODAL
// ==========================================

function openProfile(member) {
  if (!profileModal) return;

  profileName.textContent = member.name;
  profileId.textContent = member.id;

  setMemberImage(profilePhoto, member);

  createBadges(member, profileBadges);

  // Profile details
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

  profileDetails.replaceChildren();

  details.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "profile-detail";

    const title = document.createElement("span");
    title.textContent = label;

    const detail = document.createElement("strong");
    detail.textContent = value || "Not Available";

    item.append(title, detail);
    profileDetails.appendChild(item);
  });

  profileModal.classList.add("active");
  profileModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


// ==========================================
// 12. CLOSE PROFILE MODAL
// ==========================================

function hideProfile() {
  if (!profileModal) return;

  profileModal.classList.remove("active");
  profileModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// Close button
if (closeModal) {
  closeModal.addEventListener("click", hideProfile);
}


// Close by clicking outside modal content
if (profileModal) {
  profileModal.addEventListener("click", event => {
    if (event.target === profileModal) {
      hideProfile();
    }
  });
}


// Close with Escape key
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideProfile();
  }
});


// ==========================================
// 13. EVENT LISTENERS
// ==========================================

if (searchBtn) {
  searchBtn.addEventListener("click", searchMembers);
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetFilters);
}

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      searchMembers();
    }
  });
}


// ==========================================
// 14. INITIALIZE DIRECTORY
// ==========================================

generatePassingYears();
renderMembers(members);
