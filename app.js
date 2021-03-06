var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum = sum + cur.value;

    });
    data.totals[type] = sum;

  }

  var data = {
    allItems: {
      inc: [],
      exp: []

    },
    totals: {
      exp: 0,
      inc: 0
    },

    budget: 0,
    percentage: -1

  };

  return {
    addItem: function(type, des, val) {
      var newItem,
        ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      var ids=data.allItems[type].push(newItem);
    return newItem;
    },

      deleteItem : function(type,id){
        var ids,index;
       ids=  data.allItems[type].map(function(current){
        return current.id;

      });

       index=ids.indexOf(id);

       if(index !== -1){
         data.allItems[type].splice(index,1);

       }


     },


    calculateBudget: function() {
      calculateTotal("exp");
      calculateTotal("inc");

      data.budget = data.totals.inc - data.totals.exp;

      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

    },


    getBudget : function(){
      return {
        budget:data.budget,
        totalInc:data.totals.inc,
        totalExp:data.totals.exp,
        percentage:data.percentage

      };

    },

    test: function() {
      console.log(data);
    }

  };

})();

var UIcontroller = (function() {

  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel:".budget__value",
    incomeLabel:".budget__income--value",
    expensesLabel:".budget__expenses--value",
    percentageLabel:".budget__expenses--percentage",
    container:".container"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html,
        newHtml,
        element,
        fields;

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%">\
         <div class="item__description">%description%</div>\
         <div class="right clearfix"><div class="item__value">%value%</div>\
           <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>\
         </div>\
       </div>'

      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%">\
                <div class="item__description">%description%</div>\
                  <div class="right clearfix"><div class="item__value">%value%</div>\
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>\
                  </div>\
                </div>'
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

    },

    clearFields: function() {
      fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue);

      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current) {
        current.value = "";

      });
      fieldsArr[0].focus;

    },

   displayBudget : function(obj) {
    document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
     document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
       document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;


         if(obj.percentage > 0) {
      document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
    }else{

       document.querySelector(DOMstrings.percentageLabel).textContent = "---";
    }
   },

    getDOMstrings: function() {
      return DOMstrings;

    }

  };

})();

var controller = (function(budgetCtrl, UIctrl) {
  var setUpEventListners = function() {
    var DOM = UIctrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctr);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {

        ctr();
      }

    });

    document.querySelector(DOM.container).addEventListener("click",ctrDeleteItem);
  };

  var updateBudget = function() {

     budgetCtrl.calculateBudget();

     var budget = budgetCtrl.getBudget();

     UIctrl.displayBudget(budget);


  }

  var ctr = function() {
    var input,
      newItem;

    input = UIctrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      UIctrl.addListItem(newItem, input.type);

      UIctrl.clearFields();

      updateBudget();
    }
  };

   var ctrDeleteItem = function() {
    var itemId, splitId,type,ID;

     itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;

     console.log(itemId);

     if(itemId) {
       splitId=itemId.split("-");
       type=splitId[0];
       Id= parseInt(splitId[1]);

       budgetCtrl.deleteItem(type,Id);
     }

   };

  return {
    init: function() {
      console.log("working");
      UIctrl.displayBudget({
        budget:0,
        totalInc:0,
        totalExp:0,
        percentage:-1

      });
      setUpEventListners();
    }
  }

})(budgetController, UIcontroller);

controller.init();
