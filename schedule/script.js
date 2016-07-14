(function() {
    var validator = {},
        scheduleForm = document.getElementById("schedule-form"),
        invalidMessage = document.getElementById("invalidSchedule"),
        dateInput = document.getElementById("date"),
        startTime = document.getElementById("start-tm"),
        endTime = document.getElementById("end-tm"),
        timezoneInput = document.querySelectorAll("#tz option"),
        timezoneBox = document.querySelector("select"),
        chosenTz,
        scheduledDate,
        todayDate = new Date();
        fullName = document.getElementById("fname"),
        phoneNumber = document.getElementById("contact"),
        emailAddress = document.getElementById("email"),
        message = document.getElementById("message");

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
    
    // Date validation
    validator.isDate = function(date) {
        var dateArr;

        if (!date) return false;
        if (date.length !== 10) return false;
        if (date.indexOf(" ") !== -1) return false;

        dateArr = date.split("-");
        if (dateArr.length !== 3) {
            return false;
        } else {
            if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2]))
                return false;
            if (dateArr[0].length !== 4 || dateArr[1].length !== 2 ||
                dateArr[2].length !== 2)
                return false;
            if (dateArr[1] < 1 || dateArr[1] > 12) return false;
            if (dateArr[1] === "02") {
                if (dateArr[2] < 1 || dateArr[2] > 29) return false;
            } else {
                if (dateArr[2] < 1 || dateArr[2] > 31) return false;
            }
        }
        return true;
    };

    // Time validation
    validator.isTime = function(time) {
      if (!time) return false;
      return true;
    };

    // Timezone validation
    validator.isSelected = function(options) {
        var option;
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled && options[i].selected) {
                option = options[i].innerHTML;
                chosenTz = option.substring(0, option.indexOf(")") + 1);
                return true;
            }
        }
        return false;
    };

    // If start date is later then today date
    validator.isAfterToday = function(input) {
        if (input < todayDate) return false;
        return true;
    }

    // Full name validation
    validator.isName = function(name) {
        var nameArr;
        if (validator.isTrimmed(name)) {
            nameArr = name.split(" ");
            if (nameArr.length >= 2) {
                for (var i = 0; i < nameArr.length; i++) {
                    if (nameArr[i].length >= 2) {
                        for (var j = 0; j < nameArr[i].length; j++){
                            if (nameArr[i].charCodeAt(j) >= 48 &&
                                nameArr[i].charCodeAt(j) <= 57)
                                return false;
                        }
                    } else {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
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

    // Email validation
    validator.isEmail = function(email) {
        var beforeAt,
            afterAt,
            splitBeforeAt,
            splitAfterAt;

        if (!email) return false;

        if (email.indexOf("@") === -1 ||
            email.indexOf("@") !== email.lastIndexOf("@")) return false;

        beforeAt = email.split("@")[0];
        afterAt = email.split("@")[1];
        splitBeforeAt = beforeAt.split(".");
        splitAfterAt = afterAt.split(".");

        if (beforeAt === "" || beforeAt.indexOf(" ") >= 0) return false;
        for (var i = 0; i < splitBeforeAt.length; i++) {
            if (splitBeforeAt[i] === "" || splitBeforeAt[i] === " ")
                return false;
        }
        if (afterAt === "" || afterAt.indexOf(" ") >=0) return false;
        if (splitAfterAt.length < 2) return false;
        for (var j = 0; j < splitAfterAt.length; j++) {
            if (splitAfterAt[j] === "" || splitAfterAt[j] === " ")
                return false;
            if (splitAfterAt[splitAfterAt.length - 1].length < 2) return false;
        }

        return true;
    };



    scheduleForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isDate(dateInput.value)) {
            dateInput.classList.add("invalid");
        } else {
            dateInput.classList.remove("invalid");
        }

        if (!validator.isTime(startTime.value)) {
            startTime.classList.add("invalid");
        } else {
            startTime.classList.remove("invalid");
        }

        if (!validator.isSelected(timezoneInput)) {
            timezoneBox.classList.add("invalid");
        } else {
            timezoneBox.classList.remove("invalid");
        }

        scheduledDate = new Date(dateInput.value + " " + startTime.value + " " + chosenTz);
        if (!validator.isAfterToday(scheduledDate)) {
            dateInput.classList.add("invalid");
            startTime.classList.add("invalid");
            timezoneBox.classList.add("invalid");
            invalidMessage.style.opacity = "1";
        } else {
            invalidMessage.style.opacity = "0";
        }

        if (!validator.isTime(endTime.value) || endTime.value <= startTime.value) {
            endTime.classList.add("invalid");
        } else {
            endTime.classList.remove("invalid");
        }

        if (!validator.isName(fullName.value)) {
            fullName.classList.add("invalid");
        } else {
            fullName.classList.remove("invalid");
        }

        if (phoneNumber.value !== "") {
            if (!validator.isPhoneNum(phoneNumber.value)) {
                phoneNumber.classList.add("invalid");
            } else {
                phoneNumber.classList.remove("invalid");
            }
        }

        if (!validator.isEmail(emailAddress.value)) {
            emailAddress.classList.add("invalid");
        } else {
            emailAddress.classList.remove("invalid");
        }

        if (message.value !== "") {
            if (!validator.isTrimmed(message.value)) {
                message.classList.add("invalid");
            } else {
                message.classList.remove("invalid");
            }
        }
    });
})();