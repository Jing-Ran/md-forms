(function() {
    var validator = {},
        nameInputs = document.getElementsByClassName("name"),
        requiredAddrInputs = document.getElementsByClassName("address-rq"),
        optionalAddrInputs = document.getElementsByClassName("address-op"),
        cityInputs = document.getElementsByClassName("city-input"),
        emailInputs = document.getElementsByClassName("email-input"),
        phoneInputs = document.getElementsByClassName("phone-input"),
        shipBillForm = document.getElementById("ship-bill"),
        firstName = document.getElementById("fname"),
        lastName = document.getElementById("lname"),
        addressOne = document.getElementById("address1"),
        addressTwo = document.getElementById("address2"),
        city = document.getElementById("city"),
        stateOptions = document.querySelectorAll("select#state option"),
        stateBox = document.getElementById("state"),
        emailAddress = document.getElementById("email"),
        phoneNum = document.getElementById("phone"),
        checkBox = document.getElementById("checkbox-toggle"),
        spFirstNm = document.getElementById("sp-fname"),
        spLastNm = document.getElementById("sp-lname"),
        spAddressOne = document.getElementById("sp-address1"),
        spAddressTwo = document.getElementById("sp-address2"),
        spCity = document.getElementById("sp-city"),
        spStateOptions = document.querySelectorAll("#sp-state option"),
        spStateBox = document.getElementById("sp-state"),
        spEmail = document.getElementById("sp-email"),
        spPhone = document.getElementById("sp-phone"),
        i;

    validator.isTrimmed = function(input) {
        var arr;
        if (!input) return false;
        if (typeof input !== "string") return false;

        arr = input.split(" ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "") return false;
        }
        return true;
    };

    // Name validation
    validator.isName = function(name) {
        if (!name) return false;
        if (validator.isTrimmed(name)) {
            if (name.length >= 2) {
                for (var i = 0; i < name.length; i++) {
                    if (name.charCodeAt(i) >= 48 && name.charCodeAt(i) <= 57) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };

    // Address1 and city validation
    validator.isMoreThanOne = function(input) {
        if (validator.isTrimmed(input)) {
            if (input.length > 1) {
                return true;
            }
        }
        return false;
    };

    // Address2 validation
    validator.isNotEmpty = function(input) {
        if (validator.isTrimmed(input)) {
            if (input !== "") {
                return true;
            }
        }
        return false;
    };

    // State checkbox validation
    validator.isSelected = function(options) {
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled && options[i].selected)
                return true;
        }
        return false;
    };

    // Email validation
    validator.isEmail = function(email) {
        var local,
            domain,
            localSplit,
            domainSplit;

        if (!email) return false;
        if (email.indexOf(" ") !== -1) return false;

        if (email.indexOf("@") === -1 ||
            email.indexOf("@") !== email.lastIndexOf("@")) return false;

        local = email.split("@")[0];
        domain = email.split("@")[1];
        localSplit = local.split(".");
        domainSplit = domain.split(".");

        if (local === "") return false;
        for (var i = 0; i < localSplit.length; i++) {
            if (localSplit[i] === "")
                return false;
        }

        if (domain === "") return false;
        if (domain.indexOf("_") !== -1) return false;
        if (domain.indexOf("-") === 0 || 
            domain.lastIndexOf("-") === domain.length - 1) return false;
        if (domainSplit.length < 2) return false;
        for (var j = 0; j < domainSplit.length; j++) {
            if (domainSplit[j] === "") return false;
            if (domainSplit[domainSplit.length - 1].length < 2) return false;
        }
        return true;
    };

    // Phone number validation
    validator.isPhoneNum = function(input) {
        var inputArr = [];

        if (input.indexOf(" ") === -1) {
            if (input.length === 12 && input.indexOf("-") === 3 &&
                input.lastIndexOf("-") === 7)
                inputArr = input.split("-");

            if (inputArr.length === 3) {
                for (var i = 0; i < 3; i++) {
                    if (isNaN(inputArr[i]) || inputArr[i] % 1 !== 0) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };

    function addCustomeValidity(elements, funcNm, invalidMsg) {
        for (i = 0; i < elements.length; i++) {
            elements[i].addEventListener("keyup", function() {
                if (!validator[funcNm](this.value)) {
                    this.setCustomValidity(invalidMsg);
                    this.classList.add("invalid");
                } else {
                    this.setCustomValidity("");
                    this.classList.remove("invalid");
                }
            });
        }
    }

    addCustomeValidity(nameInputs, "isName", "Invalid name input");
    addCustomeValidity(requiredAddrInputs, "isMoreThanOne", "Invalid address input");
    addCustomeValidity(cityInputs, "isMoreThanOne", "Invalid city input");
    addCustomeValidity(emailInputs, "isEmail", "Invalid email address");

    for (i = 0; i < optionalAddrInputs.length; i++) {
        if (optionalAddrInputs[i].value !== "") {
            addCustomeValidity(optionalAddrInputs, "isNotEmpty", "Invalid address");
        }
    }

    for (i = 0; i < phoneInputs.length; i++) {
        if (phoneInputs[i].value !== "") {
            addCustomeValidity(phoneInputs, "isPhoneNum", "Invalid phone number");
        }
    }
    

    shipBillForm.addEventListener("submit", function(e) {
        e.preventDefault();

        //billing info validation check
        if (!validator.isSelected(stateOptions)) {
            stateBox.classList.add("invalid");
        } else {
            stateBox.classList.remove("invalid");
        }

        //shipping info validation check
        // if (!checkBox.checked) {
        //     if (!validator.isName(spFirstNm.value)) {
        //         spFirstNm.classList.add("invalid");
        //     } else {
        //         spFirstNm.classList.remove("invalid");
        //     }

        //     if (!validator.isName(spLastNm.value)) {
        //         spLastNm.classList.add("invalid");
        //     } else {
        //         spLastNm.classList.remove("invalid");
        //     }

        //     if (!validator.isMoreThanOne(spAddressOne.value)) {
        //         spAddressOne.classList.add("invalid");
        //     } else {
        //         spAddressOne.classList.remove("invalid");
        //     }

        //     if (spAddressTwo.value !== "") {
        //         if (!validator.isNotEmpty(spAddressTwo.value)) {
        //             spAddressTwo.classList.add("invalid");
        //         } else {
        //             spAddressTwo.classList.remove("invalid");
        //         }
        //     }

        //     if (!validator.isMoreThanOne(spCity.value)) {
        //         spCity.classList.add("invalid");
        //     } else {
        //         spCity.classList.remove("invalid");
        //     }

        //     if (!validator.isSelected(spStateOptions)) {
        //         spStateBox.classList.add("invalid");
        //     } else {
        //         spStateBox.classList.remove("invalid");
        //     }

        //     if (!validator.isEmail(spEmail.value)) {
        //         spEmail.classList.add("invalid");
        //     } else {
        //         spEmail.classList.remove("invalid");
        //     }

        //     if (spPhone.value !== "") {
        //         if (!validator.isPhoneNum(spPhone.value)) {
        //             spPhone.classList.add("invalid");
        //         } else {
        //             spPhone.classList.remove("invalid");
        //         }
        //     }
        // }
    });
})();