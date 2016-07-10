(function() {
    var validator = {},
        loginForm = document.getElementById("login-form"),
        emailInput = document.getElementById("email-login"),
        pswInput = document.getElementById("psw-login");

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


    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isEmail(emailInput.value)) {
            emailInput.classList.add("invalid");
        } else {
            emailInput.classList.remove("invalid");
            emailInput.classList.add("valid");
        }

        if (!validator.isPassword(pswInput.value)) {
            pswInput.classList.add("invalid");
        } else {
            pswInput.classList.remove("invalid");
            pswInput.classList.add("valid");
        }
    });

})();