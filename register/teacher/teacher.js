
/* =====================================
   DTSC ALUMNI ASSOCIATION
   TEACHER REGISTRATION JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("teacherRegistrationForm");

  // =====================================
  // 1. SERVICE STATUS CONDITIONAL FIELDS
  // =====================================

  const statusRadios = document.querySelectorAll(
    'input[name="serviceStatus"]'
  );

  const workingFields = document.getElementById("workingFields");
  const retiredFields = document.getElementById("retiredFields");
  const exTeacherFields = document.getElementById("exTeacherFields");

  function updateServiceFields() {

    const selected = document.querySelector(
      'input[name="serviceStatus"]:checked'
    );

    const status = selected ? selected.value : "";

    workingFields.hidden = status !== "Currently Working";
    retiredFields.hidden = status !== "Retired";
    exTeacherFields.hidden = status !== "Transferred";

    setConditionalRequired(
      workingFields,
      status === "Currently Working",
      ["workingDesignation", "workingDepartment"]
    );

    setConditionalRequired(
      retiredFields,
      status === "Retired",
      ["retirementDate"]
    );

    setConditionalRequired(
      exTeacherFields,
      status === "Transferred",
      ["transferDate", "transferInstitution"]
    );
  }

  function setConditionalRequired(section, active, ids) {

    section.querySelectorAll("input, select, textarea").forEach(field => {
      field.disabled = !active;
    });

    ids.forEach(id => {
      const field = document.getElementById(id);

      if (field) {
        field.required = active;
      }
    });
  }

  statusRadios.forEach(radio => {
    radio.addEventListener("change", updateServiceFields);
  });

  updateServiceFields();


  // =====================================
  // 2. PROFILE PHOTO PREVIEW
  // =====================================

  const teacherPhoto = document.getElementById("teacherPhoto");
  const photoPreview = document.getElementById("photoPreview");

  teacherPhoto.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      this.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Photo size must be less than 5 MB.");
      this.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      photoPreview.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });


  // =====================================
  // 3. BANGLADESH ADDRESS DATA
  // =====================================

  const locationData = {

    "Dhaka": {
      "Dhaka": {
        "Upazila": [
          "Dhamrai",
          "Dohar",
          "Keraniganj",
          "Nawabganj",
          "Savar"
        ],
        "City Corporation": [
          "Dhaka North City Corporation",
          "Dhaka South City Corporation"
        ],
        "Municipality": []
      },

      "Gazipur": {
        "Upazila": [
          "Gazipur Sadar",
          "Kaliakair",
          "Kaliganj",
          "Kapasia",
          "Sreepur"
        ],
        "City Corporation": [
          "Gazipur City Corporation"
        ],
        "Municipality": []
      },

      "Narayanganj": {
        "Upazila": [
          "Araihazar",
          "Bandar",
          "Narayanganj Sadar",
          "Rupganj",
          "Sonargaon"
        ],
        "City Corporation": [
          "Narayanganj City Corporation"
        ],
        "Municipality": []
      },

      "Tangail": {
        "Upazila": [
          "Basail", "Bhuapur", "Delduar", "Dhanbari",
          "Ghatail", "Gopalpur", "Kalihati", "Madhupur",
          "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Jamalpur": {
        "Upazila": [
          "Dewanganj",
          "Baksiganj",
          "Islampur",
          "Jamalpur Sadar",
          "Madarganj",
          "Melandaha",
          "Sarishabari"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Sherpur": {
        "Upazila": [
          "Jhenaigati",
          "Nakla",
          "Nalitabari",
          "Sherpur Sadar",
          "Sreebardi"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Kishoreganj": {
        "Upazila": [
          "Austagram", "Bajitpur", "Bhairab",
          "Hossainpur", "Itna", "Karimganj",
          "Katiadi", "Kishoreganj Sadar",
          "Kuliarchar", "Mithamain", "Nikli",
          "Pakundia", "Tarail"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Faridpur": {
        "Upazila": [
          "Alfadanga", "Bhanga", "Boalmari",
          "Charbhadrasan", "Faridpur Sadar",
          "Madhukhali", "Nagarkanda",
          "Sadarpur", "Saltha"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Gopalganj": {
        "Upazila": [
          "Gopalganj Sadar", "Kashiani",
          "Kotalipara", "Muksudpur", "Tungipara"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Madaripur": {
        "Upazila": [
          "Dasar", "Kalkini", "Madaripur Sadar",
          "Rajoir", "Shibchar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Rajbari": {
        "Upazila": [
          "Baliakandi", "Goalanda",
          "Kalukhali", "Pangsha", "Rajbari Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Shariatpur": {
        "Upazila": [
          "Bhedarganj", "Damudya", "Gosairhat",
          "Naria", "Shariatpur Sadar",
          "Zajira"
        ],
        "City Corporation": [],
        "Municipality": []
      },
      
      "Manikganj": {
        "Upazila": [
          "Daulatpur", "Ghior", "Harirampur",
          "Manikganj Sadar", "Saturia",
          "Shibalaya", "Singair"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Chattogram": {
      "Chattogram": {
        "Upazila": [
          "Anwara", "Banshkhali", "Boalkhali",
          "Chandanaish", "Fatikchhari", "Hathazari",
          "Lohagara", "Mirsharai", "Patiya",
          "Rangunia", "Raozan", "Sandwip",
          "Satkania", "Sitakunda"
        ],
        "City Corporation": [
          "Chattogram City Corporation"
        ],
        "Municipality": []
      },

      "Cox's Bazar": {
        "Upazila": [
          "Chakaria", "Cox's Bazar Sadar",
          "Kutubdia", "Maheshkhali",
          "Pekua", "Ramu", "Teknaf", "Ukhia"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Cumilla": {
        "Upazila": [
          "Barura", "Brahmanpara", "Burichang",
          "Chandina", "Chauddagram", "Cumilla Adarsha Sadar",
          "Cumilla Sadar Dakshin", "Daudkandi",
          "Debidwar", "Homna", "Laksam", "Lalmai",
          "Meghna", "Monoharganj", "Muradnagar",
          "Nangalkot", "Titas"
        ],
        "City Corporation": [
          "Cumilla City Corporation"
        ],
        "Municipality": []
      },

      "Feni": {
        "Upazila": [
          "Chhagalnaiya", "Daganbhuiyan",
          "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Brahmanbaria": {
        "Upazila": [
          "Akhaura", "Ashuganj", "Bancharampur",
          "Bijoynagar", "Brahmanbaria Sadar",
          "Kasba", "Nabinagar", "Nasirnagar", "Sarail"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Chandpur": {
        "Upazila": [
          "Chandpur Sadar", "Faridganj", "Haimchar",
          "Haziganj", "Kachua", "Matlab Dakshin",
          "Matlab Uttar", "Shahrasti"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Lakshmipur": {
        "Upazila": [
          "Kamalnagar", "Lakshmipur Sadar",
          "Raipur", "Ramganj", "Ramgati"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Noakhali": {
        "Upazila": [
          "Begumganj", "Chatkhil", "Companiganj",
          "Hatiya", "Kabirhat", "Noakhali Sadar",
          "Senbagh", "Sonaimuri", "Subarnachar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Khagrachhari": {
        "Upazila": [
          "Dighinala", "Guimara", "Khagrachhari Sadar",
          "Lakshmichhari", "Mahalchhari",
          "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Rangamati": {
        "Upazila": [
          "Baghaichhari", "Barkal", "Belaichhari",
          "Juraichhari", "Kaptai", "Kawkhali",
          "Langadu", "Naniarchar", "Rajasthali",
          "Rangamati Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Bandarban": {
        "Upazila": [
          "Alikadam", "Bandarban Sadar",
          "Lama", "Naikhongchhari",
          "Rowangchhari", "Ruma", "Thanchi"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Rajshahi": {
      "Rajshahi": {
        "Upazila": [
          "Bagha", "Bagmara", "Charghat",
          "Durgapur", "Godagari", "Mohanpur",
          "Paba", "Puthia", "Tanore"
        ],
        "City Corporation": [
          "Rajshahi City Corporation"
        ],
        "Municipality": []
      },

      "Bogura": {
        "Upazila": [
          "Adamdighi", "Bogura Sadar", "Dhunat",
          "Dhupchanchia", "Gabtali", "Kahaloo",
          "Nandigram", "Sariakandi", "Shajahanpur",
          "Sherpur", "Shibganj", "Sonatola"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Pabna": {
        "Upazila": [
          "Atgharia", "Bera", "Bhangura",
          "Chatmohar", "Faridpur", "Ishwardi",
          "Pabna Sadar", "Santhia", "Sujanagar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Sirajganj": {
        "Upazila": [
          "Belkuchi", "Chauhali", "Kamarkhanda",
          "Kazipur", "Raiganj", "Shahjadpur",
          "Sirajganj Sadar", "Tarash", "Ullahpara"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Natore": {
        "Upazila": [
          "Bagatipara", "Baraigram", "Gurudaspur",
          "Lalpur", "Naldanga", "Natore Sadar", "Singra"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Naogaon": {
        "Upazila": [
          "Atrai", "Badalgachhi", "Dhamoirhat",
          "Manda", "Mahadebpur", "Naogaon Sadar",
          "Niamatpur", "Patnitala", "Porsha",
          "Raninagar", "Sapahar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Joypurhat": {
        "Upazila": [
          "Akkelpur", "Joypurhat Sadar",
          "Kalai", "Khetlal", "Panchbibi"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Chapainawabganj": {
        "Upazila": [
          "Bholahat", "Gomastapur",
          "Nachole", "Nawabganj Sadar", "Shibganj"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Khulna": {
      "Khulna": {
        "Upazila": [
          "Batiaghata", "Dacope", "Dumuria",
          "Dighalia", "Koyra", "Paikgachha",
          "Phultala", "Rupsa", "Terokhada"
        ],
        "City Corporation": [
          "Khulna City Corporation"
        ],
        "Municipality": []
      },

      "Bagerhat": {
        "Upazila": [
          "Bagerhat Sadar", "Chitalmari", "Fakirhat",
          "Kachua", "Mollahat", "Mongla",
          "Morrelganj", "Rampal", "Sarankhola"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Satkhira": {
        "Upazila": [
          "Assasuni", "Debhata", "Kalaroa",
          "Kaliganj", "Satkhira Sadar",
          "Shyamnagar", "Tala"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Jashore": {
        "Upazila": [
          "Abhaynagar", "Bagherpara", "Chaugachha",
          "Jhikargachha", "Keshabpur", "Manirampur",
          "Sharsha", "Jashore Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Jhenaidah": {
        "Upazila": [
          "Harinakunda", "Jhenaidah Sadar",
          "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Magura": {
        "Upazila": [
          "Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Narail": {
        "Upazila": [
          "Kalia", "Lohagara", "Narail Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Kushtia": {
        "Upazila": [
          "Bheramara", "Daulatpur", "Khoksa",
          "Kumarkhali", "Kushtia Sadar", "Mirpur"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Chuadanga": {
        "Upazila": [
          "Alamdanga", "Chuadanga Sadar",
          "Damurhuda", "Jibannagar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Meherpur": {
        "Upazila": [
          "Gangni", "Meherpur Sadar", "Mujibnagar"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Barishal": {
      "Barishal": {
        "Upazila": [
          "Agailjhara", "Babuganj", "Bakerganj",
          "Banaripara", "Gournadi", "Hizla",
          "Mehendiganj", "Muladi", "Wazirpur"
        ],
        "City Corporation": [
          "Barishal City Corporation"
        ],
        "Municipality": []
      },

      "Bhola": {
        "Upazila": [
          "Bhola Sadar", "Borhanuddin", "Char Fasson",
          "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Patuakhali": {
        "Upazila": [
          "Bauphal", "Dashmina", "Dumki",
          "Galachipa", "Kalapara", "Mirzaganj",
          "Patuakhali Sadar", "Rangabali"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Pirojpur": {
        "Upazila": [
          "Bhandaria", "Kawkhali", "Mathbaria",
          "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Barguna": {
        "Upazila": [
          "Amtali", "Bamna", "Barguna Sadar",
          "Betagi", "Patharghata", "Taltali"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Jhalokati": {
        "Upazila": [
          "Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Sylhet": {
      "Sylhet": {
        "Upazila": [
          "Balaganj", "Beanibazar", "Bishwanath",
          "Companiganj", "Fenchuganj", "Golapganj",
          "Gowainghat", "Jaintiapur", "Kanaighat",
          "Osmaninagar", "Sylhet Sadar", "Zakiganj"
        ],
        "City Corporation": [
          "Sylhet City Corporation"
        ],
        "Municipality": []
      },

      "Moulvibazar": {
        "Upazila": [
          "Barlekha", "Juri", "Kamalganj",
          "Kulaura", "Moulvibazar Sadar",
          "Rajnagar", "Sreemangal"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Habiganj": {
        "Upazila": [
          "Ajmiriganj", "Bahubal", "Baniachong",
          "Chunarughat", "Habiganj Sadar",
          "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Sunamganj": {
        "Upazila": [
          "Bishwamvarpur", "Chhatak", "Derai",
          "Dharmapasha", "Dowarabazar", "Jagannathpur",
          "Jamalganj", "Madhyanagar", "Sulla",
          "Sunamganj Sadar", "Shalla", "Tahirpur"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Rangpur": {
      "Rangpur": {
        "Upazila": [
          "Badarganj", "Gangachara", "Kaunia",
          "Mithapukur", "Pirgachha", "Pirganj",
          "Rangpur Sadar", "Taraganj"
        ],
        "City Corporation": [
          "Rangpur City Corporation"
        ],
        "Municipality": []
      },

      "Dinajpur": {
        "Upazila": [
          "Birampur", "Birganj", "Biral",
          "Bochaganj", "Chirirbandar", "Dinajpur Sadar",
          "Fulbari", "Ghoraghat", "Hakimpur",
          "Kaharole", "Khansama", "Nawabganj", "Parbatipur"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Gaibandha": {
        "Upazila": [
          "Fulchhari", "Gaibandha Sadar", "Gobindaganj",
          "Palashbari", "Sadullapur", "Saghata", "Sundarganj"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Kurigram": {
        "Upazila": [
          "Bhurungamari", "Char Rajibpur", "Chilmari",
          "Fulbari", "Kurigram Sadar", "Nageshwari",
          "Rajarhat", "Raomari", "Ulipur"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Lalmonirhat": {
        "Upazila": [
          "Aditmari", "Hatibandha", "Kaliganj",
          "Lalmonirhat Sadar", "Patgram"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Nilphamari": {
        "Upazila": [
          "Dimla", "Domar", "Jaldhaka",
          "Kishoreganj", "Nilphamari Sadar", "Saidpur"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Panchagarh": {
        "Upazila": [
          "Atwari", "Boda", "Debiganj",
          "Panchagarh Sadar", "Tetulia"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Thakurgaon": {
        "Upazila": [
          "Baliadangi", "Haripur", "Pirganj",
          "Ranisankail", "Thakurgaon Sadar"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    },

    "Mymensingh": {
      "Mymensingh": {
        "Upazila": [
          "Bhaluka", "Dhobaura", "Fulbaria",
          "Gaffargaon", "Gauripur", "Haluaghat",
          "Ishwarganj", "Muktagachha", "Mymensingh Sadar",
          "Nandail", "Phulpur", "Tarakanda", "Trishal"
        ],
        "City Corporation": [
          "Mymensingh City Corporation"
        ],
        "Municipality": []
      },

      "Jamalpur": {
        "Upazila": [
          "Dewanganj", "Baksiganj", "Islampur",
          "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Netrokona": {
        "Upazila": [
          "Atpara", "Barhatta", "Durgapur",
          "Kalmakanda", "Kendua", "Khaliajuri",
          "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"
        ],
        "City Corporation": [],
        "Municipality": []
      },

      "Sherpur": {
        "Upazila": [
          "Jhenaigati", "Nakla", "Nalitabari",
          "Sherpur Sadar", "Sreebardi"
        ],
        "City Corporation": [],
        "Municipality": []
      }
    }

  };


  // =====================================
  // 4. DIVISION / DISTRICT / AREA DROPDOWNS
  // =====================================

  const divisions = Object.keys(locationData);

  function fillSelect(select, values, placeholder) {

    select.innerHTML = `<option value="">${placeholder}</option>`;

    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function setupAddress(prefix) {

    const division = document.getElementById(prefix + "Division");
    const district = document.getElementById(prefix + "District");
    const areaType = document.getElementById(prefix + "AreaType");
    const upazila = document.getElementById(prefix + "Upazila");
    const union = document.getElementById(prefix + "Union");

    fillSelect(division, divisions, "Select Division");

    division.addEventListener("change", () => {

      const selectedDivision = division.value;

      const districts = selectedDivision
        ? Object.keys(locationData[selectedDivision])
        : [];

      fillSelect(district, districts, "Select District");
      fillSelect(upazila, [], "Select Area");
      fillSelect(union, [], "Select Union / Ward");

      areaType.value = "";
    });

    district.addEventListener("change", updateAreas);
    areaType.addEventListener("change", updateAreas);

    function updateAreas() {

      const d = division.value;
      const dis = district.value;
      const type = areaType.value;

      let areas = [];

      if (d && dis && type) {
        areas = locationData[d][dis][type] || [];
      }

      fillSelect(
        upazila,
        areas,
        type === "City Corporation"
          ? "Select City Corporation"
          : "Select Upazila"
      );

      fillSelect(union, [], "Select Union / Ward");
    }

    upazila.addEventListener("change", () => {
      // Union / Ward options can be populated
      // from a complete administrative dataset later.
      fillSelect(union, [], "Select Union / Ward");
    });
  }

  setupAddress("present");
  setupAddress("permanent");


  // =====================================
  // 5. SAME ADDRESS OPTION
  // =====================================

  const sameAddress = document.getElementById("sameAddress");
  const permanentSection = document.getElementById("permanentAddressSection");

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

      const present = document.getElementById("present" + field);
      const permanent = document.getElementById("permanent" + field);

      if (present && permanent) {
        permanent.value = present.value;
      }
    });
  }

  function updatePermanentAddress() {

    permanentSection.hidden = sameAddress.checked;

    addressFields.forEach(field => {

      const permanent = document.getElementById("permanent" + field);

      if (permanent) {
        permanent.disabled = sameAddress.checked;
        permanent.required = !sameAddress.checked &&
          ["Division", "District", "AreaType", "Upazila", "Address"].includes(field);
      }
    });

    if (sameAddress.checked) {
      copyPresentAddress();
    }
  }

  sameAddress.addEventListener("change", updatePermanentAddress);

  addressFields.forEach(field => {

    const present = document.getElementById("present" + field);

    if (present) {
      present.addEventListener("change", () => {
        if (sameAddress.checked) {
          copyPresentAddress();
        }
      });
    }
  });

  updatePermanentAddress();


  // =====================================
  // 6. PREVIEW INFORMATION
  // =====================================

  const previewBtn = document.getElementById("previewBtn");
  const editBtn = document.getElementById("editBtn");
  const previewSection = document.getElementById("previewSection");
  const previewContent = document.getElementById("previewContent");

  function getValue(id) {

    const field = document.getElementById(id);

    if (!field) return "";

    if (field.type === "radio") {
      const selected = document.querySelector(
        `input[name="${field.name}"]:checked`
      );
      return selected ? selected.value : "";
    }

    return field.value.trim();
  }

  function addPreview(label, value) {

    if (value) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");

      strong.textContent = label + ": ";

      p.appendChild(strong);
      p.appendChild(document.createTextNode(value));

      previewContent.appendChild(p);
    }
  }

  function createPreview() {

    previewContent.innerHTML = "";

    const fields = [
      ["Full Name", "fullName"],
      ["Name in Bangla", "nameBangla"],
      ["Father's Name", "fatherName"],
      ["Mother's Name", "motherName"],
      ["Date of Birth", "dateOfBirth"],
      ["Gender", "gender"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["Blood Group", "bloodGroup"],
      ["NID", "nid"]
    ];

    fields.forEach(([label, id]) => {
      addPreview(label, getValue(id));
    });

    addPreview("Service Status", getValue("serviceStatus"));

    const status = getValue("serviceStatus");

    let conditionalIds = [];

    if (status === "Currently Working") {
      conditionalIds = [
        ["Designation", "workingDesignation"],
        ["Department", "workingDepartment"],
        ["Subject", "workingSubject"],
        ["Other Department", "workingOther"],
        ["Joining Date", "joiningDate"]
      ];
    }

    if (status === "Retired") {
      conditionalIds = [
        ["Retirement Date", "retirementDate"],
        ["Last Designation", "retiredDesignation"],
        ["Last Department", "retiredDepartment"],
        ["Service Years", "retiredServiceYears"]
      ];
    }

    if (status === "Transferred") {
      conditionalIds = [
        ["Transfer Date", "transferDate"],
        ["Current Institution", "transferInstitution"],
        ["Current Designation", "transferDesignation"],
        ["Current Department", "transferDepartment"]
      ];
    }

    conditionalIds.forEach(([label, id]) => {
      addPreview(label, getValue(id));
    });

    addPreview("Present Division", getValue("presentDivision"));
    addPreview("Present District", getValue("presentDistrict"));
    addPreview("Present Area", getValue("presentUpazila"));
    addPreview("Present Union / Ward", getValue("presentUnion"));
    addPreview("Present Post Office", getValue("presentPostOffice"));
    addPreview("Present Post Code", getValue("presentPostCode"));
    addPreview("Present Address", getValue("presentAddress"));

    if (!sameAddress.checked) {
      addPreview("Permanent Division", getValue("permanentDivision"));
      addPreview("Permanent District", getValue("permanentDistrict"));
      addPreview("Permanent Area", getValue("permanentUpazila"));
      addPreview("Permanent Union / Ward", getValue("permanentUnion"));
      addPreview("Permanent Post Office", getValue("permanentPostOffice"));
      addPreview("Permanent Post Code", getValue("permanentPostCode"));
      addPreview("Permanent Address", getValue("permanentAddress"));
    } else {
      addPreview("Permanent Address", "Same as Present Address");
    }

    addPreview("Professional Status", getValue("professionalStatus"));
    addPreview("Current Workplace", getValue("currentWorkplace"));
    addPreview("Suggestions", getValue("suggestions"));

    previewSection.hidden = false;

    previewSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  previewBtn.addEventListener("click", () => {

    if (!form.reportValidity()) return;

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    createPreview();
  });

  editBtn.addEventListener("click", () => {

    previewSection.hidden = true;

    form.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });


  // =====================================
  // 7. PASSWORD VALIDATION
  // =====================================

  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  confirmPassword.addEventListener("input", () => {

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
      confirmPassword.setCustomValidity("");
    }
  });

  password.addEventListener("input", () => {
    confirmPassword.dispatchEvent(new Event("input"));
  });


  // =====================================
  // 8. FORM SUBMISSION
  // =====================================

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!form.reportValidity()) return;

    if (password.value !== confirmPassword.value) {
      alert("Password and Confirm Password do not match.");
      confirmPassword.focus();
      return;
    }

    alert(
      "Your information is valid!\n\n" +
      "The registration form is ready for Supabase integration."
    );

    // Supabase registration will be connected
    // in the next integration step.
  });


  // =====================================
  // 9. GOOGLE SIGN-IN PLACEHOLDER
  // =====================================

  document.getElementById("googleSignIn").addEventListener("click", () => {

    alert(
      "Google Sign-In will be activated after authentication configuration."
    );

  });

});
