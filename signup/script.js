(function() {
    var validator = {},
        signupForm = document.getElementById("signup"),
        firstName = document.getElementById("fname"),
        lastName = document.getElementById("lname"),
        dob = document.getElementById("dob"),
        genderRadioBtns = document.getElementsByClassName("gender"),
        emailAddress = document.getElementById("email"),
        password = document.getElementById("psw");

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

    // DOB validation
    validator.isDOB = function(dob) {
        var dobArr,
            dobDate,
            todayDate = new Date(),
            months,
            days,
            age;

        if (!dob) return false;
        if (dob.length !== 10) return false;
        if (dob.indexOf(" ") !== -1) return false;

        dobArr = dob.split("/");
        if (dobArr.length !== 3) {
            return false;
        } else {
            if (isNaN(dobArr[0]) || isNaN(dobArr[1]) || isNaN(dobArr[2]))
                return false;
            if (dobArr[0].length !== 2 || dobArr[1].length !== 2 ||
                dobArr[2].length !== 4)
                return false;
            if (dobArr[0] < 1 || dobArr[0] > 12) return false;
            if (dobArr[0] === "02") {
                if (dobArr[1] < 1 || dobArr[1] > 29) return false;
            } else {
                if (dobArr[1] < 1 || dobArr[1] > 31) return false;
            }
            if (dobArr[2] < (todayDate.getFullYear() - 200)) return false;
        }

        dobDate = new Date(dob);
        if (isNaN(dobDate.getTime())) return false;
        if (dobDate >= todayDate) return false;

        age = todayDate.getFullYear() - dobDate.getFullYear();
        months = todayDate.getMonth() - dobDate.getMonth();
        days = todayDate.getDate() - dobDate.getDate();

        if (months > 0) age--;
        if (months === 0 && days < 0) age--;
        console.log("Minimum age is " + age);
        return true;
    };
    
    // Gender validation
    validator.isRadioChecked = function(radioBtns) {
        for (var i = 0; i < radioBtns.length; i++) {
            if (radioBtns[i].checked) return true;
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

    // Password validation
    validator.isPassword = function(password) {
        if (!password) return false;
        if (password.indexOf(" ") !== -1) return false;
        if (password.length < 6 || password.length > 8) return false;
        return true;
    };

    
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isName(firstName.value)) {
            firstName.classList.add("invalid");
        } else {
            firstName.classList.remove("invalid");\
        }

        if (!validator.isName(lastName.value)) {
            lastName.classList.add("invalid");
        } else {
            lastName.classList.remove("invalid");
        }

        if (!validator.isDOB(dob.value)) {
            dob.classList.add("invalid");
        } else {
            dob.classList.remove("invalid");
        }

        if (!validator.isRadioChecked(genderRadioBtns)) {
            for (var i = 0; i < genderRadioBtns.length; i++) {
                genderRadioBtns[i].classList.add("rdInvalid");
            }
        } else {
            for (var j = 0; j < genderRadioBtns.length; j++) {
                genderRadioBtns[j].classList.remove("rdInvalid");
            }
        }

        if (!validator.isEmail(emailAddress.value)) {
            emailAddress.classList.add("invalid");
        } else {
            emailAddress.classList.remove("invalid");
        }

        if (!validator.isPassword(password.value)) {
            password.classList.add("invalid");
        } else {
            password.classList.remove("invalid");
        }
    });
})();