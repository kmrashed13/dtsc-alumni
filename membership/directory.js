
/* ==========================================
   DTSC ALUMNI DIRECTORY
   Demo Member Data
   Search + Filter System
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. DEMO MEMBER DATA

     Later replace this array with database data.
  ========================================== */

  const members = [

    {
      name: "Md. Rahim Uddin",
      id: "DTSC-2020-001",
      role: "General Secretary",
      category: "Student",
      exam: "Diploma in Engineering",
      trade: "70 - Mechanical Technology",
      year: "2020",
      blood: "O+",
      status: "Verified",
      place: "Dewanganj, Jamalpur",
      contact: "01700000001",
      image: "https://i.pravatar.cc/100?img=12"
    },

    {
      name: "Nusrat Jahan",
      id: "DTSC-2018-014",
      role: "",
      category: "Teacher",
      exam: "Secondary School Certificate",
      trade: "67 - Electrical Technology",
      year: "2018",
      blood: "A+",
      status: "Verified",
      place: "Jamalpur Sadar",
      contact: "01700000002",
      image: "https://i.pravatar.cc/100?img=47"
    },

    {
      name: "Sabbir Ahmed",
      id: "DTSC-2022-027",
      role: "Executive Member",
      category: "Student",
      exam: "Diploma in Engineering",
      trade: "30 - Machine Tools Operation and Maintenance",
      year: "2022",
      blood: "B+",
      status: "Pending",
      place: "Islampur, Jamalpur",
      contact: "01700000003",
      image: "https://i.pravatar.cc/100?img=13"
    },

    {
      name: "Mst. Tania Akter",
      id: "DTSC-2021-035",
      role: "",
      category: "Student",
      exam: "Higher Secondary Certificate",
      trade: "General Electrical Works",
      year: "2021",
      blood: "AB+",
      status: "Verified",
      place: "Melandaha, Jamalpur",
      contact: "01700000004",
      image: "https://i.pravatar.cc/100?img=44"
    },

    {
      name: "Abdullah Al Mamun",
      id: "DTSC-2019-042",
      role: "President",
      category: "Teacher",
      exam: "Diploma in Engineering",
      trade: "27 - Electrical Works and Maintenance",
      year: "2019",
      blood: "O-",
      status: "Verified",
      place: "Sarishabari, Jamalpur",
      contact: "01700000005",
      image: "https://i.pravatar.cc/100?img=14"
    },

    {
      name: "Mehedi Hasan",
      id: "DTSC-2023-052",
      role: "",
      category: "Student",
      exam: "Junior School Certificate",
      trade: "Refrigeration And Air Conditions",
      year: "2023",
      blood: "B-",
      status: "Pending",
      place: "Dewanganj, Jamalpur",
      contact: "01700000006",
      image: "https://i.pravatar.cc/100?img=15"
    }

  ];


  /* ==========================================
     2. HTML ELEMENTS
  ========================================== */

  const searchInput = document.getElementById("alumniSearch");

  const searchBtn = document.getElementById("searchBtn");

  const categoryFilter = document.getElementById("categoryFilter");

  const examFilter = document.getElementById("examFilter");

  const tradeFilter = document.getElementById("tradeFilter");

  const yearFilter = document.getElementById("yearFilter");

  const bloodFilter = document.getElementById("bloodFilter");

  const statusFilter = document.getElementById("statusFilter");

  const resetBtn = document.getElementById("resetBtn");

  const memberList = document.getElementById("memberList");

  const resultCount = document.getElementById("resultCount");


  /* ==========================================
     3. SAFE HTML HELPER
  ========================================== */

  function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);

  }


  /* ==========================================
     4. RENDER MEMBERS
  ========================================== */

  function renderMembers() {

    const searchText = searchInput.value.trim().toLowerCase();

    const selectedCategory = categoryFilter.value;

    const selectedExam = examFilter.value;

    const selectedTrade = tradeFilter.value;

    const selectedYear = yearFilter.value;

    const selectedBlood = bloodFilter.value;

    const selectedStatus = statusFilter.value;


    /* FILTER MEMBERS */

    const filteredMembers = members.filter(member => {

      const searchableText = [

        member.name,
        member.id,
        member.role,
        member.category,
        member.exam,
        member.trade,
        member.year,
        member.blood,
        member.status,
        member.place,
        member.contact

      ].join(" ").toLowerCase();


      const matchesSearch =
        !searchText || searchableText.includes(searchText);

      const matchesCategory =
        !selectedCategory || member.category === selectedCategory;

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
        matchesCategory &&
        matchesExam &&
        matchesTrade &&
        matchesYear &&
        matchesBlood &&
        matchesStatus
      );

    });


    /* UPDATE COUNT */

    resultCount.textContent = filteredMembers.length;


    /* EMPTY RESULT */

    if (filteredMembers.length === 0) {

      memberList.innerHTML = `
        <div class="no-results">
          No Alumni Found.<br>
          Try changing your search or filters.
        </div>
      `;

      return;

    }


    /* DISPLAY MEMBER CARDS */

    memberList.innerHTML = filteredMembers.map(member => {

      const name = escapeHTML(member.name);
      const id = escapeHTML(member.id);
      const role = escapeHTML(member.role);
      const category = escapeHTML(member.category);
      const image = escapeHTML(member.image);

      const profileURL =
        "profile.html?id=" + encodeURIComponent(member.id);


      return `

        <article class="member-card">

          <!-- PROFILE IMAGE -->

          <img
            class="member-avatar"
            src="${image}"
            alt="${name}"
            loading="lazy"
            onerror="this.style.display='none'"
          >


          <!-- MEMBER DETAILS -->

          <div class="member-details">

            <div class="member-name">
              ${name}
            </div>

            <div class="member-id">
              ID: ${id}
            </div>

            ${
              role
                ? `<div class="member-role">${role}</div>`
                : ""
            }

          </div>


          <!-- CATEGORY AND PROFILE LINK -->

          <div class="member-right">

            <span class="member-category ${
              member.category === "Teacher" ? "teacher" : ""
            }">
              ${category}
            </span>

            <a
              href="${profileURL}"
              class="view-profile"
            >
              View Profile ↗
            </a>

          </div>

        </article>

      `;

    }).join("");

  }


  /* ==========================================
     5. SEARCH BUTTON
  ========================================== */

  searchBtn.addEventListener("click", renderMembers);


  /* ==========================================
     6. LIVE SEARCH
  ========================================== */

  searchInput.addEventListener("input", renderMembers);


  /* ==========================================
     7. FILTER EVENTS
  ========================================== */

  const filters = [

    categoryFilter,
    examFilter,
    tradeFilter,
    yearFilter,
    bloodFilter,
    statusFilter

  ];

  filters.forEach(filter => {

    filter.addEventListener("change", renderMembers);

  });


  /* ==========================================
     8. RESET ALL FILTERS
  ========================================== */

  resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    filters.forEach(filter => {

      filter.value = "";

    });

    renderMembers();

  });


  /* ==========================================
     9. INITIAL LOAD
  ========================================== */

  renderMembers();

});
