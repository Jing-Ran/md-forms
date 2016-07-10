(function() {
    var validator = {},
        forgotPswForm = document.getElementById("forgot-form"),
        emailForgot = document.getElementById("email-forgot");

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


    forgotPswForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isEmail(emailForgot.value)) {
            emailForgot.classList.add("invalid");
        } else {
            emailForgot.classList.remove("invalid");
            emailForgot.classList.add("valid");
        }
    });
})();