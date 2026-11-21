
/* =====================================================
   DTSC ALUMNI ASSOCIATION
   STUDENT REGISTRATION SYSTEM
   File: register/students/student.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("studentRegistrationForm");
    if (!form) return;

    const totalSteps = 5;
    let currentStep = 1;

    const $ = (id) => document.getElementById(id);

    const steps = [...document.querySelectorAll(".form-step")];
    const indicators = [...document.querySelectorAll(".step-indicator")];

    const previousBtn = $("previousBtn");
    const nextBtn = $("nextBtn");
    const previewBtn = $("previewBtn");

    /* =========================================
       GENERAL HELPERS
    ========================================= */

    function showMessage(message, type = "error") {
        const box = $("formMessage");
        if (!box) return;

        box.textContent = message;
        box.hidden = false;
        box.className = `form-message ${type}`;

        box.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    function hideMessage() {
        const box = $("formMessage");
        if (box) box.hidden = true;
    }

    function fillSelect(select, items, firstText) {
        if (!select) return;

        select.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.textContent = firstText;
        select.appendChild(first);

        items.forEach(item => {
            const option = document.createElement("option");

            if (typeof item === "object") {
                option.value = item.value;
                option.textContent = item.label;
            } else {
                option.value = item;
                option.textContent = item;
            }

            select.appendChild(option);
        });
    }

    function setSectionEnabled(section, enabled) {
        if (!section) return;

        section.hidden = !enabled;

        section.querySelectorAll("input, select, textarea").forEach(field => {
            field.disabled = !enabled;
        });
    }

    /* =========================================
       STEP NAVIGATION
    ========================================= */

    function updateStep() {
        steps.forEach(step => {
            const active = Number(step.dataset.step) === currentStep;
            step.classList.toggle("active", active);
            step.hidden = !active;
        });

        indicators.forEach(indicator => {
            const number = Number(indicator.dataset.step);

            indicator.classList.toggle("active", number === currentStep);
            indicator.classList.toggle("completed", number < currentStep);
        });

        const percent = Math.round((currentStep / totalSteps) * 100);

        $("stepCounter").textContent =
            `Step ${currentStep} of ${totalSteps}`;

        $("progressPercent").textContent =
            `${percent}% Completed`;

        $("progressFill").style.width = `${percent}%`;

        previousBtn.hidden = currentStep === 1;
        nextBtn.hidden = currentStep === totalSteps;
        previewBtn.hidden = currentStep !== totalSteps;

        hideMessage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function validateCurrentStep() {
        const activeStep = steps.find(
            step => Number(step.dataset.step) === currentStep
        );

        if (!activeStep) return true;

        const fields = [
            ...activeStep.querySelectorAll(
                "input, select, textarea"
            )
        ];

        for (const field of fields) {
            if (
                field.disabled ||
                field.type === "file" ||
                field.type === "checkbox" ||
                field.type === "radio"
            ) continue;

            if (!field.checkValidity()) {
                field.reportValidity();
                field.focus();
                return false;
            }
        }

        // Academic step: at least one examination
        if (currentStep === 3) {
            const selected = form.querySelectorAll(
                'input[name="examinations"]:checked'
            );

            if (selected.length === 0) {
                showMessage(
                    "Please select at least one examination."
                );
                return false;
            }
        }

        // Current status is required
        if (currentStep === 4) {
            const status = form.querySelector(
                'input[name="currentStatus"]:checked'
            );

            if (!status) {
                showMessage(
                    "Please select your current status."
                );
                return false;
            }
        }

        // Password check
        if (currentStep === 5) {
            const password = $("accountPassword").value;
            const confirm = $("confirmPassword").value;

            if (password.length < 8) {
                showMessage(
                    "Password must contain at least 8 characters."
                );
                $("accountPassword").focus();
                return false;
            }

            if (password !== confirm) {
                showMessage("Passwords do not match.");
                $("confirmPassword").focus();
                return false;
            }

            if (!$("declaration").checked) {
                showMessage(
                    "Please accept the declaration before continuing."
                );
                return false;
            }
        }

        return true;
    }

    nextBtn.addEventListener("click", () => {
        if (!validateCurrentStep()) return;

        if (currentStep < totalSteps) {
            currentStep++;
            updateStep();
        }
    });

    previousBtn.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });

    /* =========================================
       DATE OF BIRTH
    ========================================= */

    const currentYear = new Date().getFullYear();

    fillSelect(
        $("birthDay"),
        Array.from({ length: 31 }, (_, i) =>
            String(i + 1).padStart(2, "0")
        ),
        "Day"
    );

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    fillSelect(
        $("birthMonth"),
        months.map((month, index) => ({
            value: String(index + 1).padStart(2, "0"),
            label: month
        })),
        "Month"
    );

    fillSelect(
        $("birthYear"),
        Array.from(
            { length: currentYear - 1940 + 1 },
            (_, i) => String(currentYear - i)
        ),
        "Year"
    );

    $("currentYear").textContent = currentYear;

    /* =========================================
       ACADEMIC YEAR DROPDOWNS
    ========================================= */

    document.querySelectorAll(".passing-year-select").forEach(select => {
        fillSelect(
            select,
            Array.from(
                { length: currentYear - 1966 + 1 },
                (_, i) => String(currentYear - i)
            ),
            "Select Year"
        );
    });

    document.querySelectorAll(".session-select").forEach(select => {
        const sessions = [];

        for (let year = 1966; year <= currentYear; year++) {
            sessions.push(`${year}-${String(year + 1).slice(-2)}`);
        }

        fillSelect(select, sessions, "Select Session");
    });

    /* =========================================
       PROFILE PHOTO PREVIEW
    ========================================= */

    $("profilePhoto").addEventListener("change", event => {
        const file = event.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            showMessage("Please select a JPG, PNG or WEBP image.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            showMessage("Photo size must not exceed 2 MB.");
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = e => {
            $("photoPreview").innerHTML = `
                <img
                    src="${e.target.result}"
                    alt="Student Photograph"
                    style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"
                >
            `;
        };

        reader.readAsDataURL(file);
        hideMessage();
    });

    /* =========================================
       ACADEMIC CONDITIONAL SECTIONS
    ========================================= */

    const academicSections = {
        JSC: $("jscSection"),
        SSC: $("sscSection"),
        HSC: $("hscSection"),
        Diploma: $("diplomaSection")
    };

    function updateAcademicSections() {
        const selected = [
            ...form.querySelectorAll(
                'input[name="examinations"]:checked'
            )
        ].map(input => input.value);

        Object.entries(academicSections).forEach(([name, section]) => {
            setSectionEnabled(
                section,
                selected.includes(name)
            );
        });
    }

    form.querySelectorAll(
        'input[name="examinations"]'
    ).forEach(input => {
        input.addEventListener("change", updateAcademicSections);
    });

    updateAcademicSections();

    /* =========================================
       CURRENT STATUS CONDITIONAL SECTIONS
    ========================================= */

    const higherStudiesSection = $("higherStudiesSection");
    const jobSection = $("jobSection");
    const othersSection = $("othersSection");

    function updateCurrentStatus() {
        const selected = form.querySelector(
            'input[name="currentStatus"]:checked'
        );

        const value = selected ? selected.value : "";

        setSectionEnabled(
            higherStudiesSection,
            value === "Higher Studies"
        );

        setSectionEnabled(
            jobSection,
            value === "Job Holder"
        );

        setSectionEnabled(
            othersSection,
            value === "Others" ||
            value === "Entrepreneur / Business"
        );

        const otherTitle = othersSection.querySelector("h4");
        const otherLabel = othersSection.querySelector("label");

        if (value === "Entrepreneur / Business") {
            otherTitle.textContent = "Business Information";
            otherLabel.textContent = "Business / Enterprise Details";
        } else {
            otherTitle.textContent = "Other Information";
            otherLabel.textContent = "Please describe your current status";
        }
    }

    form.querySelectorAll(
        'input[name="currentStatus"]'
    ).forEach(input => {
        input.addEventListener("change", updateCurrentStatus);
    });

    updateCurrentStatus();

    /* Employment type */
    $("employmentType").addEventListener("change", () => {
        const isPrivate = $("employmentType").value === "Private";

        const locationField = form.querySelector(
            '[name="jobLocation"]'
        );

        locationField.closest(".form-group").hidden = !isPrivate;
        locationField.disabled = !isPrivate;

        if (!isPrivate) locationField.value = "";
    });

    /* =========================================
       BANGLADESH DIVISION & DISTRICT DATA
    ========================================= */

    const locations = {
        "Barishal": [
            "Barguna", "Barishal", "Bhola", "Jhalokati",
            "Patuakhali", "Pirojpur"
        ],
        "Chattogram": [
            "Bandarban", "Brahmanbaria", "Chandpur",
            "Chattogram", "Cumilla", "Cox's Bazar",
            "Feni", "Khagrachhari", "Lakshmipur",
            "Noakhali", "Rangamati"
        ],
        "Dhaka": [
            "Dhaka", "Faridpur", "Gazipur", "Gopalganj",
            "Kishoreganj", "Madaripur", "Manikganj",
            "Munshiganj", "Narayanganj", "Narsingdi",
            "Rajbari", "Shariatpur", "Tangail"
        ],
        "Khulna": [
            "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah",
            "Khulna", "Kushtia", "Magura", "Meherpur",
            "Narail", "Satkhira"
        ],
        "Mymensingh": [
            "Jamalpur", "Mymensingh", "Netrokona", "Sherpur"
        ],
        "Rajshahi": [
            "Bogura", "Joypurhat", "Naogaon", "Natore",
            "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj"
        ],
        "Rangpur": [
            "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat",
            "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"
        ],
        "Sylhet": [
            "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"
        ]
    };

    const divisions = Object.keys(locations);

    ["present", "permanent"].forEach(prefix => {
        const divisionSelect = $(`${prefix}Division`);
        const districtSelect = $(`${prefix}District`);

        fillSelect(divisionSelect, divisions, "Select Division");

        divisionSelect.addEventListener("change", () => {
            const districts = locations[divisionSelect.value] || [];

            fillSelect(
                districtSelect,
                districts,
                "Select District"
            );

            districtSelect.disabled = districts.length === 0;

            const areaSelect = $(`${prefix}Area`);
            fillSelect(areaSelect, [], "Select Area");
            areaSelect.disabled = true;
        });
    });

    /* =========================================
       AREA TYPE & WARD
    ========================================= */

    ["present", "permanent"].forEach(prefix => {
        const typeSelect = $(`${prefix}AreaType`);
        const areaSelect = $(`${prefix}Area`);

        const wardGroup = $(`${prefix}WardGroup`);
        const unionGroup = $(`${prefix}UnionGroup`);

        const wardSelect = $(`${prefix}Ward`);
        const unionInput = $(`${prefix}Union`);

        const wardLabel = $(`${prefix}WardLabel`);

        function updateAreaType() {
            const type = typeSelect.value;

            const district = $(`${prefix}District`).value;

            setSectionEnabled(
                wardGroup,
                type === "city" || type === "municipality"
            );

            setSectionEnabled(
                unionGroup,
                type === "upazila"
            );

            wardLabel.textContent =
                type === "city"
                    ? "City Corporation Ward"
                    : "Municipality Ward";

            if (type === "city") {
                fillSelect(
                    wardSelect,
                    Array.from({ length: 99 }, (_, i) => String(i + 1)),
                    "Select Ward"
                );
            } else if (type === "municipality") {
                fillSelect(
                    wardSelect,
                    Array.from({ length: 15 }, (_, i) =>
                        String(i + 1).padStart(2, "0")
                    ),
                    "Select Ward"
                );
            } else {
                fillSelect(wardSelect, [], "Select Ward");
            }

            // Area names are entered through the option prompt.
            fillSelect(
                areaSelect,
                district ? ["Other / Enter Manually"] : [],
                "Select Area"
            );

            areaSelect.disabled = !district;

            if (district && type) {
                areaSelect.value = "Other / Enter Manually";
            }
        }

        typeSelect.addEventListener("change", updateAreaType);

        areaSelect.addEventListener("change", () => {
            if (areaSelect.value !== "Other / Enter Manually") return;

            const entered = prompt(
                "Enter your City Corporation, Municipality or Upazila name:"
            );

            if (entered && entered.trim()) {
                const option = document.createElement("option");
                option.value = entered.trim();
                option.textContent = entered.trim();

                areaSelect.appendChild(option);
                areaSelect.value = entered.trim();
            } else {
                areaSelect.value = "";
            }
        });

        $(`${prefix}District`).addEventListener("change", updateAreaType);
    });

    /* =========================================
       SAME PRESENT & PERMANENT ADDRESS
    ========================================= */

    const sameAddress = $("sameAddress");
    const permanentSection = $("permanentAddressSection");

    const addressFields = [
        "Division",
        "District",
        "AreaType",
        "Area",
        "Ward",
        "Union",
        "PostOffice",
        "PostCode",
        "Address"
    ];

    function copyPresentAddress() {
        addressFields.forEach(suffix => {
            const present = $(`present${suffix}`);
            const permanent = $(`permanent${suffix}`);

            if (!present || !permanent) return;

            if (present.tagName === "SELECT") {
                const value = present.value;

                if (
                    value &&
                    ![...permanent.options].some(option => option.value === value)
                ) {
                    const option = document.createElement("option");
                    option.value = value;
                    option.textContent = value;
                    permanent.appendChild(option);
                }

                permanent.value = value;
            } else {
                permanent.value = present.value;
            }
        });
    }

    sameAddress.addEventListener("change", () => {
        const checked = sameAddress.checked;

        permanentSection.hidden = checked;

        permanentSection.querySelectorAll(
            "input, select, textarea"
        ).forEach(field => {
            field.disabled = checked;
        });

        if (checked) copyPresentAddress();
    });

    form.querySelectorAll(
        '[id^="present"]'
    ).forEach(field => {
        field.addEventListener("change", () => {
            if (sameAddress.checked) copyPresentAddress();
        });

        field.addEventListener("input", () => {
            if (sameAddress.checked) copyPresentAddress();
        });
    });

    /* =========================================
       APPLICATION PREVIEW
    ========================================= */

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function getFieldLabel(field) {
        const group = field.closest(".form-group");

        if (!group) return field.name || field.id;

        const label = group.querySelector("label");

        return label
            ? label.textContent.replace("*", "").trim()
            : field.name;
    }

    function buildPreview() {
        const content = $("previewContent");
        const sections = [...form.querySelectorAll(".form-step")];

        let html = "";

        sections.forEach(section => {
            const heading = section.querySelector(".section-heading h3");

            html += `<div class="preview-section">
                <h4>${escapeHTML(heading?.textContent || "Information")}</h4>
                <div class="preview-grid">`;

            const fields = section.querySelectorAll(
                "input, select, textarea"
            );

            fields.forEach(field => {
                if (
                    field.disabled ||
                    field.type === "password" ||
                    field.type === "file" ||
                    field.type === "submit" ||
                    field.type === "button" ||
                    field.type === "checkbox" ||
                    field.type === "radio"
                ) return;

                if (field.closest("[hidden]")) return;

                let value = field.value;

                if (!value) return;

                if (field.tagName === "SELECT") {
                    value = field.options[field.selectedIndex]?.text || value;
                }

                html += `
                    <div class="preview-item">
                        <small>${escapeHTML(getFieldLabel(field))}</small>
                        <strong>${escapeHTML(value)}</strong>
                    </div>
                `;
            });

            const checked = section.querySelectorAll(
                'input[type="checkbox"]:checked, input[type="radio"]:checked'
            );

            checked.forEach(field => {
                if (field.name === "declaration") return;

                const label = field.closest("label");
                const text = label?.innerText || field.value;

                html += `
                    <div class="preview-item">
                        <small>${escapeHTML(field.name)}</small>
                        <strong>${escapeHTML(text.trim())}</strong>
                    </div>
                `;
            });

            html += `</div></div>`;
        });

        const photo = $("profilePhoto").files[0];

        if (photo) {
            const imageURL = URL.createObjectURL(photo);

            html = `
                <div class="preview-photo">
                    <img
                        src="${imageURL}"
                        alt="Student Photo"
                        style="width:110px;height:130px;object-fit:cover;border-radius:8px;"
                    >
                </div>
            ` + html;
        }

        content.innerHTML = html;
    }

    previewBtn.addEventListener("click", () => {
        if (!validateCurrentStep()) return;

        buildPreview();

        $("previewModal").hidden = false;

        document.body.style.overflow = "hidden";
    });

    function closePreview() {
        $("previewModal").hidden = true;
        document.body.style.overflow = "";
    }

    $("closePreview").addEventListener("click", closePreview);

    $("editApplication").addEventListener("click", () => {
        closePreview();
        currentStep = 1;
        updateStep();
    });

    $("previewModal").addEventListener("click", event => {
        if (event.target === $("previewModal")) {
            closePreview();
        }
    });

    /* =========================================
       FINAL SUBMISSION PLACEHOLDER
       Supabase integration will be added next.
    ========================================= */

    $("finalSubmitBtn").addEventListener("click", () => {
        showMessage(
            "Your form preview is ready. Online registration is not connected yet. Supabase integration is the next step.",
            "error"
        );

        closePreview();
    });

    /* =========================================
       INITIALIZE
    ========================================= */

    updateStep();

    setSectionEnabled($("permanentAddressSection"), true);

    console.log(
        "DTSC Student Registration Form initialized successfully."
    );

});
