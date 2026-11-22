
/* ==========================================
   DTSC ALUMNI DIRECTORY
   Instant Search + Category Filter
========================================== */

// DEMO DATA
const members = [
  {
    name: "Rahim Uddin",
    id: "DTSC-2020-001",
    category: "STUDENT",
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
    category: "ADMIN - STUDENT",
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
    category: "TEACHER",
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
    category: "STUDENT",
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
    category: "ADMIN - TEACHER",
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
    category: "ADMIN - OTHER",
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
  },
  {
    name: "System Manager",
    id: "DTSC-SYS-007",
    category: "SYSTEM ADMIN",
    exam: "Administration",
    trade: "General",
    year: "2024",
    blood: "O+",
    status: "Active",
    division: "Dhaka",
    district: "Jamalpur",
    upazila: "Dewanganj",
    contact: "01700000007",
    photo: ""
  },
  {
    name: "Arif Hossain",
    id: "DTSC-A-008",
    category: "ADMIN",
    exam: "Diploma",
    trade: "Civil",
    year: "2015",
    blood: "B-",
    status: "Active",
    division: "Dhaka",
    district: "Jamalpur",
    upazila: "Melandaha",
    contact: "01700000008",
    photo: ""
  }
];


// ELEMENTS
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


// DYNAMIC PASSING YEAR
function generatePassingYears() {
  if (!passingYear) return;

  passingYear.innerHTML = '<option value="">All Passing Years</option>';

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1966; year--) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    passingYear.appendChild(option);
  }
}


// CATEGORY LABELS
function getCategoryLabels(category) {
  if (category === "ADMIN - STUDENT") {
    return ["ADMIN", "STUDENT"];
  }

  if (category === "ADMIN - TEACHER") {
    return ["ADMIN", "TEACHER"];
  }

  if (category === "ADMIN - OTHER") {
    return ["ADMIN", "OTHER"];
  }

  return [category];
}


// CATEGORY MATCHING
function matchesCategory(member, selected) {
  if (!selected) return true;

  return member.category === selected;
}


// CREATE BADGES
function createBadges(category, container) {
  container.replaceChildren();

  getCategoryLabels(category).forEach(label => {
    const badge = document.createElement("span");
    badge.className = "role-badge";
    badge.textContent = label;

    if (label === "ADMIN") badge.classList.add("admin");
    if (label === "TEACHER") badge.classList.add("teacher");
    if (label === "SYSTEM ADMIN") badge.classList.add("system");

    container.appendChild(badge);
  });
}


// IMAGE HANDLER
function setMemberImage(image, member) {
  if (member.photo) {
    image.src = member.photo;
    image.style.display = "block";
    image.alt = member.name;
  } else {
    image.removeAttribute("src");
    image.style.display = "none";
    image.alt = member.name;
  }
}


// CREATE MEMBER CARD
function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const left = document.createElement("div");
  left.className = "member-info";

  const photo = document.createElement("img");
  photo.className = "member-photo";
  setMemberImage(photo, member);

  const info = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = member.name;

  const id = document.createElement("p");
  id.textContent = member.id;

  info.append(name, id);
  left.append(photo, info);

  const right = document.createElement("div");
  right.className = "member-actions";

  const badges = document.createElement("div");
  badges.className = "member-badges";
  createBadges(member.category, badges);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "view-profile";
  button.textContent = "View Profile";

  button.addEventListener("click", () => openProfile(member));

  right.append(badges, button);
  card.append(left, right);

  return card;
}


// RENDER RESULTS
function renderMembers(list) {
  memberList.replaceChildren();

  resultsCount.textContent =
    `${list.length} Member${list.length !== 1 ? "s" : ""} Found`;

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No matching members found. Try another search.";

    memberList.appendChild(empty);
    return;
  }

  list.forEach(member => {
    memberList.appendChild(createMemberCard(member));
  });
}


// INSTANT SEARCH + FILTER
function searchMembers() {
  const query = searchInput.value.trim().toLowerCase();

  const selectedCategory = memberType.value;
  const selectedExam = lastExam.value;
  const selectedTrade = trade.value;
  const selectedYear = passingYear.value;
  const selectedBlood = bloodGroup.value;
  const selectedStatus = membershipStatus.value;

  const filtered = members.filter(member => {

    const searchContent = [
      member.name,
      member.id,
      member.category,
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

    return (
      searchContent.includes(query) &&
      matchesCategory(member, selectedCategory) &&
      (!selectedExam || member.exam === selectedExam) &&
      (!selectedTrade || member.trade === selectedTrade) &&
      (!selectedYear || member.year === selectedYear) &&
      (!selectedBlood || member.blood === selectedBlood) &&
      (!selectedStatus || member.status === selectedStatus)
    );
  });

  renderMembers(filtered);
}


// RESET
function resetFilters() {
  searchInput.value = "";
  memberType.value = "";
  lastExam.value = "";
  trade.value = "";
  passingYear.value = "";
  bloodGroup.value = "";
  membershipStatus.value = "";

  renderMembers(members);
}


// OPEN PROFILE
function openProfile(member) {
  profileName.textContent = member.name;
  profileId.textContent = member.id;

  setMemberImage(profilePhoto, member);
  createBadges(member.category, profileBadges);

  const details = [
    ["Membership Status", member.status],
    ["Member Category", member.category],
    ["Last Exam", member.exam],
    ["Technology / Trade", member.trade],
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


// CLOSE PROFILE
function hideProfile() {
  profileModal.classList.remove("active");
  profileModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideProfile);

profileModal.addEventListener("click", event => {
  if (event.target === profileModal) {
    hideProfile();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideProfile();
  }
});


// EVENT LISTENERS
searchInput.addEventListener("input", searchMembers);

searchBtn.addEventListener("click", searchMembers);
resetBtn.addEventListener("click", resetFilters);

// All filters work instantly
[
  memberType,
  lastExam,
  trade,
  passingYear,
  bloodGroup,
  membershipStatus
].forEach(filter => {
  filter.addEventListener("change", searchMembers);
});


// FOOTER YEAR
document.getElementById("footerYear").textContent =
  new Date().getFullYear();


// INITIALIZE
generatePassingYears();
renderMembers(members);
