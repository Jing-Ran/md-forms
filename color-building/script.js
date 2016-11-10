(function() {
  var inputRGBA =
      document.querySelectorAll('#bar-red, #bar-green, #bar-blue, #bar-alpha');
  var textRGBA = document.querySelector('textarea.result');

  function showRGBA() {
    var valueR = inputRGBA[0].value;
    var valueG = inputRGBA[1].value;
    var valueB = inputRGBA[2].value;
    var valueA = inputRGBA[3].value;

    textRGBA.innerText = 'rgba(' + valueR + ',' + valueG + ',' + valueB + ',' +
        valueA + ')';

    showColor(textRGBA.value);
  }

  function showColor(color) {
    textRGBA.style.backgroundColor = color;
  }

  inputRGBA.forEach(function(){
    addEventListener('input', showRGBA);
  });

})(window);
