(function() {
    var validator = {},
        cardInfoForm = document.getElementById("card-info"),
        holderName = document.getElementById("holder"),
        cardTypes = document.querySelectorAll("#card-type option"),
        cardTypeBox = document.getElementById("card-type"),
        cardNumber = document.getElementById("card-no"),
        cvsCode = document.getElementById("cvs"),
        expireMonths = document.querySelectorAll("#exp-m option"),
        expireMBox = document.getElementById("exp-m"),
        expireYears = document.querySelectorAll("#exp-y option"),
        expireYBox = document.getElementById("exp-y");

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

    // Cardholder's name validation
    validator.isName = function(fullname) {
        var nameArr = fullname.split(" ");
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
        return false;
    };

    // Card type and expiration date validation
    validator.isSelected = function(options) {
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled && options[i].selected) return true;
        }
        return false;
    };

    // Card number validation
    validator.isCreditCard = function(input) {
        var inputArr;

        if (input.indexOf(" ") !== -1) return false;
        if (!input) return false;

        if (input.length === 16) {
            for (var i = 0; i < input.length; i++) {
                var unicode = input.charCodeAt(i);
                if (unicode >=48 && unicode <= 57 || unicode >= 65 && unicode <= 90
                    || unicode >= 97 && unicode <= 122)
                    return true;
            }
        }

        if (input.length === 19) {
            inputArr = input.split("-");
            if (inputArr.length === 4 && inputArr[0].length === 4 &&
                inputArr[1].length === 4 && inputArr[2].length === 4 &&
                inputArr[3].length === 4)
                return true;
        }
        return false;
    };

    // CVS code validation
    validator.isCVS = function(input) {
        if (!input) return false;
        if (input.indexOf(" ") !== -1) return false;

        if (input.length === 3 || input.length === 4) {
            if (!isNaN(input) && input % 1 === 0) return true;
        }
        return false;
    };


    holderName.addEventListener("keyup", function() {
        if (!validator.isName(this.value)) {
            this.setCustomValidity("Invalid cardholder's name");
            this.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            this.classList.remove("invalid");
        } 
    });

    cardNumber.addEventListener("keyup", function() {
        if (!validator.isCreditCard(this.value)) {
            this.setCustomValidity("Invalid card number");
            this.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            this.classList.remove("invalid");
        }
    });

    cvsCode.addEventListener("keyup", function() {
        if (!validator.isCVS(this.value)) {
            this.setCustomValidity("Invalid CVS code");
            this.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            this.classList.remove("invalid");
        }
    });

    cardInfoForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isSelected(cardTypes)) {
            cardTypeBox.classList.add("invalid");
        } else {
            cardTypeBox.classList.remove("invalid");
        }

        if (!validator.isSelected(expireMonths)) {
            expireMBox.classList.add("invalid");
        } else {
            expireMBox.classList.remove("invalid");
        }

        if (!validator.isSelected(expireYears)) {
            expireYBox.classList.add("invalid");
        } else {
            expireYBox.classList.remove("invalid");
        }
    });
})();