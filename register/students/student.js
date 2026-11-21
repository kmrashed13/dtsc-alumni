
document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);

    const currentYear = new Date().getFullYear();

    // =====================================
    // 1. COMMON DROPDOWN FUNCTIONS
    // =====================================

    function addOption(select, value, label) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
    }

    function fillYears(selectId, startYear, endYear) {
        const select = $(selectId);
        if (!select) return;

        select.innerHTML = '<option value="">Select Year</option>';

        for (let year = startYear; year <= endYear; year++) {
            addOption(select, String(year), String(year));
        }
    }

    // Date of birth
    for (let day = 1; day <= 31; day++) {
        addOption($("birthDay"), String(day), String(day));
    }

    fillYears("birthYear", 1940, currentYear);

    // Passing years
    ["jscPassingYear", "sscPassingYear", "hscPassingYear"].forEach(id => {
        fillYears(id, 1966, currentYear);
    });

    // Session: 1966-67 through next calendar year
    function fillSessions(selectId) {
        const select = $(selectId);
        if (!select) return;

        select.innerHTML = '<option value="">Select Session</option>';

        for (let year = 1966; year <= currentYear + 1; year++) {
            const nextYear = String(year + 1).slice(-2);
            const session = `${year}-${nextYear}`;
            addOption(select, session, session);
        }
    }

    ["jscSession", "sscSession", "hscSession"].forEach(fillSessions);


    // =====================================
    // 2. CONDITIONAL SECTION HANDLER
    // =====================================

    function toggleSection(sectionId, show) {
        const section = $(sectionId);
        if (!section) return;

        section.hidden = !show;

        section.querySelectorAll("input, select, textarea").forEach(field => {
            field.disabled = !show;
            field.required = show &&
                field.dataset.required === "true";

            if (!show) {
                field.value = "";
            }
        });
    }

    // Mark required fields in conditional sections
    document.querySelectorAll(
        "#jscFields, #sscFields, #hscFields, #diplomaFields, " +
        "#higherStudiesFields, #jobFields, #businessFields, #otherStatusFields"
    ).forEach(section => {
        section.querySelectorAll("input, select, textarea").forEach(field => {
            if (field.hasAttribute("required")) {
                field.dataset.required = "true";
                field.required = false;
            }
        });
    });


    // Academic conditional sections
    const examRules = [
        ["examJSC", "jscFields"],
        ["examSSC", "sscFields"],
        ["examHSC", "hscFields"],
        ["examDiploma", "diplomaFields"]
    ];

    examRules.forEach(([checkboxId, sectionId]) => {
        $(checkboxId).addEventListener("change", function () {
            toggleSection(sectionId, this.checked);
        });
    });


    // Current status conditional sections
    const statusRules = [
        ["statusHigher", "higherStudiesFields"],
        ["statusJob", "jobFields"],
        ["statusBusiness", "businessFields"],
        ["statusOthers", "otherStatusFields"]
    ];

    statusRules.forEach(([checkboxId, sectionId]) => {
        $(checkboxId).addEventListener("change", function () {
            toggleSection(sectionId, this.checked);
        });
    });


    // =====================================
    // 3. JOB TYPE LABEL
    // =====================================

    $("jobType").addEventListener("change", function () {

        const organizationLabel = document.querySelector(
            'label[for="jobOrganization"]'
        );

        const label = $("jobOrganization")
            .closest(".form-group")
            .querySelector("label");

        if (this.value === "Government Service") {
            label.textContent = "Organization Name *";
        } else if (this.value === "Private") {
            label.textContent = "Organization / Company *";
        } else {
            label.textContent = "Organization / Company *";
        }
    });


    // =====================================
    // 4. BANGLADESH ADDRESS DATA
    // =====================================

    const ADDRESS_DATA_URL =
        "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

    let bangladeshData = [];

    const cityCorporations = {
        "dhaka": [
            "Dhaka North City Corporation",
            "Dhaka South City Corporation"
        ],
        "chattogram": ["Chattogram City Corporation"],
        "chittagong": ["Chattogram City Corporation"],
        "khulna": ["Khulna City Corporation"],
        "rajshahi": ["Rajshahi City Corporation"],
        "barishal": ["Barishal City Corporation"],
        "barisal": ["Barishal City Corporation"],
        "sylhet": ["Sylhet City Corporation"],
        "rangpur": ["Rangpur City Corporation"],
        "gazipur": ["Gazipur City Corporation"],
        "narayanganj": ["Narayanganj City Corporation"],
        "cumilla": ["Cumilla City Corporation"],
        "comilla": ["Cumilla City Corporation"],
        "mymensingh": ["Mymensingh City Corporation"]
    };

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function getName(item) {
        return item.bn_name
            ? `${item.bn_name} (${item.name})`
            : item.name;
    }

    function resetSelect(select, placeholder) {
        select.innerHTML = "";
        addOption(select, "", placeholder);
    }

    function findDivision(value) {
        return bangladeshData.find(item =>
            item.name === value
        );
    }

    function findDistrict(division, value) {
        if (!division) return null;

        return (division.districts || []).find(item =>
            item.name === value
        );
    }


    // =====================================
    // 5. ADDRESS CASCADING DROPDOWNS
    // =====================================

    function setupAddress(prefix) {

        const divisionSelect = $(prefix + "Division");
        const districtSelect = $(prefix + "District");
        const areaTypeSelect = $(prefix + "AreaType");
        const areaSelect = $(prefix + "Area");

        const unionGroup = $(prefix + "UnionGroup");

        if (!divisionSelect) return;

        function populateDivisions() {
            resetSelect(divisionSelect, "Select Division");

            bangladeshData.forEach(division => {
                addOption(
                    divisionSelect,
                    division.name,
                    getName(division)
                );
            });
        }

        divisionSelect.addEventListener("change", () => {

            resetSelect(districtSelect, "Select District");
            resetSelect(areaSelect, "Select Area");

            areaTypeSelect.value = "";
            unionGroup.hidden = true;

            const division = findDivision(divisionSelect.value);

            if (!division) return;

            (division.districts || []).forEach(district => {
                addOption(
                    districtSelect,
                    district.name,
                    getName(district)
                );
            });
        });


        districtSelect.addEventListener("change", () => {

            resetSelect(areaSelect, "Select Area");
            areaTypeSelect.value = "";
            unionGroup.hidden = true;

        });


        areaTypeSelect.addEventListener("change", () => {

            resetSelect(areaSelect, "Select Area");
            unionGroup.hidden = true;

            const division = findDivision(divisionSelect.value);
            const district = findDistrict(
                division,
                districtSelect.value
            );

            if (!district) return;

            if (areaTypeSelect.value === "upazila") {

                (district.upazilas || []).forEach(upazila => {
                    addOption(
                        areaSelect,
                        upazila.name,
                        getName(upazila)
                    );
                });

                unionGroup.hidden = false;

            } else if (areaTypeSelect.value === "city") {

                const districtKey = normalize(district.name);
                const cities = cityCorporations[districtKey] || [];

                cities.forEach(city => {
                    addOption(areaSelect, city, city);
                });

                if (cities.length === 0) {
                    addOption(
                        areaSelect,
                        "",
                        "No City Corporation listed for this district"
                    );
                }
            }
        });

        areaSelect.addEventListener("change", () => {

            if (areaTypeSelect.value !== "upazila") return;

            const division = findDivision(divisionSelect.value);
            const district = findDistrict(
                division,
                districtSelect.value
            );

            const upazila = (district?.upazilas || []).find(item =>
                item.name === areaSelect.value
            );

            const unionInput = $(prefix + "Union");

            if (!unionInput || !upazila) return;

            // Keep union/municipality as a user-entered field.
            unionInput.placeholder = "Enter Union / Municipality";
        });

        populateDivisions();
    }


    // Load Bangladesh location dataset
    async function loadAddressData() {

        const message = document.createElement("p");
        message.className = "address-data-message";
        message.textContent = "Loading Bangladesh location data...";

        const presentSection = $("presentDivision")
            .closest(".form-section");

        presentSection.appendChild(message);

        try {

            const response = await fetch(ADDRESS_DATA_URL);

            if (!response.ok) {
                throw new Error("Could not load address data");
            }

            bangladeshData = await response.json();

            setupAddress("present");
            setupAddress("permanent");

            message.textContent = "Bangladesh location data loaded.";
            message.style.color = "#198754";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Address data could not be loaded. Please check your internet connection.";

            message.style.color = "#dc3545";
        }
    }

    loadAddressData();


    // =====================================
    // 6. SAME PRESENT & PERMANENT ADDRESS
    // =====================================

    const sameAddress = $("sameAddress");
    const permanentFields = $("permanentAddressFields");

    function copyPresentAddress() {

        const fields = [
            "Division",
            "District",
            "AreaType",
            "Area",
            "Union",
            "PostOffice",
            "PostCode",
            "Address"
        ];

        fields.forEach(field => {
            const present = $("present" + field);
            const permanent = $("permanent" + field);

            if (present && permanent) {
                permanent.value = present.value;
            }
        });
    }

    sameAddress.addEventListener("change", function () {

        const same = this.checked;

        permanentFields.hidden = same;

        permanentFields.querySelectorAll(
            "input, select, textarea"
        ).forEach(field => {
            field.disabled = same;
            field.required = !same &&
                field.dataset.required === "true";
        });

        if (same) {
            copyPresentAddress();
        }
    });

    document.querySelectorAll(
        "#presentDivision, #presentDistrict, #presentAreaType, " +
        "#presentArea, #presentUnion, #presentPostOffice, " +
        "#presentPostCode, #presentAddress"
    ).forEach(field => {
        field.addEventListener("change", () => {
            if (sameAddress.checked) {
                copyPresentAddress();
            }
        });

        field.addEventListener("input", () => {
            if (sameAddress.checked) {
                copyPresentAddress();
            }
        });
    });


    // =====================================
    // 7. PHOTO PREVIEW
    // =====================================

    $("studentPhoto").addEventListener("change", function () {

        const file = this.files[0];
        const preview = $("photoPreview");

        preview.innerHTML = "";

        if (!file) {
            preview.textContent = "Photo Preview";
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            this.value = "";
            preview.textContent = "Photo Preview";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Photo size must be 2MB or less.");
            this.value = "";
            preview.textContent = "Photo Preview";
            return;
        }

        const image = document.createElement("img");
        image.alt = "Student Photo Preview";

        const reader = new FileReader();

        reader.onload = event => {
            image.src = event.target.result;
        };

        reader.readAsDataURL(file);

        preview.appendChild(image);
    });


    // =====================================
    // 8. PASSWORD VALIDATION
    // =====================================

    function validatePassword() {

        const password = $("password").value;
        const confirmPassword = $("confirmPassword").value;

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            $("password").focus();
            return false;
        }

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            $("confirmPassword").focus();
            return false;
        }

        return true;
    }


    // =====================================
    // 9. PREVIEW
    // =====================================

    $("previewBtn").addEventListener("click", () => {

        const preview = $("previewArea");

        const name = $("fullName").value || "Not provided";
        const father = $("fatherName").value || "Not provided";
        const mother = $("motherName").value || "Not provided";

        const selectedExams = examRules
            .filter(([id]) => $(id).checked)
            .map(([id]) => $(id).value);

        const selectedStatuses = statusRules
            .filter(([id]) => $(id).checked)
            .map(([id]) => $(id).nextSibling?.textContent?.trim() || id);

        preview.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Registration Preview";

        const details = document.createElement("div");

        const rows = [
            ["Name", name],
            ["Father Name", father],
            ["Mother Name", mother],
            ["Contact", $("mobile").value || "Not provided"],
            ["Email", $("email").value || "Not provided"],
            ["Blood Group", $("bloodGroup").value || "Not selected"],
            ["Examinations", selectedExams.join(", ") || "Not selected"],
            ["Current Status", selectedStatuses.join(", ") || "Not selected"]
        ];

        rows.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = label + ": ";
            paragraph.appendChild(strong);
            paragraph.appendChild(document.createTextNode(value));

            details.appendChild(paragraph);
        });

        preview.appendChild(heading);
        preview.appendChild(details);
        preview.hidden = false;

        preview.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });


    // =====================================
    // 10. GOOGLE SIGN-IN PLACEHOLDER
    // =====================================

    $("googleSignIn").addEventListener("click", () => {
        alert(
            "Google Sign-in is not connected yet. " +
            "Google OAuth configuration will be added in the authentication step."
        );
    });


    // =====================================
    // 11. RESET FORM
    // =====================================

    $("studentRegistrationForm").addEventListener("reset", () => {

        setTimeout(() => {

            examRules.forEach(([checkboxId, sectionId]) => {
                $(checkboxId).checked = false;
                toggleSection(sectionId, false);
            });

            statusRules.forEach(([checkboxId, sectionId]) => {
                $(checkboxId).checked = false;
                toggleSection(sectionId, false);
            });

            sameAddress.checked = false;
            permanentFields.hidden = false;

            permanentFields.querySelectorAll(
                "input, select, textarea"
            ).forEach(field => {
                field.disabled = false;
            });

            $("photoPreview").textContent = "Photo Preview";
            $("previewArea").hidden = true;
            $("previewArea").innerHTML = "";

            $("presentUnionGroup").hidden = true;
            $("permanentUnionGroup").hidden = true;

        }, 0);
    });


    // =====================================
    // 12. REGISTER BUTTON
    // =====================================

    $("studentRegistrationForm").addEventListener("submit", event => {

        event.preventDefault();

        if (sameAddress.checked) {
            copyPresentAddress();
        }

        const selectedExam = examRules.some(([id]) => $(id).checked);

        if (!selectedExam) {
            alert("Please select at least one examination.");
            $("examJSC").focus();
            return;
        }

        if (!$("accountEmail").value.trim()) {
            alert("Please enter your E-mail or Mobile number.");
            $("accountEmail").focus();
            return;
        }

        if (!$("googleSignIn").dataset.authenticated) {
            if (!validatePassword()) return;
        }

        alert(
            "Your form has passed the front-end validation. " +
            "Database registration is not connected yet."
        );
    });

});
