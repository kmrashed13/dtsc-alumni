
document.addEventListener("DOMContentLoaded", function () {

  // =====================================
  // 1. ELEMENT HELPERS
  // =====================================

  const $ = (id) => document.getElementById(id);

  const form = $("teacherRegistrationForm");

  if (!form) return;

  const currentYear = new Date().getFullYear();

  function setOptions(element, items, placeholder) {

    if (!element) return;

    element.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder;
    element.appendChild(first);

    items.forEach(function (item) {

      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;

      element.appendChild(option);

    });

    element.disabled = false;

  }


  // =====================================
  // 2. CONDITIONAL SERVICE STATUS
  // =====================================

  const serviceRadios = document.querySelectorAll(
    'input[name="serviceStatus"]'
  );

  const serviceSections = [
    $("workingFields"),
    $("retiredFields"),
    $("exTeacherFields")
  ];

  function updateServiceStatus() {

    const selected = document.querySelector(
      'input[name="serviceStatus"]:checked'
    );

    const status = selected ? selected.value : "";

    serviceSections.forEach(function (section) {

      if (!section) return;

      section.hidden = true;

      section.querySelectorAll(
        "input, select, textarea"
      ).forEach(function (field) {

        field.disabled = true;
        field.required = false;

      });

    });

    let activeSection = null;

    if (status === "Currently Working") {
      activeSection = $("workingFields");
    }

    if (status === "Retired") {
      activeSection = $("retiredFields");
    }

    if (status === "Transferred / Ex-Teacher") {
      activeSection = $("exTeacherFields");
    }

    if (activeSection) {

      activeSection.hidden = false;

      activeSection.querySelectorAll(
        "input, select, textarea"
      ).forEach(function (field) {

        field.disabled = false;

      });

      activeSection.querySelectorAll(
        "input, select, textarea"
      ).forEach(function (field) {

        if (field.dataset.required === "true") {
          field.required = true;
        }

      });

    }

    updateProgress();

  }

  serviceRadios.forEach(function (radio) {

    radio.addEventListener("change", updateServiceStatus);

  });


  // =====================================
  // 3. CONDITIONAL DESIGNATION
  // =====================================

  function setupOtherDesignation(selectId, groupId, inputId) {

    const select = $(selectId);
    const group = $(groupId);
    const input = $(inputId);

    if (!select || !group || !input) return;

    function update() {

      const show = select.value === "Others";

      group.hidden = !show;
      input.required = show;
      input.disabled = !show;

      if (!show) input.value = "";

    }

    select.addEventListener("change", update);
    update();

  }

  setupOtherDesignation(
    "workingDesignation",
    "workingOtherGroup",
    "workingOther"
  );


  // =====================================
  // 4. NON-TECH SUBJECT
  // =====================================

  function setupDepartment(selectId, groupId, inputId) {

    const select = $(selectId);
    const group = $(groupId);
    const input = $(inputId);

    if (!select || !group || !input) return;

    function update() {

      const show = select.value === "Non-Tech / General";

      group.hidden = !show;
      input.required = show;
      input.disabled = !show;

      if (!show) input.value = "";

    }

    select.addEventListener("change", update);
    update();

  }

  setupDepartment(
    "workingDepartment",
    "workingSubjectGroup",
    "workingSubject"
  );


  // =====================================
  // 5. TRANSFERRED CURRENT STATUS
  // =====================================

  const professionalStatus = $("professionalStatus");
  const workplaceGroup = $("workplaceGroup");
  const currentWorkplace = $("currentWorkplace");
  const otherStatusGroup = $("otherStatusGroup");
  const otherStatus = $("otherStatus");

  function updateProfessionalStatus() {

    if (!professionalStatus) return;

    const value = professionalStatus.value;

    const showWorkplace = [
      "Government Institute",
      "Private Institute"
    ].includes(value);

    const showOther = value === "Others";

    if (workplaceGroup) {
      workplaceGroup.hidden = !showWorkplace;
    }

    if (currentWorkplace) {
      currentWorkplace.disabled = !showWorkplace;
      currentWorkplace.required = showWorkplace;

      if (!showWorkplace) currentWorkplace.value = "";
    }

    if (otherStatusGroup) {
      otherStatusGroup.hidden = !showOther;
    }

    if (otherStatus) {
      otherStatus.disabled = !showOther;
      otherStatus.required = showOther;

      if (!showOther) otherStatus.value = "";
    }

  }

  if (professionalStatus) {
    professionalStatus.addEventListener(
      "change",
      updateProfessionalStatus
    );

    updateProfessionalStatus();
  }


  // =====================================
  // 6. YEAR DROPDOWNS
  // =====================================

  function fillYears(id, placeholder) {

    const select = $(id);

    if (!select) return;

    select.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder;
    select.appendChild(first);

    for (let year = currentYear; year >= 1966; year--) {

      const option = document.createElement("option");

      option.value = year;
      option.textContent = year;

      select.appendChild(option);

    }

  }

  fillYears("joiningYear", "Select Joining Year");
  fillYears("retirementYear", "Select Retirement Year");
  fillYears("serviceFrom", "Select From Year");
  fillYears("serviceTo", "Select To Year");


  // =====================================
  // 7. BANGLADESH ADDRESS DATA
  // =====================================

  const locationData = {

    "Dhaka": {
      "Dhaka": [
        "Dhamrai", "Dohar", "Keraniganj",
        "Nawabganj", "Savar"
      ],
      "Faridpur": [
        "Alfadanga", "Bhanga", "Boalmari",
        "Charbhadrasan", "Faridpur Sadar",
        "Madhukhali", "Nagarkanda",
        "Sadarpur", "Saltha"
      ],
      "Gazipur": [
        "Gazipur Sadar", "Kaliakair",
        "Kaliganj", "Kapasia", "Sreepur"
      ],
      "Gopalganj": [
        "Gopalganj Sadar", "Kashiani",
        "Kotalipara", "Muksudpur", "Tungipara"
      ],
      "Kishoreganj": [
        "Austagram", "Bajitpur", "Bhairab",
        "Hossainpur", "Itna", "Karimganj",
        "Katiadi", "Kishoreganj Sadar",
        "Kuliarchar", "Mithamain", "Nikli",
        "Pakundia", "Tarail"
      ],
      "Madaripur": [
        "Kalkini", "Madaripur Sadar",
        "Rajoir", "Shibchar"
      ],
      "Manikganj": [
        "Daulatpur", "Ghior", "Harirampur",
        "Manikganj Sadar", "Saturia",
        "Shibalaya", "Singair"
      ],
      "Munshiganj": [
        "Gazaria", "Lohajang", "Munshiganj Sadar",
        "Sirajdikhan", "Sreenagar", "Tongibari"
      ],
      "Narayanganj": [
        "Araihazar", "Bandar", "Narayanganj Sadar",
        "Rupganj", "Sonargaon"
      ],
      "Narsingdi": [
        "Belabo", "Monohardi", "Narsingdi Sadar",
        "Palash", "Raipura", "Shibpur"
      ],
      "Rajbari": [
        "Baliakandi", "Goalanda",
        "Kalukhali", "Pangsha", "Rajbari Sadar"
      ],
      "Shariatpur": [
        "Bhedarganj", "Damudya", "Gosairhat",
        "Naria", "Shariatpur Sadar", "Zajira"
      ],
      "Tangail": [
        "Basail", "Bhuapur", "Delduar", "Dhanbari",
        "Ghatail", "Gopalpur", "Kalihati",
        "Madhupur", "Mirzapur", "Nagarpur",
        "Sakhipur", "Tangail Sadar"
      ]
    },

    "Chattogram": {
      "Bandarban": [
        "Alikadam", "Bandarban Sadar",
        "Lama", "Naikhongchhari",
        "Rowangchhari", "Ruma", "Thanchi"
      ],
      "Brahmanbaria": [
        "Akhaura", "Ashuganj", "Bancharampur",
        "Bijoynagar", "Brahmanbaria Sadar",
        "Kasba", "Nabinagar", "Nasirnagar", "Sarail"
      ],
      "Chandpur": [
        "Chandpur Sadar", "Faridganj",
        "Haimchar", "Hajiganj", "Kachua",
        "Matlab Dakshin", "Matlab Uttar", "Shahrasti"
      ],
      "Chattogram": [
        "Anwara", "Banshkhali", "Boalkhali",
        "Chandanaish", "Fatikchhari", "Hathazari",
        "Lohagara", "Mirsharai", "Patiya",
        "Rangunia", "Raozan", "Sandwip",
        "Satkania", "Sitakunda"
      ],
      "Cumilla": [
        "Barura", "Brahmanpara", "Burichang",
        "Chandina", "Chauddagram", "Cumilla Adarsha Sadar",
        "Cumilla Sadar Dakshin", "Daudkandi",
        "Debidwar", "Homna", "Laksam", "Lalmai",
        "Meghna", "Monohorgonj", "Muradnagar",
        "Nangalkot", "Titas"
      ],
      "Cox's Bazar": [
        "Chakaria", "Cox's Bazar Sadar",
        "Kutubdia", "Maheshkhali", "Pekua",
        "Ramu", "Teknaf", "Ukhia"
      ],
      "Feni": [
        "Chhagalnaiya", "Daganbhuiyan",
        "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"
      ],
      "Khagrachhari": [
        "Dighinala", "Guimara", "Khagrachhari Sadar",
        "Lakshmichhari", "Mahalchhari",
        "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"
      ],
      "Lakshmipur": [
        "Kamalnagar", "Lakshmipur Sadar",
        "Raipur", "Ramganj", "Ramgati"
      ],
      "Noakhali": [
        "Begumganj", "Chatkhil", "Companiganj",
        "Hatiya", "Kabirhat", "Noakhali Sadar",
        "Senbagh", "Sonaimuri", "Subarnachar"
      ],
      "Rangamati": [
        "Baghaichhari", "Barkal", "Kawkhali",
        "Belaichhari", "Juraichhari",
        "Langadu", "Naniarchar", "Rajasthali",
        "Rangamati Sadar"
      ]
    },

    "Rajshahi": {
      "Bogura": [
        "Adamdighi", "Bogura Sadar", "Dhunat",
        "Dhupchanchia", "Gabtali", "Kahaloo",
        "Nandigram", "Sariakandi", "Shajahanpur",
        "Sherpur", "Shibganj", "Sonatala"
      ],
      "Joypurhat": [
        "Akkelpur", "Joypurhat Sadar",
        "Kalai", "Khetlal", "Panchbibi"
      ],
      "Naogaon": [
        "Atrai", "Badalgachhi", "Dhamoirhat",
        "Manda", "Mahadebpur", "Naogaon Sadar",
        "Niamatpur", "Patnitala", "Porsha",
        "Raninagar", "Sapahar"
      ],
      "Natore": [
        "Bagatipara", "Baraigram", "Gurudaspur",
        "Lalpur", "Natore Sadar", "Singra"
      ],
      "Chapainawabganj": [
        "Bholahat", "Gomastapur",
        "Nachole", "Chapainawabganj Sadar", "Shibganj"
      ],
      "Pabna": [
        "Atgharia", "Bera", "Bhangura", "Chatmohar",
        "Faridpur", "Ishwardi", "Pabna Sadar",
        "Santhia", "Sujanagar"
      ],
      "Rajshahi": [
        "Bagha", "Bagmara", "Charghat", "Durgapur",
        "Godagari", "Mohanpur", "Paba",
        "Puthia", "Tanore"
      ],
      "Sirajganj": [
        "Belkuchi", "Chauhali", "Kamarkhanda",
        "Kazipur", "Raiganj", "Shahjadpur",
        "Sirajganj Sadar", "Tarash", "Ullahpara"
      ]
    },

    "Khulna": {
      "Bagerhat": [
        "Bagerhat Sadar", "Chitalmari", "Fakirhat",
        "Kachua", "Mollahat", "Mongla",
        "Morrelganj", "Rampal", "Sarankhola"
      ],
      "Chuadanga": [
        "Alamdanga", "Chuadanga Sadar",
        "Damurhuda", "Jibannagar"
      ],
      "Jashore": [
        "Abhaynagar", "Bagherpara", "Chaugachha",
        "Jashore Sadar", "Jhikargachha",
        "Keshabpur", "Manirampur", "Sharsha"
      ],
      "Jhenaidah": [
        "Harinakunda", "Jhenaidah Sadar",
        "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"
      ],
      "Khulna": [
        "Batiaghata", "Dacope", "Dighalia",
        "Dumuria", "Koyra", "Paikgachha",
        "Phultala", "Rupsa", "Terokhada"
      ],
      "Kushtia": [
        "Bheramara", "Daulatpur", "Khoksa",
        "Kumarkhali", "Kushtia Sadar", "Mirpur"
      ],
      "Magura": [
        "Magura Sadar", "Mohammadpur",
        "Shalikha", "Sreepur"
      ],
      "Meherpur": [
        "Gangni", "Meherpur Sadar", "Mujibnagar"
      ],
      "Narail": [
        "Kalia", "Lohagara", "Narail Sadar"
      ],
      "Satkhira": [
        "Assasuni", "Debhata", "Kalaroa",
        "Kaliganj", "Satkhira Sadar",
        "Shyamnagar", "Tala"
      ]
    },

    "Barishal": {
      "Barguna": [
        "Amtali", "Bamna", "Barguna Sadar",
        "Betagi", "Patharghata", "Taltali"
      ],
      "Barishal": [
        "Agailjhara", "Babuganj", "Bakerganj",
        "Banaripara", "Barishal Sadar",
        "Gournadi", "Hizla", "Mehendiganj",
        "Muladi", "Wazirpur"
      ],
      "Bhola": [
        "Bhola Sadar", "Burhanuddin",
        "Char Fasson", "Daulatkhan",
        "Lalmohan", "Manpura", "Tazumuddin"
      ],
      "Jhalokati": [
        "Jhalokati Sadar", "Kathalia",
        "Nalchity", "Rajapur"
      ],
      "Patuakhali": [
        "Bauphal", "Dashmina", "Dumki",
        "Galachipa", "Kalapara", "Mirzaganj",
        "Patuakhali Sadar", "Rangabali"
      ],
      "Pirojpur": [
        "Bhandaria", "Indurkani", "Kawkhali",
        "Mathbaria", "Nazirpur", "Nesarabad",
        "Pirojpur Sadar"
      ]
    },

    "Sylhet": {
      "Habiganj": [
        "Ajmiriganj", "Bahubal", "Baniachong",
        "Chunarughat", "Habiganj Sadar",
        "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"
      ],
      "Moulvibazar": [
        "Barlekha", "Juri", "Kamalganj",
        "Kulaura", "Moulvibazar Sadar",
        "Rajnagar", "Sreemangal"
      ],
      "Sunamganj": [
        "Bishwamvarpur", "Chhatak", "Derai",
        "Dharampasha", "Dowarabazar", "Jagannathpur",
        "Jamalganj", "Shalla", "Sunamganj Sadar",
        "Tahirpur", "Madhyanagar"
      ],
      "Sylhet": [
        "Balaganj", "Beanibazar", "Bishwanath",
        "Companiganj", "Fenchuganj", "Golapganj",
        "Gowainghat", "Jaintiapur", "Kanaighat",
        "Osmaninagar", "Sylhet Sadar", "Zakiganj"
      ]
    },

    "Rangpur": {
      "Dinajpur": [
        "Birampur", "Birganj", "Biral", "Bochaganj",
        "Chirirbandar", "Dinajpur Sadar",
        "Fulbari", "Ghoraghat", "Hakimpur",
        "Kaharole", "Khansama", "Nawabganj", "Parbatipur"
      ],
      "Gaibandha": [
        "Fulchhari", "Gaibandha Sadar",
        "Gobindaganj", "Palashbari", "Sadullapur",
        "Saghata", "Sundarganj"
      ],
      "Kurigram": [
        "Bhurungamari", "Char Rajibpur",
        "Chilmari", "Kurigram Sadar",
        "Nageshwari", "Phulbari", "Rajarhat",
        "Raomari", "Ulipur"
      ],
      "Lalmonirhat": [
        "Aditmari", "Hatibandha", "Kaliganj",
        "Lalmonirhat Sadar", "Patgram"
      ],
      "Nilphamari": [
        "Dimla", "Domar", "Jaldhaka",
        "Kishoreganj", "Nilphamari Sadar", "Saidpur"
      ],
      "Panchagarh": [
        "Atwari", "Boda", "Debiganj",
        "Panchagarh Sadar", "Tetulia"
      ],
      "Rangpur": [
        "Badarganj", "Gangachara", "Kaunia",
        "Mithapukur", "Pirgachha", "Pirganj",
        "Rangpur Sadar", "Taraganj"
      ],
      "Thakurgaon": [
        "Baliadangi", "Haripur", "Pirganj",
        "Ranisankail", "Thakurgaon Sadar"
      ]
    },

    "Mymensingh": {
      "Jamalpur": [
        "Bakshiganj", "Dewanganj", "Islampur",
        "Jamalpur Sadar", "Madarganj",
        "Melandaha", "Sarishabari"
      ],
      "Mymensingh": [
        "Bhaluka", "Dhobaura", "Fulbaria",
        "Gaffargaon", "Gauripur", "Haluaghat",
        "Ishwarganj", "Muktagachha",
        "Mymensingh Sadar", "Nandail",
        "Phulpur", "Trishal", "Tarakanda"
      ],
      "Netrokona": [
        "Atpara", "Barhatta", "Durgapur",
        "Khaliajuri", "Kalmakanda", "Kendua",
        "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"
      ],
      "Sherpur": [
        "Jhenaigati", "Nakla", "Nalitabari",
        "Sherpur Sadar", "Sreebardi"
      ]
    }

  };


  // =====================================
  // 8. DIVISION DROPDOWNS
  // =====================================

  const divisions = Object.keys(locationData);

  function setupAddress(prefix) {

    const division = $(prefix + "Division");
    const district = $(prefix + "District");
    const areaType = $(prefix + "AreaType");
    const upazila = $(prefix + "Upazila");

    const unionGroup = $(prefix + "UnionGroup");
    const unionInput = $(prefix + "Union");

    if (!division || !district || !areaType || !upazila) {
      return;
    }

    setOptions(division, divisions, "Select Division");

    district.disabled = true;
    upazila.disabled = true;

    division.addEventListener("change", function () {

      const districts = Object.keys(
        locationData[division.value] || {}
      );

      setOptions(district, districts, "Select District");

      setOptions(upazila, [], "Select Area");

      if (unionGroup) unionGroup.hidden = true;
      if (unionInput) unionInput.value = "";

    });

    district.addEventListener("change", function () {

      const areas =
        locationData[division.value]?.[district.value] || [];

      setOptions(upazila, areas, "Select Area");

      if (unionGroup) unionGroup.hidden = true;
      if (unionInput) unionInput.value = "";

    });

    areaType.addEventListener("change", function () {

      if (unionGroup) {
        unionGroup.hidden = areaType.value !== "Upazila";
      }

      if (unionInput) {
        unionInput.value = "";
      }

    });

    upazila.addEventListener("change", function () {

      if (unionInput && areaType.value === "Upazila") {
        unionInput.value = "";
      }

    });

  }

  setupAddress("present");
  setupAddress("permanent");


  // =====================================
  // 9. SAME ADDRESS
  // =====================================

  const sameAddress = $("sameAddress");

  const presentFields = [
    "Division",
    "District",
    "AreaType",
    "Upazila",
    "Union",
    "PostOffice",
    "PostCode",
    "Address"
  ];

  const permanentAddressSection = $("permanentAddressSection");

  function copyAddressField(fromId, toId) {

    const from = $(fromId);
    const to = $(toId);

    if (!from || !to) return;

    if (from.tagName === "SELECT") {

      to.innerHTML = from.innerHTML;
      to.value = from.value;

    } else {

      to.value = from.value;

    }

  }

  function updateSameAddress() {

    const checked = sameAddress && sameAddress.checked;

    if (permanentAddressSection) {
      permanentAddressSection.hidden = checked;
    }

    presentFields.forEach(function (field) {

      const permanentField = $("permanent" + field);

      if (!permanentField) return;

      permanentField.disabled = checked;

      permanentField.required = !checked &&
        ["Division", "District", "AreaType", "Upazila", "Address"].includes(field);

    });

    if (checked) {

      presentFields.forEach(function (field) {

        copyAddressField(
          "present" + field,
          "permanent" + field
        );

      });

    }

    updateProgress();

  }

  if (sameAddress) {
    sameAddress.addEventListener("change", updateSameAddress);
  }


  // =====================================
  // 10. PHOTO PREVIEW
  // =====================================

  const photoInput = $("teacherPhoto");
  const photoPreview = $("photoPreview");
  const photoPlaceholder = $("photoPlaceholder");

  if (photoInput) {

    photoInput.addEventListener("change", function () {

      const file = photoInput.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        photoInput.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Photo size must be less than 5 MB.");
        photoInput.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {

        photoPreview.src = event.target.result;
        photoPreview.hidden = false;

        if (photoPlaceholder) {
          photoPlaceholder.hidden = true;
        }

      };

      reader.readAsDataURL(file);

      updateProgress();

    });

  }


  // =====================================
  // 11. PASSWORD VALIDATION
  // =====================================

  const password = $("password");
  const confirmPassword = $("confirmPassword");

  function validatePassword() {

    if (!password || !confirmPassword) return true;

    if (confirmPassword.value === "") {
      confirmPassword.setCustomValidity("");
      return true;
    }

    if (password.value !== confirmPassword.value) {

      confirmPassword.setCustomValidity(
        "Passwords do not match."
      );

      return false;

    }

    confirmPassword.setCustomValidity("");

    return true;

  }

  if (password) {
    password.addEventListener("input", validatePassword);
  }

  if (confirmPassword) {
    confirmPassword.addEventListener("input", validatePassword);
  }


  // =====================================
  // 12. PROGRESS BAR
  // =====================================

  const progressBar = $("progressBar");
  const progressText = $("progressText");

  function updateProgress() {

    const fields = Array.from(
      form.querySelectorAll(
        "input:not([type=hidden]):not([type=radio]):not([type=checkbox]):not([type=file]), select, textarea"
      )
    ).filter(function (field) {

      return !field.disabled;

    });

    const requiredFields = fields.filter(function (field) {

      return field.required;

    });

    let completed = 0;

    requiredFields.forEach(function (field) {

      if (field.value.trim() !== "") {
        completed++;
      }

    });

    const declaration = $("declaration");

    const total = requiredFields.length + 1;

    const done = completed + (
      declaration && declaration.checked ? 1 : 0
    );

    const percent = total
      ? Math.round((done / total) * 100)
      : 0;

    if (progressBar) {
      progressBar.style.width = percent + "%";
    }

    if (progressText) {
      progressText.textContent = percent + "% Completed";
    }

  }

  form.addEventListener("input", updateProgress);
  form.addEventListener("change", updateProgress);


  // =====================================
  // 13. PREVIEW INFORMATION
  // =====================================

  const previewBtn = $("previewBtn");
  const previewSection = $("previewSection");
  const previewContent = $("previewContent");
  const editBtn = $("editBtn");

  function getSelectedStatus() {

    const selected = document.querySelector(
      'input[name="serviceStatus"]:checked'
    );

    return selected ? selected.value : "";

  }

  function getFieldValue(id) {

    const element = $(id);

    if (!element || element.disabled) return "";

    return element.value.trim();

  }

  function addPreviewLine(label, value) {

    if (!value) return "";

    return `
      <p>
        <strong>${escapeHTML(label)}:</strong>
        ${escapeHTML(value)}
      </p>
    `;

  }

  function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (char) {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[char];

    });

  }

  if (previewBtn) {

    previewBtn.addEventListener("click", function () {

      if (!form.reportValidity()) return;

      if (!validatePassword()) {
        confirmPassword.reportValidity();
        return;
      }

      let html = "";

      html += addPreviewLine(
        "Full Name",
        getFieldValue("fullName")
      );

      html += addPreviewLine(
        "বাংলা নাম",
        getFieldValue("nameBangla")
      );

      html += addPreviewLine(
        "Gender",
        getFieldValue("gender")
      );

      html += addPreviewLine(
        "Blood Group",
        getFieldValue("bloodGroup")
      );

      html += addPreviewLine(
        "Mobile",
        getFieldValue("mobile")
      );

      html += addPreviewLine(
        "Email",
        getFieldValue("email")
      );

      html += addPreviewLine(
        "Service Status",
        getSelectedStatus()
      );

      html += addPreviewLine(
        "Designation",
        getFieldValue("workingDesignation") ||
        getFieldValue("retiredDesignation") ||
        getFieldValue("transferDesignation")
      );

      html += addPreviewLine(
        "Department",
        getFieldValue("workingDepartment") ||
        getFieldValue("retiredDepartment") ||
        getFieldValue("transferDepartment")
      );

      html += addPreviewLine(
        "Joining Date",
        getFieldValue("joiningDate")
      );

      html += addPreviewLine(
        "Joining Year",
        getFieldValue("joiningYear")
      );

      html += addPreviewLine(
        "Retirement Year",
        getFieldValue("retirementYear")
      );

      html += addPreviewLine(
        "Service From",
        getFieldValue("serviceFrom")
      );

      html += addPreviewLine(
        "Service To",
        getFieldValue("serviceTo")
      );

      html += addPreviewLine(
        "Current Status",
        getFieldValue("professionalStatus")
      );

      html += addPreviewLine(
        "Present Address",
        [
          getFieldValue("presentUpazila"),
          getFieldValue("presentDistrict"),
          getFieldValue("presentDivision"),
          getFieldValue("presentAddress")
        ].filter(Boolean).join(", ")
      );

      html += addPreviewLine(
        "Advice",
        getFieldValue("suggestions")
      );

      previewContent.innerHTML = html;

      previewSection.hidden = false;

      previewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }

  if (editBtn) {

    editBtn.addEventListener("click", function () {

      previewSection.hidden = true;

      form.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  // =====================================
  // 14. GOOGLE SIGN IN PLACEHOLDER
  // =====================================

  const googleSignIn = $("googleSignIn");

  if (googleSignIn) {

    googleSignIn.addEventListener("click", function () {

      alert(
        "Google Sign-in will be enabled after Supabase Authentication configuration."
      );

    });

  }


  // =====================================
  // 15. SUBMIT HANDLER
  // =====================================

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validatePassword()) {
      confirmPassword.reportValidity();
      return;
    }

    if (!form.reportValidity()) return;

    alert(
      "Your form is ready. Supabase database and authentication integration is the next step."
    );

  });


  // =====================================
  // 16. INITIALIZE FORM
  // =====================================

  updateServiceStatus();
  updateProfessionalStatus();
  updateSameAddress();
  updateProgress();

});
