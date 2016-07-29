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

    emailForgot.addEventListener("keyup", function() {
        if (!validator.isEmail(this.value)) {
            this.setCustomValidity("Invalid email address");
            this.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            this.classList.remove("invalid");
        }
    });

    forgotPswForm.addEventListener("submit", function(e) {
        e.preventDefault();
    });
})();