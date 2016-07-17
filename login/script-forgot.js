(function() {
    var validator = {},
        forgotPswForm = document.getElementById("forgot-form"),
        emailForgot = document.getElementById("email-forgot");

    // Email validation
    validator.isEmail = function(email) {
        var local,
        domain,
        localSplit,
        domainSplit;

        if (!email) return false;
        // Move space check from back to the front: no space is allowed in an email
        if (email.indexOf(" ") !== -1) return false;

        if (email.indexOf("@") === -1 ||
            email.indexOf("@") !== email.lastIndexOf("@")) return false;

        local = email.split("@")[0];
        domain = email.split("@")[1];
        localSplit = local.split(".");
        domainSplit = domain.split(".");

        if (beforeAt === "") return false;
        for (var i = 0; i < beforeAtSplit.length; i++) {
            if (beforeAtSplit[i] === "")
                return false;
        }

        if (domain === "") return false;
        // Add: no underscore is allow after @ sign
        if (domain.indexOf("_") !== -1) return false;
        // Add: hyphen can't be the first or the last character
        if (domain.indexOf("-") === 0 || 
            domain.lastIndexOf("-") === domain.length - 1) return false;
        // Remove checking length of domainSplit
        // A domain without dot is allowed, ex. IP address
        for (var j = 0; j < domainSplit.length; j++) {
            if (domainSplit[j] === "") return false;
            if (domainSplit[domainSplit.length - 1].length < 2) return false;
        }
    };


    forgotPswForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isEmail(emailForgot.value)) {
            emailForgot.classList.add("invalid");
        } else {
            emailForgot.classList.remove("invalid");
        }
    });
})();