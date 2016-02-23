function GroceryItem(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  }
}

function GroceryList(listName) {
  this.listName = listName;
  this.listItems = [];
  this.addItem = function(newItem) {
    if (this.checkForDuplicate(newItem) == false) {
     var newGroceryItem = new GroceryItem(newItem);
      this.listItems.push(newGroceryItem);
    } else {
      alert("Item already in list");
    }    
  };

  this.removeItem = function(item) {
    for (var listItem in this.listItems) {
      console.log(this.listItems[listItem].getName());
      console.log(item);
      if (item == this.listItems[listItem].getName()) {
        this.listItems.splice(listItem, 1);
      }
    }
  };

  this.checkForDuplicate = function(newItem) {
    console.log(this.listItems.length);
    if (this.listItems.length != 0) {
      for (var item in this.listItems) {
        if (newItem == this.listItems[item].getName()) {
          return true;
        }        
      }
    }
    return false;    
  };
};

function GroceryListView(groceryList) {
  this.groceries = groceryList;
  console.log("total groceries" + this.groceries.listItems.length);
  this.displayGroceries = function() {    
    for (var item in this.groceries.listItems) {
      var pTag = document.createElement('p');
      var pTageValue = document.createTextNode(this.groceries.listItems[item].getName());
      pTag.appendChild(pTageValue);
      document.getElementById("grocery-items").appendChild(pTag);
    };
  }
  this.resetListView = function() {
    document.getElementById("grocery-items").innerHTML = '';
  }
  this.handleNewItem = function(newItem) {
    this.groceries.addItem(newItem);
    this.resetListView();
    this.displayGroceries();
  }
  this.handleRemoveItem = function(item) {
    console.log("handleRemoveItem: " + item)
    this.groceries.removeItem(item);
    this.resetListView();
    this.displayGroceries();
  }
}
var groceryList = new GroceryList("My First List");
groceryList.addItem('banana');
var GroceryApp = new GroceryListView(groceryList);
GroceryApp.displayGroceries();