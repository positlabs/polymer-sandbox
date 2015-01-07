"use strict";
Polymer('todo-mvc', {
  ready: function() {
    this.items = this.items || [];
  },
  newTodoChanged: function(oldVal, newVal) {
    this.$['new-todo-input'].value = '';
    this.items.unshift({
      text: newVal,
      done: false
    });
  },
  saveItems: function() {
    this.$.model.save();
  },
  onDeleteItem: function(e) {
    console.log('onDeleteItem', e, e.target.index);
    var removed = this.items.splice(e.target.index, 1);
  }
});
//# sourceURL=todo-mvc/todo-mvc.es6.js