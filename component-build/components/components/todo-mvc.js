"use strict";
"use strict";
"use strict";
"use strict";
"use strict";
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
    var removed = this.items.splice(e.target.index, 1);
  }
});
//# sourceURL=components/todo-mvc.es6.js