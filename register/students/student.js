
document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const form = $("studentRegistrationForm");

  if (!form) return;

  const currentYear = new Date().getFullYear();

  // =====================================
  // 1. DROPDOWN HELPERS
  // =====================================

  function fillYears(id, start, end = currentYear, descending = true) {
    const select = $(id);
    if (!select) return;

    select.innerHTML = '<option value="">Select Year</option>';

    const years = [];

    for (let y = start; y <= end; y++) years.push(y);

    if (descending) years.reverse();

    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    });
  }

  function fillSessions(id, start, end = currentYear + 1) {
    const select = $(id);
    if (!select) return;

    select.innerHTML = '<option value="">Select Session</option>';

    for (let year = start; year <= end; year++) {
      const option = document.createElement("option");
      option.value = `${year}-${String(year + 1).slice(-2)}`;
      option.textContent = option.value;
      select.appendChild(option);
    }
  }

  // Birth date
  const day = $("birthDay");

  if (day) {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      day.appendChild(option);
    }
  }

  fillYears("birthYear", 1940);
  fillYears("jscPassingYear", 1966);
  fillYears("sscPassingYear", 1966);
  fillYears("hscPassingYear", 1966);

  fillSessions("jscSession", 1966);
  fillSessions("sscSession", 1966);
  fillSessions("hscSession", 1966);


  // =====================================
  // 2. PHOTO PREVIEW
  // =====================================

  $("studentPhoto")?.addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = e => {
      $("photoPreview").src = e.target.result;
    };

    reader.readAsDataURL(file);
  });


  // =====================================
  // 3. CONDITIONAL SECTION HELPER
  // =====================================

  function toggleSection(id, show) {
    const section = $(id);
    if (!section) return;

    section.classList.toggle("active", show);

    section.querySelectorAll("input, select, textarea").forEach(field => {
      field.disabled = !show;
      field.required = show && field.dataset.required === "true";

      if (!show) {
        field.value = "";
      }
    });
  }

  function configureRequired(sectionId, fieldIds) {
    const section = $(sectionId);
    if (!section) return;

    fieldIds.forEach(id => {
      const field = $(id);
      if (field) field.dataset.required = "true";
    });
  }


  // =====================================
  // 4. ACADEMIC CONDITIONAL LOGIC
  // =====================================

  const academicOptions = [
    {
      checkbox: "examJSC",
      section: "jscFields",
      fields: [
        "jscRoll",
        "jscReg",
        "jscGPA",
        "jscPassingYear",
        "jscSession"
      ]
    },
    {
      checkbox: "examSSC",
      section: "sscFields",
      fields: [
        "sscTrade",
        "sscSession",
        "sscRoll",
        "sscReg",
        "sscGPA",
        "sscPassingYear"
      ]
    },
    {
      checkbox: "examHSC",
      section: "hscFields",
      fields: [
        "hscTrade",
        "hscSession",
        "hscRoll",
        "hscReg",
        "hscGPA",
        "hscPassingYear"
      ]
    },
    {
      checkbox: "examDiploma",
      section: "diplomaFields",
      fields: [
        "diplomaTechnology",
        "diplomaSession",
        "diplomaRoll",
        "diplomaReg",
        "diplomaCGPA",
        "diplomaPassingYear"
      ]
    }
  ];

  academicOptions.forEach(item => {
    configureRequired(item.section, item.fields);

    $(item.checkbox)?.addEventListener("change", event => {
      toggleSection(item.section, event.target.checked);
    });

    toggleSection(item.section, $(item.checkbox)?.checked || false);
  });


  // =====================================
  // 5. CURRENT STATUS CONDITIONAL LOGIC
  // =====================================

  const statusOptions = [
    {
      checkbox: "statusHigher",
      section: "higherStudiesFields",
      fields: ["higherInstitute", "higherDepartment"]
    },
    {
      checkbox: "statusJob",
      section: "jobFields",
      fields: [
        "jobType",
        "jobOrganization",
        "jobDesignation",
        "jobDepartment",
        "jobLocation"
      ]
    },
    {
      checkbox: "statusBusiness",
      section: "businessFields",
      fields: ["businessName", "businessLocation"]
    },
    {
      checkbox: "statusOthers",
      section: "otherStatusFields",
      fields: ["otherStatus"]
    }
  ];

  statusOptions.forEach(item => {
    configureRequired(item.section, item.fields);

    $(item.checkbox)?.addEventListener("change", event => {
      toggleSection(item.section, event.target.checked);
    });

    toggleSection(item.section, $(item.checkbox)?.checked || false);
  });


  // =====================================
  // 6. PRESENT / PERMANENT ADDRESS
  // =====================================

  const addressPairs = [
    ["presentDivision", "permanentDivision"],
    ["presentDistrict", "permanentDistrict"],
    ["presentAreaType", "permanentAreaType"],
    ["presentArea", "permanentArea"],
    ["presentUnion", "permanentUnion"],
    ["presentPostOffice", "permanentPostOffice"],
    ["presentPostCode", "permanentPostCode"],
    ["presentAddress", "permanentAddress"]
  ];

  function copyAddress() {
    addressPairs.forEach(([from, to]) => {
      const source = $(from);
      const target = $(to);

      if (!source || !target) return;

      if (target.tagName === "SELECT") {
        const matchingOption = [...target.options].find(
          option => option.value === source.value
        );

        target.value = matchingOption ? source.value : "";
      } else {
        target.value = source.value;
      }

      target.dispatchEvent(new Event("change", { bubbles: true }));
    });

    $("permanentUnionGroup").hidden =
      $("presentUnionGroup").hidden;
  }

  function updateSameAddress() {
    const checked = $("sameAddress")?.checked;

    $("permanentAddressFields").style.display =
      checked ? "none" : "grid";

    addressPairs.forEach(([from, to]) => {
      const target = $(to);
      if (!target) return;

      target.required = !checked;
    });

    $("permanentUnionGroup").querySelector("input").required = !checked;

    if (checked) copyAddress();
  }

  $("sameAddress")?.addEventListener("change", updateSameAddress);

  addressPairs.forEach(([from]) => {
    $(from)?.addEventListener("change", () => {
      if ($("sameAddress")?.checked) copyAddress();
    });

    $(from)?.addEventListener("input", () => {
      if ($("sameAddress")?.checked) copyAddress();
    });
  });

  updateSameAddress();


  // =====================================
  // 7. UNION / MUNICIPALITY FIELD
  // =====================================

  function setupUnion(areaId, groupId, inputId) {
    const area = $(areaId);
    const group = $(groupId);
    const input = $(inputId);

    if (!area || !group || !input) return;

    function update() {
      const show = area.value === "upazila";

      group.hidden = !show;
      input.required = show;
    }

    area.addEventListener("change", update);
    update();
  }

  setupUnion("presentAreaType", "presentUnionGroup", "presentUnion");
  setupUnion("permanentAreaType", "permanentUnionGroup", "permanentUnion");


  // =====================================
  // 8. PASSWORD CONFIRMATION
  // =====================================

  function checkPassword() {
    const password = $("password");
    const confirm = $("confirmPassword");

    if (!password || !confirm) return;

    confirm.setCustomValidity(
      confirm.value && password.value !== confirm.value
        ? "Passwords do not match."
        : ""
    );
  }

  $("password")?.addEventListener("input", checkPassword);
  $("confirmPassword")?.addEventListener("input", checkPassword);


  // =====================================
  // 9. HTML ESCAPE
  // =====================================

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }


  // =====================================
  // 10. FORM PREVIEW
  // =====================================

  $("previewBtn")?.addEventListener("click", () => {
    const preview = $("previewArea");

    const fields = [
      ["Name", "fullName"],
      ["Father's Name", "fatherName"],
      ["Mother's Name", "motherName"],
      ["Blood Group", "bloodGroup"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["Present Address", "presentAddress"],
      ["Permanent Address", "permanentAddress"],
      ["Suggestions", "suggestions"]
    ];

    let html = "<h3>Registration Preview</h3>";

    fields.forEach(([label, id]) => {
      html += `
        <p>
          <strong>${escapeHTML(label)}:</strong>
          ${escapeHTML($(id)?.value || "Not provided")}
        </p>
      `;
    });

    const selectedExams = academicOptions
      .filter(item => $(item.checkbox)?.checked)
      .map(item => item.checkbox.replace("exam", ""));

    html += `
      <p>
        <strong>Selected Examinations:</strong>
        ${escapeHTML(selectedExams.join(", ") || "None")}
      </p>
    `;

    const selectedStatuses = statusOptions
      .filter(item => $(item.checkbox)?.checked)
      .map(item => $(item.checkbox).value);

    html += `
      <p>
        <strong>Current Status:</strong>
        ${escapeHTML(selectedStatuses.join(", ") || "None")}
      </p>
    `;

    preview.innerHTML = html;
    preview.hidden = false;
    preview.style.display = "block";
    preview.scrollIntoView({ behavior: "smooth" });
  });


  // =====================================
  // 11. GOOGLE SIGN-IN PLACEHOLDER
  // =====================================

  $("googleSignIn")?.addEventListener("click", () => {
    alert(
      "Google Sign-In চালু করতে Supabase Authentication সংযুক্ত করতে হবে।"
    );
  });


  // =====================================
  // 12. FORM SUBMISSION
  // =====================================

  form.addEventListener("submit", event => {
    event.preventDefault();

    checkPassword();

    if (!form.reportValidity()) return;

    const hasExam = academicOptions.some(
      item => $(item.checkbox)?.checked
    );

    if (!hasExam) {
      alert("Please select at least one examination.");
      $("examJSC").focus();
      return;
    }

    if (!statusOptions.some(item => $(item.checkbox)?.checked)) {
      alert("Please select your current status.");
      $("statusHigher").focus();
      return;
    }

    if (!$("declaration").checked) {
      alert("Please accept the declaration.");
      return;
    }

    alert(
      "Form validation successful! Supabase Database is not connected yet. Your information has not been saved."
    );
  });


  // =====================================
  // 13. RESET FORM
  // =====================================

  form.addEventListener("reset", () => {
    setTimeout(() => {
      academicOptions.forEach(item => {
        toggleSection(item.section, false);
      });

      statusOptions.forEach(item => {
        toggleSection(item.section, false);
      });

      updateSameAddress();

      $("photoPreview").removeAttribute("src");

      $("previewArea").innerHTML = "";
      $("previewArea").hidden = true;
      $("previewArea").style.display = "none";
    }, 0);
  });

});
