(function() {
    var validator = {},
        questionnaireForm = document.getElementById("questionnaire"),
        allChoices = document.getElementsByClassName("choices"),
        otherInput = document.getElementById("other-input"),
        question = document.getElementsByTagName("h1")[0];

    
    validator.isRadioChecked = function(radioBtns) {
        for (var i = 0; i < radioBtns.length; i++) {
            if (i !== radioBtns.length - 1 && radioBtns[i].checked) {
                return true;
            } else if (i === radioBtns.length - 1 && radioBtns[i].checked) {
                if (otherInput.value.trim() === "") {
                    otherInput.classList.add("invalid");
                    return false;
                }
                return true;
            }
        }
        return false;
    };


    questionnaireForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!validator.isRadioChecked(allChoices)) {
            question.classList.add("invalid");
        } else {
            question.classList.remove("invalid");
            otherInput.classList.remove("invalid");
        }
    });
})();