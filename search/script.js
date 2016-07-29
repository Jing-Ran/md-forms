(function() {
    var validator = {},
        searchForm = document.getElementById("search-form"),
        categories = document.querySelectorAll("option"),
        categoryBox = document.querySelector("select"),
        textInput = document.getElementById("search-input");

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

    
    // Category validation
    validator.isSelected = function(options) {
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled && options[i].selected) return true;
        }
        return false;
    };

    // Input validation
    validator.isEmpty = function(input) {
        if (!validator.isTrimmed(input)) return false;
        if (!input) return false;
        return true;
    };


    textInput.addEventListener("keyup", function() {
        if (!validator.isEmpty(this.value)) {
            this.setCustomValidity("Invalid search content");
            this.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            this.classList.remove("invalid");
        }
    });

    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!validator.isSelected(categories)) {
            categoryBox.classList.add("invalid");
        } else {
            categoryBox.classList.remove("invalid");
        }
    });

})();