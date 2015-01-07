
Polymer('todo-mvc', {

	ready(){
		this.items = this.items || [];
	},

	newTodoChanged(oldVal, newVal){
		this.$['new-todo-input'].value = '';
		this.items.unshift({text: newVal, done: false});
	},

	saveItems(){
		// console.log('saveItems', ...arguments);	
		this.$.model.save();
	},
  
	onDeleteItem(e){
		console.log('onDeleteItem', e, e.target.index);
		var removed = this.items.splice(e.target.index, 1);
	},

});