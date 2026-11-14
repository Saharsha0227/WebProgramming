/* ==========================================================================
   Lab 8 – User Information Form
   JavaScript: Form Validation, LocalStorage Handling & Display
   Pure Vanilla JavaScript (No Frameworks/Libraries)
   ========================================================================== */

// Execute code after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------------------------
    // 1. REGISTRATION FORM LOGIC (Runs on index.html)
    // ----------------------------------------------------------------------
    const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        // Input Element References
        const fullNameInput = document.getElementById("fullName");
        const mobileInput = document.getElementById("mobile");
        const emailInput = document.getElementById("email");
        const cityInput = document.getElementById("city");
        const stateInput = document.getElementById("state");
        const countrySelect = document.getElementById("country");

        // Error Message Element References
        const nameError = document.getElementById("nameError");
        const genderError = document.getElementById("genderError");
        const mobileError = document.getElementById("mobileError");
        const emailError = document.getElementById("emailError");
        const cityError = document.getElementById("cityError");
        const stateError = document.getElementById("stateError");
        const countryError = document.getElementById("countryError");

        // Helper Function: Set error message and red border
        function setError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            if (inputElement) {
                inputElement.classList.add("input-error");
            }
        }

        // Helper Function: Clear individual field error
        function clearError(inputElement, errorElement) {
            errorElement.textContent = "";
            if (inputElement) {
                inputElement.classList.remove("input-error");
            }
        }

        // Helper Function: Clear all form errors
        function clearAllErrors() {
            clearError(fullNameInput, nameError);
            clearError(null, genderError);
            clearError(mobileInput, mobileError);
            clearError(emailInput, emailError);
            clearError(cityInput, cityError);
            clearError(stateInput, stateError);
            clearError(countrySelect, countryError);
        }

        // Real-time cleanup when user types or changes input
        fullNameInput.addEventListener("input", function () {
            if (fullNameInput.value.trim() !== "") {
                clearError(fullNameInput, nameError);
            }
        });

        mobileInput.addEventListener("input", function () {
            // Only allow digits to be typed
            mobileInput.value = mobileInput.value.replace(/\D/g, "");
            if (/^\d{10}$/.test(mobileInput.value.trim())) {
                clearError(mobileInput, mobileError);
            }
        });

        emailInput.addEventListener("input", function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value.trim())) {
                clearError(emailInput, emailError);
            }
        });

        cityInput.addEventListener("input", function () {
            if (cityInput.value.trim() !== "") {
                clearError(cityInput, cityError);
            }
        });

        stateInput.addEventListener("input", function () {
            if (stateInput.value.trim() !== "") {
                clearError(stateInput, stateError);
            }
        });

        countrySelect.addEventListener("change", function () {
            if (countrySelect.value !== "") {
                clearError(countrySelect, countryError);
            }
        });

        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(function (radio) {
            radio.addEventListener("change", function () {
                clearError(null, genderError);
            });
        });

        // Form Submit Handler
        registrationForm.addEventListener("submit", function (event) {
            // Prevent default HTML form submission (page refresh)
            event.preventDefault();

            // Clear previous errors before re-validating
            clearAllErrors();

            let isValid = true;

            // 1. Validate Full Name
            const fullNameValue = fullNameInput.value.trim();
            if (fullNameValue === "") {
                setError(fullNameInput, nameError, "Please enter your full name.");
                isValid = false;
            } else if (fullNameValue.length < 3) {
                setError(fullNameInput, nameError, "Name must be at least 3 characters long.");
                isValid = false;
            }

            // 2. Validate Gender Selection
            const selectedGender = document.querySelector('input[name="gender"]:checked');
            let genderValue = "";
            if (!selectedGender) {
                setError(null, genderError, "Please select your gender.");
                isValid = false;
            } else {
                genderValue = selectedGender.value;
            }

            // 3. Validate Mobile Number (Exactly 10 digits)
            const mobileValue = mobileInput.value.trim();
            const mobileRegex = /^[0-9]{10}$/;
            if (mobileValue === "") {
                setError(mobileInput, mobileError, "Please enter your mobile number.");
                isValid = false;
            } else if (!mobileRegex.test(mobileValue)) {
                setError(mobileInput, mobileError, "Mobile number must contain exactly 10 digits.");
                isValid = false;
            }

            // 4. Validate Email Address Format
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === "") {
                setError(emailInput, emailError, "Please enter your email address.");
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                setError(emailInput, emailError, "Please enter a valid email address (e.g., user@example.com).");
                isValid = false;
            }

            // 5. Validate City
            const cityValue = cityInput.value.trim();
            if (cityValue === "") {
                setError(cityInput, cityError, "Please enter your city.");
                isValid = false;
            }

            // 6. Validate State
            const stateValue = stateInput.value.trim();
            if (stateValue === "") {
                setError(stateInput, stateError, "Please enter your state.");
                isValid = false;
            }

            // 7. Validate Country Dropdown
            const countryValue = countrySelect.value;
            if (countryValue === "") {
                setError(countrySelect, countryError, "Please select your country.");
                isValid = false;
            }

            // If any validation check failed, stop here
            if (!isValid) {
                return;
            }

            // Store validated data in browser localStorage
            localStorage.setItem("name", fullNameValue);
            localStorage.setItem("gender", genderValue);
            localStorage.setItem("mobile", mobileValue);
            localStorage.setItem("email", emailValue);
            localStorage.setItem("city", cityValue);
            localStorage.setItem("state", stateValue);
            localStorage.setItem("country", countryValue);

            // Redirect user to the display page
            window.location.href = "display.html";
        });

        // Form Reset Handler
        registrationForm.addEventListener("reset", function () {
            // Clear all validation errors and styling on reset
            clearAllErrors();
        });
    }

    // ----------------------------------------------------------------------
    // 2. DISPLAY PAGE LOGIC (Runs on display.html)
    // ----------------------------------------------------------------------
    const userTable = document.getElementById("userTable");

    if (userTable) {
        const noDataMessage = document.getElementById("noDataMessage");
        const tableContainer = document.getElementById("tableContainer");
        const backBtn = document.getElementById("backBtn");
        const clearBtn = document.getElementById("clearBtn");

        // Retrieve stored data from localStorage
        const storedName = localStorage.getItem("name");
        const storedGender = localStorage.getItem("gender");
        const storedMobile = localStorage.getItem("mobile");
        const storedEmail = localStorage.getItem("email");
        const storedCity = localStorage.getItem("city");
        const storedState = localStorage.getItem("state");
        const storedCountry = localStorage.getItem("country");

        // Check if user information exists
        if (!storedName || !storedMobile || !storedEmail) {
            // No data found: show alert message and hide table
            noDataMessage.style.display = "block";
            tableContainer.style.display = "none";
            clearBtn.style.display = "none"; // Hide clear button if nothing to clear
        } else {
            // Data found: safely display user information using textContent
            noDataMessage.style.display = "none";
            tableContainer.style.display = "block";
            clearBtn.style.display = "inline-block";

            document.getElementById("displayName").textContent = storedName;
            document.getElementById("displayGender").textContent = storedGender;
            document.getElementById("displayMobile").textContent = storedMobile;
            document.getElementById("displayEmail").textContent = storedEmail;
            document.getElementById("displayCity").textContent = storedCity;
            document.getElementById("displayState").textContent = storedState;
            document.getElementById("displayCountry").textContent = storedCountry;
        }

        // "BACK TO FORM" Button Handler
        backBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });

        // "CLEAR INFORMATION" Button Handler
        clearBtn.addEventListener("click", function () {
            // Remove user details from localStorage
            localStorage.removeItem("name");
            localStorage.removeItem("gender");
            localStorage.removeItem("mobile");
            localStorage.removeItem("email");
            localStorage.removeItem("city");
            localStorage.removeItem("state");
            localStorage.removeItem("country");

            // Update UI to show empty state message
            tableContainer.style.display = "none";
            clearBtn.style.display = "none";
            noDataMessage.style.display = "block";
            noDataMessage.textContent = "Stored user information has been cleared. Please register again.";
        });
    }

});

