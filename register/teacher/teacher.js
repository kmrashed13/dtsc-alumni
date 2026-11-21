document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("teacherRegistrationForm");

  if (!form) return;

  const $ = (id) => document.getElementById(id);

  // ==============================
  // 1. PHOTO PREVIEW
  // ==============================

  const photoInput = $("teacherPhoto");
  const photoPreview = $("photoPreview");

  photoInput?.addEventListener("change", () => {
    const file = photoInput.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("শুধুমাত্র ছবি নির্বাচন করুন।");
      photoInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      photoPreview.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });


  // ==============================
  // 2. YEAR DROPDOWNS
  // ==============================

  const currentYear = new Date().getFullYear();

  function populateYears(id, startYear = 1966) {
    const select = $(id);
    if (!select) return;

    select.innerHTML = '<option value="">Select Year</option>';

    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }
  }

  [
    "retiredJoiningYear",
    "retirementYear",
    "serviceFromYear",
    "serviceToYear"
  ].forEach(id => populateYears(id));


  // ==============================
  // 3. CONDITIONAL FIELD HELPERS
  // ==============================

  function showGroup(id, show) {
    const element = $(id);
    if (!element) return;

    element.style.display = show ? "block" : "none";

    element.querySelectorAll("input, select, textarea").forEach(field => {
      field.required = show && field.dataset.required === "true";
      if (!show) {
        field.value = "";
      }
    });
  }

  function setRequired(id, required) {
    const element = $(id);
    if (element) element.required = required;
  }

  function toggleSection(id, show) {
    const section = $(id);
    if (!section) return;

    section.classList.toggle("active", show);

    section.querySelectorAll("input, select, textarea").forEach(field => {
      field.disabled = !show;

      if (!show) {
        field.required = false;
        field.value = "";
      }
    });
  }


  // ==============================
  // 4. DESIGNATION: OTHERS
  // ==============================

  function setupDesignation(selectId, groupId, inputId) {
    const select = $(selectId);
    if (!select) return;

    const update = () => {
      const isOther = select.value === "Others";

      showGroup(groupId, isOther);
      setRequired(inputId, isOther);
    };

    select.addEventListener("change", update);
    update();
  }

  setupDesignation(
    "workingDesignation",
    "workingOtherDesignationGroup",
    "workingOtherDesignation"
  );

  setupDesignation(
    "retiredDesignation",
    "retiredOtherDesignationGroup",
    "retiredOtherDesignation"
  );

  setupDesignation(
    "exDesignation",
    "exOtherDesignationGroup",
    "exOtherDesignation"
  );


  // ==============================
  // 5. DEPARTMENT: NON-TECH / OTHERS
  // ==============================

  function setupDepartment(selectId, nonTechGroupId, subjectId, otherGroupId, otherInputId) {
    const select = $(selectId);
    if (!select) return;

    const update = () => {
      const value = select.value;

      const isNonTech = value === "Non-Tech/General";
      const isOther = value === "Others";

      showGroup(nonTechGroupId, isNonTech);
      showGroup(otherGroupId, isOther);

      setRequired(subjectId, isNonTech);
      setRequired(otherInputId, isOther);
    };

    select.addEventListener("change", update);
    update();
  }

  setupDepartment(
    "workingDepartment",
    "workingNonTechGroup",
    "workingNonTechSubject",
    "workingOtherDepartmentGroup",
    "workingOtherDepartment"
  );

  setupDepartment(
    "retiredDepartment",
    "retiredNonTechGroup",
    "retiredNonTechSubject",
    "retiredOtherDepartmentGroup",
    "retiredOtherDepartment"
  );

  setupDepartment(
    "exDepartment",
    "exNonTechGroup",
    "exNonTechSubject",
    "exOtherDepartmentGroup",
    "exOtherDepartment"
  );


  // ==============================
  // 6. SERVICE STATUS
  // ==============================

  const statusRadios = document.querySelectorAll(
    'input[name="serviceStatus"]'
  );

  function updateServiceStatus() {
    const selected = document.querySelector(
      'input[name="serviceStatus"]:checked'
    )?.value;

    toggleSection("workingFields", selected === "working");
    toggleSection("retiredFields", selected === "retired");
    toggleSection("exTeacherFields", selected === "transferred");

    if (selected === "working") {
      ["workingDesignation", "workingDepartment", "joiningDate"].forEach(
        id => setRequired(id, true)
      );
    }

    if (selected === "retired") {
      [
        "retiredDesignation",
        "retiredDepartment",
        "retiredJoiningYear",
        "retirementYear"
      ].forEach(id => setRequired(id, true));
    }

    if (selected === "transferred") {
      [
        "exDesignation",
        "exDepartment",
        "serviceFromYear",
        "serviceToYear",
        "currentStatus"
      ].forEach(id => setRequired(id, true));
    }
  }

  statusRadios.forEach(radio => {
    radio.addEventListener("change", updateServiceStatus);
  });

  updateServiceStatus();


  // ==============================
  // 7. CURRENT STATUS
  // ==============================

  const currentStatus = $("currentStatus");

  function updateCurrentStatus() {
    const value = currentStatus?.value;

    const isInstitute = value === "Government" || value === "Private";
    const isOther = value === "Others";

    showGroup("currentInstituteGroup", isInstitute);
    showGroup("currentDesignationGroup", isInstitute);
    showGroup("otherCurrentStatusGroup", isOther);

    setRequired("currentInstitute", isInstitute);
    setRequired("currentDesignation", isInstitute);
    setRequired("otherCurrentStatus", isOther);
  }

  currentStatus?.addEventListener("change", updateCurrentStatus);
  updateCurrentStatus();


  // ==============================
  // 8. PRESENT & PERMANENT ADDRESS
  // ==============================

  const sameAddress = $("sameAddress");
  const permanentSection = $("permanentAddressSection");

  const addressFields = [
    "Division",
    "District",
    "AreaType",
    "Upazila",
    "Union",
    "PostOffice",
    "PostCode",
    "Address"
  ];

  function copyPresentAddress() {
    addressFields.forEach(field => {
      const present = $("present" + field);
      const permanent = $("permanent" + field);

      if (!present || !permanent) return;

      permanent.value = present.value;
    });
  }

  function updateSameAddress() {
    const checked = sameAddress?.checked;

    if (permanentSection) {
      permanentSection.querySelectorAll(".form-grid").forEach(grid => {
        grid.style.display = checked ? "none" : "grid";
      });
    }

    if (checked) {
      copyPresentAddress();
    }
  }

  sameAddress?.addEventListener("change", updateSameAddress);

  document.querySelectorAll(
    '[id^="present"]'
  ).forEach(field => {
    field.addEventListener("change", () => {
      if (sameAddress?.checked) copyPresentAddress();
    });

    field.addEventListener("input", () => {
      if (sameAddress?.checked) copyPresentAddress();
    });
  });

  updateSameAddress();


  // ==============================
  // 9. PASSWORD CONFIRMATION
  // ==============================

  const password = $("password");
  const confirmPassword = $("confirmPassword");

  function checkPassword() {
    if (!password || !confirmPassword) return;

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
      confirmPassword.setCustomValidity("");
    }
  }

  password?.addEventListener("input", checkPassword);
  confirmPassword?.addEventListener("input", checkPassword);


  // ==============================
  // 10. PREVIEW
  // ==============================

  const previewBtn = $("previewBtn");
  const previewArea = $("previewArea");

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  previewBtn?.addEventListener("click", () => {
    const fields = [
      ["Full Name", "fullName"],
      ["Bangla Name", "banglaName"],
      ["Gender", "gender"],
      ["Blood Group", "bloodGroup"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["Present Address", "presentAddress"],
      ["Post Office", "presentPostOffice"],
      ["Post Code", "presentPostCode"],
      ["Service Status", null]
    ];

    let html = "<h3>Registration Preview</h3>";

    fields.forEach(([label, id]) => {
      let value = "";

      if (label === "Service Status") {
        value = document.querySelector(
          'input[name="serviceStatus"]:checked'
        )?.value || "";
      } else {
        value = $(id)?.value || "";
      }

      html += `
        <p>
          <strong>${escapeHTML(label)}:</strong>
          ${escapeHTML(value || "Not provided")}
        </p>
      `;
    });

    if (previewArea) {
      previewArea.innerHTML = html;
      previewArea.style.display = "block";
      previewArea.scrollIntoView({ behavior: "smooth" });
    }
  });


  // ==============================
  // 11. GOOGLE SIGN-IN PLACEHOLDER
  // ==============================

  $("googleSignIn")?.addEventListener("click", () => {
    alert(
      "Google Sign-In চালু করতে Supabase Authentication সংযুক্ত করতে হবে।"
    );
  });


  // ==============================
  // 12. FORM SUBMISSION
  // ==============================

  form.addEventListener("submit", event => {
    event.preventDefault();

    checkPassword();

    if (!form.reportValidity()) return;

    if (!$("declaration")?.checked) {
      alert("অনুগ্রহ করে Declaration গ্রহণ করুন।");
      return;
    }

    alert(
      "ফরমটি যাচাই সম্পন্ন হয়েছে। তবে Supabase Database এখনো সংযুক্ত হয়নি, তাই তথ্য সংরক্ষণ করা হয়নি।"
    );
  });


  // ==============================
  // 13. RESET FORM
  // ==============================

  form.addEventListener("reset", () => {
    setTimeout(() => {
      updateServiceStatus();
      updateCurrentStatus();
      updateSameAddress();

      if (previewArea) {
        previewArea.innerHTML = "";
        previewArea.style.display = "none";
      }

      if (photoPreview) {
        photoPreview.removeAttribute("src");
      }
    }, 0);
  });

});
