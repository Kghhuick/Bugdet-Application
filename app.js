document.addEventListener("DOMContentLoaded", function(event) {

  var bugdetController = (function() {

   var Expense = function(id,description,value){
     this.id=id;
     this.description= description;
     this.value = value;
   }

   var Income = function(id,description,value){
     this.id=id;
     this.description= description;
     this.value = value;
   }

  var allExpenses = [];
  var allIncomes = [];


  })();

  var UIcontroller = (function() {

    var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn"
    };

    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).value
        }
      },

      getDOMstrings: function() {
        return DOMstrings;

      }

    };

  })();

  var controller = (function(bugdetCtrl, UIctrl) {
    var setUpEventListners = function() {
      var DOM = UIctrl.getDOMstrings();
      document.querySelector(DOM.inputBtn).addEventListener("click", ctr);

      document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {

          ctr();
        }

      });
    };

    var ctr = function() {
      var input = UIctrl.getInput();
      console.log(input);

    }

    return {
      init: function() {
        console.log("working");
        setUpEventListners();
      }
    }

  })(bugdetController, UIcontroller);

  controller.init();

});
