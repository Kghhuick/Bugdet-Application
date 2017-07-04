document.addEventListener("DOMContentLoaded", function(event) {

  var bugdetController = (function() {})();

  var UIcontroller = (function() {})();

  var controller = (function(bugdetCtrl, UIctrl) {

    var ctr = function() {
      console.log("working");

    }

    document.querySelector(".add__btn").addEventListener("click", ctr)

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {

        ctr();
      }

    });

  })(bugdetController, UIcontroller);

});
