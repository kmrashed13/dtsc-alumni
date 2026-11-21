
"use strict";

/* =====================================
   DTSC ALUMNI - STUDENT REGISTRATION
===================================== */

const $ = (id) => document.getElementById(id);

const currentYear = new Date().getFullYear();

/* ---------- COMMON HELPERS ---------- */

function addOption(select, value, text = value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.appendChild(option);
}

function fillYears(select, startYear, endYear) {
  select.innerHTML = '<option value="">Select Year</option>';

  for (let year = startYear; year <= endYear; year++) {
    addOption(select, String(year));
  }
}

function fillSessions(select, startYear, endYear) {
  select.innerHTML = '<option value="">Select Session</option>';

  for (let year = startYear; year <= endYear; year++) {
    addOption(select, `${year}-${String(year + 1).slice(-2)}`);
  }
}

function setSection(section, visible) {
  if (!section) return;

  section.hidden = !visible;

  section.querySelectorAll("input, select, textarea").forEach((field) => {
    field.disabled = !visible;
    field.required = visible && field.dataset.required === "true";

    if (!visible) {
      field.value = "";
      if (field.type === "checkbox") field.checked = false;
    }
  });
}

/* ---------- INITIAL DROPDOWNS ---------- */

function initializeDateDropdowns() {
  for (let day = 1; day <= 31; day++) {
    addOption($("birthDay"), String(day), String(day));
  }

  fillYears($("birthYear"), 1940, currentYear);

  ["jscPassingYear", "sscPassingYear", "hscPassingYear"].forEach((id) => {
    fillYears($(id), 1966, currentYear);
  });

  ["jscSession", "sscSession", "hscSession"].forEach((id) => {
    fillSessions($(id), 1966, currentYear + 1);
  });
}

/* ---------- CONDITIONAL FIELD SETUP ---------- */

function setupConditionalFields() {
  const academicConditions = [
    ["examJSC", "jscFields"],
    ["examSSC", "sscFields"],
    ["examHSC", "hscFields"],
    ["examDiploma", "diplomaFields"]
  ];

  academicConditions.forEach(([checkboxId, sectionId]) => {
    const checkbox = $(checkboxId);
    const section = $(sectionId);

    section.querySelectorAll("input, select, textarea").forEach((field) => {
      field.dataset.required = "true";
    });

    const update = () => setSection(section, checkbox.checked);

    checkbox.addEventListener("change", update);
    update();
  });

  const statusConditions = [
    ["statusHigher", "higherStudiesFields"],
    ["statusJob", "jobFields"],
    ["statusBusiness", "businessFields"],
    ["statusOthers", "otherStatusFields"]
  ];

  statusConditions.forEach(([checkboxId, sectionId]) => {
    const checkbox = $(checkboxId);
    const section = $(sectionId);

    section.querySelectorAll("input, select, textarea").forEach((field) => {
      field.dataset.required = "true";
    });

    const update = () => setSection(section, checkbox.checked);

    checkbox.addEventListener("change", update);
    update();
  });
}

/* ---------- JOB TYPE ---------- */

function setupJobType() {
  $("jobType").addEventListener("change", function () {
    const label = document.querySelector('label[for="jobOrganization"]');

    if (this.value === "Government") {
      label.textContent = "Organization Name *";
    } else {
      label.textContent = "Organization / Company *";
    }
  });
}

/* ---------- BANGLADESH ADDRESS DATA ---------- */

let geoData = [];

const cityCorporations = {
  dhaka: [
    "Dhaka North City Corporation",
    "Dhaka South City Corporation"
  ],
  chattogram: ["Chattogram City Corporation"],
  chittagong: ["Chattogram City Corporation"],
  khulna: ["Khulna City Corporation"],
  rajshahi: ["Rajshahi City Corporation"],
  barishal: ["Barishal City Corporation"],
  barisal: ["Barishal City Corporation"],
  sylhet: ["Sylhet City Corporation"],
  rangpur: ["Rangpur City Corporation"],
  gazipur: ["Gazipur City Corporation"],
  narayanganj: ["Narayanganj City Corporation"],
  cumilla: ["Cumilla City Corporation"],
  comilla: ["Cumilla City Corporation"],
  mymensingh: ["Mymensingh City Corporation"]
};

function getName(item) {
  return item.name || item.bn_name || "";
}

function findDistricts(division) {
  return division.districts || [];
}

function resetSelect(select, placeholder) {
  select.innerHTML = "";
  addOption(select, "", placeholder);
}

function setupAddress(prefix) {
  const divisionSelect = $(`${prefix}Division`);
  const districtSelect = $(`${prefix}District`);
  const areaTypeSelect = $(`${prefix}AreaType`);
  const areaSelect = $(`${prefix}Area`);
  const unionGroup = $(`${prefix}UnionGroup`);

  function populateDivisions() {
    resetSelect(divisionSelect, "Select Division");

    geoData.forEach((division) => {
      addOption(divisionSelect, getName(division));
    });
  }

  function populateDistricts() {
    resetSelect(districtSelect, "Select District");
    resetSelect(areaSelect, "Select Area");

    const division = geoData.find(
      (item) => getName(item) === divisionSelect.value
    );

    if (!division) return;

    findDistricts(division).forEach((district) => {
      addOption(districtSelect, getName(district));
    });
  }

  function populateAreas() {
    resetSelect(areaSelect, "Select Area");
    unionGroup.hidden = true;

    const division = geoData.find(
      (item) => getName(item) === divisionSelect.value
    );

    if (!division) return;

    const district = findDistricts(division).find(
      (item) => getName(item) === districtSelect.value
    );

    if (!district) return;

    if (areaTypeSelect.value === "upazila") {
      (district.upazilas || []).forEach((upazila) => {
        addOption(areaSelect, getName(upazila));
      });

      unionGroup.hidden = false;
    }

    if (areaTypeSelect.value === "city") {
      const districtName = getName(district).toLowerCase();
      const cities = cityCorporations[districtName] || [];

      cities.forEach((city) => addOption(areaSelect, city));
    }
  }

  divisionSelect.addEventListener("change", populateDistricts);
  districtSelect.addEventListener("change", populateAreas);
  areaTypeSelect.addEventListener("change", populateAreas);

  populateDivisions();
  resetSelect(districtSelect, "Select District");
  resetSelect(areaSelect, "Select Area");
}

async function loadAddressData() {
  try {
    const response = await fetch(
      "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json"
    );

    if (!response.ok) throw new Error("Address data could not be loaded.");

    const data = await response.json();

    geoData = Array.isArray(data)
      ? data
      : data.divisions || [];

    if (!geoData.length) {
      throw new Error("Address data is empty.");
    }

    setupAddress("present");
    setupAddress("permanent");

  } catch (error) {
    console.error(error);

    const message = document.createElement("p");
    message.className = "address-data-message";
    message.textContent =
      "Address dropdown could not load. Please check your internet connection and refresh the page.";

    $("studentRegistrationForm").prepend(message);
  }
}

/* ---------- SAME ADDRESS ---------- */

function setupSameAddress() {
  const checkbox = $("sameAddress");
  const permanentFields = $("permanentAddressFields");

  const permanentIds = [
    "Division",
    "District",
    "AreaType",
    "Area",
    "Union",
    "PostOffice",
    "PostCode",
    "Address"
  ];

  function updatePermanentAddress() {
    const same = checkbox.checked;

    permanentFields.hidden = same;

    permanentFields.querySelectorAll("input, select, textarea").forEach((field) => {
      field.disabled = same;
      field.required = !same && field.dataset.required !== "false";
    });

    if (same) {
      permanentIds.forEach((suffix) => {
        const source = $(`present${suffix}`);
        const target = $(`permanent${suffix}`);

        if (source && target) {
          target.value = source.value;
        }
      });
    }
  }

  checkbox.addEventListener("change", updatePermanentAddress);

  [
    "presentDivision",
    "presentDistrict",
    "presentAreaType",
    "presentArea",
    "presentUnion",
    "presentPostOffice",
    "presentPostCode",
    "presentAddress"
  ].forEach((id) => {
    $(id).addEventListener("change", () => {
      if (checkbox.checked) updatePermanentAddress();
    });

    $(id).addEventListener("input", () => {
      if (checkbox.checked) updatePermanentAddress();
    });
  });

  updatePermanentAddress();
}

/* ---------- PHOTO PREVIEW ---------- */

function setupPhotoPreview() {
  $("studentPhoto").addEventListener("change", function () {
    const file = this.files[0];
    const preview = $("photoPreview");

    if (!file) {
      preview.removeAttribute("src");
      preview.hidden = true;
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      this.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Photo size must be less than 5 MB.");
      this.value = "";
      return;
    }

    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
  });
}

/* ---------- GOOGLE SIGN-IN ---------- */
/* Supabase Google authentication will be connected later. */

function setupGoogleSignIn() {
  $("googleSignIn").addEventListener("click", () => {
    alert(
      "Google Sign-in will be activated after Supabase Authentication is connected."
    );
  });
}

/* ---------- PASSWORD VALIDATION ---------- */

function validatePassword() {
  const password = $("password").value;
  const confirmPassword = $("confirmPassword").value;

  if (!password || !confirmPassword) {
    alert("Please enter and confirm your password.");
    return false;
  }

  if (password.length < 8) {
    alert("Password must contain at least 8 characters.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return false;
  }

  return true;
}

/* ---------- PREVIEW ---------- */

function getSelectedCheckboxes(ids) {
  return ids
    .filter((id) => $(id).checked)
    .map((id) => {
      const label = document.querySelector(`label:has(#${id})`);
      return label ? label.textContent.trim() : id;
    });
}

function getValue(id) {
  const element = $(id);
  if (!element || element.disabled) return "";
  return element.value.trim();
}

function previewApplication() {
  const previewArea = $("previewArea");
  const content = $("previewContent");

  const fields = [
    ["Name", "fullName"],
    ["Father Name", "fatherName"],
    ["Mother Name", "motherName"],
    ["Blood Group", "bloodGroup"],
    ["Contact Number", "mobile"],
    ["Email", "email"],
    ["Present Division", "presentDivision"],
    ["Present District", "presentDistrict"],
    ["Present Area", "presentArea"],
    ["Present Post Office", "presentPostOffice"],
    ["Present Address", "presentAddress"]
  ];

  let html = "";

  fields.forEach(([label, id]) => {
    html += `<p><strong>${label}:</strong> ${escapeHTML(getValue(id))}</p>`;
  });

  const exams = getSelectedCheckboxes([
    "examJSC",
    "examSSC",
    "examHSC",
    "examDiploma"
  ]);

  const statuses = getSelectedCheckboxes([
    "statusHigher",
    "statusJob",
    "statusBusiness",
    "statusOthers"
  ]);

  html += `<h3>Selected Examinations</h3>`;
  html += `<p>${escapeHTML(exams.join(", ") || "Not selected")}</p>`;

  html += `<h3>Current Status</h3>`;
  html += `<p>${escapeHTML(statuses.join(", ") || "Not selected")}</p>`;

  content.innerHTML = html;
  previewArea.hidden = false;

  previewArea.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* ---------- REGISTER ---------- */

function setupRegistration() {
  $("previewBtn").addEventListener("click", previewApplication);

  $("studentRegistrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.reportValidity()) return;

    const selectedExams = [
      "examJSC",
      "examSSC",
      "examHSC",
      "examDiploma"
    ].some((id) => $(id).checked);

    if (!selectedExams) {
      alert("Please select at least one examination.");
      return;
    }

    const selectedStatus = [
      "statusHigher",
      "statusJob",
      "statusBusiness",
      "statusOthers"
    ].some((id) => $(id).checked);

    if (!selectedStatus) {
      alert("Please select at least one current status.");
      return;
    }

    if (!validatePassword()) return;

    if (!$("declaration").checked) {
      alert("Please accept the declaration.");
      return;
    }

    alert(
      "Your form passed the frontend validation. Supabase registration and database saving will be connected in the next step."
    );
  });
}

/* ---------- RESET ---------- */

function setupReset() {
  $("studentRegistrationForm").addEventListener("reset", () => {
    setTimeout(() => {
      $("previewArea").hidden = true;
      $("previewContent").innerHTML = "";

      $("photoPreview").removeAttribute("src");
      $("photoPreview").hidden = true;

      setupConditionalReset();
    }, 0);
  });
}

function setupConditionalReset() {
  [
    ["examJSC", "jscFields"],
    ["examSSC", "sscFields"],
    ["examHSC", "hscFields"],
    ["examDiploma", "diplomaFields"],
    ["statusHigher", "higherStudiesFields"],
    ["statusJob", "jobFields"],
    ["statusBusiness", "businessFields"],
    ["statusOthers", "otherStatusFields"]
  ].forEach(([checkboxId, sectionId]) => {
    setSection($(sectionId), $(checkboxId).checked);
  });

  $("permanentAddressFields").hidden = $("sameAddress").checked;
}

/* ---------- INITIALIZE ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initializeDateDropdowns();
  setupConditionalFields();
  setupJobType();
  setupSameAddress();
  setupPhotoPreview();
  setupGoogleSignIn();
  setupRegistration();
  setupReset();

  loadAddressData();
});
