
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("teacherRegistrationForm");

  if (!form) {
    console.error("Teacher Registration Form পাওয়া যায়নি!");
    return;
  }

  // =====================================
  // HELPER FUNCTIONS
  // =====================================

  function get(id) {
    return document.getElementById(id);
  }

  function show(id, visible) {
    const element = get(id);
    if (element) {
      element.style.display = visible ? "block" : "none";
    }
  }

  function getValue(id) {
    const element = get(id);
    return element ? element.value.trim() : "";
  }

  function selectedRadio(name) {
    const selected = form.querySelector(
      `input[name="${name}"]:checked`
    );
    return selected ? selected.value.toLowerCase() : "";
  }

  function setOptions(id, start, end, placeholder) {
    const select = get(id);
    if (!select) return;

    select.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder || "Select Year";
    select.appendChild(first);

    for (let year = start; year <= end; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }
  }

  // =====================================
  // YEAR DROPDOWNS
  // =====================================

  const currentYear = new Date().getFullYear();

  [
    "retiredJoiningYear",
    "retirementYear",
    "serviceFromYear",
    "serviceToYear"
  ].forEach(id => {
    setOptions(id, 1966, currentYear, "Select Year");
  });

  // =====================================
  // SERVICE STATUS CONDITIONAL LOGIC
  // =====================================

  function updateServiceStatus() {

    const status = selectedRadio("serviceStatus");

    show("workingFields", status.includes("working"));
    show("retiredFields", status.includes("retired"));

    show(
      "exTeacherFields",
      status.includes("transferred") ||
      status.includes("ex-teacher") ||
      status.includes("exteacher")
    );

    show(
      "designationDepartment",
      status.includes("working") ||
      status.includes("retired") ||
      status.includes("transferred") ||
      status.includes("ex-teacher") ||
      status.includes("exteacher")
    );
  }

  form.querySelectorAll(
    'input[name="serviceStatus"]'
  ).forEach(radio => {
    radio.addEventListener("change", updateServiceStatus);
  });

  updateServiceStatus();

  // =====================================
  // DESIGNATION: OTHERS
  // =====================================

  const designation = get("designation");

  function updateDesignation() {
    if (!designation) return;

    show(
      "otherDesignationGroup",
      designation.value.toLowerCase() === "others"
    );
  }

  if (designation) {
    designation.addEventListener("change", updateDesignation);
    updateDesignation();
  }

  // =====================================
  // DEPARTMENT: NON-TECH / OTHERS
  // =====================================

  const department = get("department");

  function updateDepartment() {
    if (!department) return;

    const value = department.value.toLowerCase();

    show(
      "nonTechSubjectGroup",
      value.includes("non-tech") ||
      value.includes("non tech")
    );

    show(
      "otherDepartmentGroup",
      value === "others"
    );
  }

  if (department) {
    department.addEventListener("change", updateDepartment);
    updateDepartment();
  }

  // =====================================
  // CURRENT STATUS CONDITIONAL LOGIC
  // =====================================

  const currentStatus = get("currentStatus");

  function updateCurrentStatus() {
    if (!currentStatus) return;

    const value = currentStatus.value.toLowerCase();

    show(
      "otherInstituteGroup",
      value.includes("government") ||
      value.includes("private")
    );

    show(
      "otherCurrentStatusGroup",
      value.includes("others")
    );
  }

  if (currentStatus) {
    currentStatus.addEventListener("change", updateCurrentStatus);
    updateCurrentStatus();
  }

  // =====================================
  // SAME ADDRESS CHECKBOX
  // =====================================

  const sameAddress = get("sameAddress");

  function copyAddress() {

    if (!sameAddress || !sameAddress.checked) return;

    const fields = [
      "Division",
      "District",
      "Upazila",
      "Union",
      "PostOffice",
      "PostCode",
      "Address"
    ];

    fields.forEach(field => {

      const present = get("present" + field);
      const permanent = get("permanent" + field);

      if (present && permanent) {
        permanent.value = present.value;

        // Trigger dependent dropdown updates
        permanent.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }

    });
  }

  if (sameAddress) {
    sameAddress.addEventListener("change", function () {

      const permanentSection =
        get("permanentAddressSection");

      if (permanentSection) {
        permanentSection.style.display =
          sameAddress.checked ? "none" : "block";
      }

      if (sameAddress.checked) {
        copyAddress();
      }
    });
  }

  [
    "presentDivision",
    "presentDistrict",
    "presentUpazila",
    "presentUnion",
    "presentPostOffice",
    "presentPostCode",
    "presentAddress"
  ].forEach(id => {

    const field = get(id);

    if (field) {
      field.addEventListener("change", function () {
        if (sameAddress && sameAddress.checked) {
          copyAddress();
        }
      });

      field.addEventListener("input", function () {
        if (sameAddress && sameAddress.checked) {
          copyAddress();
        }
      });
    }

  });

  // =====================================
  // PHOTO PREVIEW
  // =====================================

  const photoInput = get("photo");
  const photoPreview = get("photoPreview");

  if (photoInput && photoPreview) {

    photoInput.addEventListener("change", function () {

      const file = photoInput.files[0];

      if (!file) {
        photoPreview.style.display = "none";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("অনুগ্রহ করে একটি ছবি নির্বাচন করুন।");
        photoInput.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("ছবির সাইজ সর্বোচ্চ 5 MB হতে পারবে।");
        photoInput.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {
        photoPreview.src = event.target.result;
        photoPreview.style.display = "block";
      };

      reader.readAsDataURL(file);

    });
  }

  // =====================================
  // PASSWORD CONFIRMATION
  // =====================================

  const password = get("password");
  const confirmPassword = get("confirmPassword");

  function checkPassword() {

    if (!password || !confirmPassword) return true;

    if (confirmPassword.value &&
        password.value !== confirmPassword.value) {

      confirmPassword.setCustomValidity(
        "Password দুটি মিলছে না।"
      );

      return false;

    }

    confirmPassword.setCustomValidity("");
    return true;
  }

  if (password && confirmPassword) {

    password.addEventListener("input", checkPassword);
    confirmPassword.addEventListener("input", checkPassword);

  }

  // =====================================
  // FORM PREVIEW
  // =====================================

  const previewButton = get("previewBtn");
  const previewArea = get("previewArea");

  function createPreview() {

    const fields = [
      ["Full Name", "fullName"],
      ["Bangla Name", "banglaName"],
      ["Gender", "gender"],
      ["Blood Group", "bloodGroup"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["Present Address", "presentAddress"],
      ["Permanent Address", "permanentAddress"],
      ["Service Status", null],
      ["Designation", "designation"],
      ["Department", "department"],
      ["Message / Advice", "message"]
    ];

    let html = `
      <h2>Registration Preview</h2>
      <p>আপনার দেওয়া তথ্যগুলো যাচাই করুন।</p>
      <div class="preview-list">
    `;

    fields.forEach(([label, id]) => {

      let value = id
        ? getValue(id)
        : selectedRadio("serviceStatus");

      if (value) {
        html += `
          <p>
            <strong>${escapeHTML(label)}:</strong>
            ${escapeHTML(value)}
          </p>
        `;
      }

    });

    html += `</div>`;

    if (previewArea) {
      previewArea.innerHTML = html;
      previewArea.style.display = "block";
      previewArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  if (previewButton) {
    previewButton.addEventListener("click", function () {

      if (!form.reportValidity()) return;
      if (!checkPassword()) return;

      createPreview();

    });
  }

  // =====================================
  // GOOGLE SIGN-IN PLACEHOLDER
  // =====================================

  const googleButton = get("googleSignIn");

  if (googleButton) {

    googleButton.addEventListener("click", function () {

      alert(
        "Google Sign-In এখনো সংযুক্ত করা হয়নি। " +
        "পরবর্তী ধাপে Supabase Authentication যুক্ত করা হবে।"
      );

    });

  }

  // =====================================
  // FORM SUBMISSION
  // =====================================

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!form.reportValidity()) return;

    if (!checkPassword()) {
      alert("Password দুটি মিলছে না।");
      return;
    }

    if (sameAddress && sameAddress.checked) {
      copyAddress();
    }

    alert(
      "ফর্মের তথ্য যাচাই সম্পন্ন হয়েছে।\n\n" +
      "এখনো Database সংযুক্ত করা হয়নি। " +
      "Supabase সংযুক্ত করার পর Registration সম্পন্ন হবে।"
    );

  });

});
