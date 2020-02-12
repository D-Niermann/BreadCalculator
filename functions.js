const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Fluid"
const T_PREDOUGH = "Pref."
var ID = 0
const T_GRAM = "gram"
const T_PERCENT = "percent"
const {createEntryField} = require("./createEntry.js")
const {createPredoughField} = require("./createDoughField.js")
const {Dough} = require("./Classes.js")

var Pre1 = new Dough("Pre-ferment 1", "Pre1");
var Pre2 = new Dough("Pre-ferment 2", "Pre2");
// if adding more predoughs search for comments that mark where code change is needed: // !Hardcoded predough!

var Main = new Dough("Main", "Main");
Main.makeMain()





function dragStart(event) {
	dragSrcEl = this;
  };
  
  
  function dragLeave(event) {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = "none"
  }
  
  function dragOver(event) {
	event.preventDefault();
	if (this.parentElement.id==dragSrcEl.parentElement.id && this.id != dragSrcEl.id && this.nodeName=="LI") {
	}
	else{
		event.dataTransfer.dropEffect = "none"
		return false;
	}
  }
  
  function dragDrop(event) {
	var source_gram;
	var source_name;
	var source_percent;
	var source_id;
	var source_type;
	if (this.parentElement.id==dragSrcEl.parentElement.id && this.id != dragSrcEl.id && this.nodeName=="LI") {
		// ursprung
		console.log("source: " + dragSrcEl.childNodes[1].value)
		// target
		console.log("target: "+ this.childNodes[1].value)

		// save values from source element
		source_gram = dragSrcEl.childNodes[1].value
		source_name = dragSrcEl.childNodes[3].value
		source_percent = dragSrcEl.childNodes[4].value
		source_id = dragSrcEl.id
		source_type = dragSrcEl.childNodes[6].innerHTML
		// change source element
		dragSrcEl.childNodes[1].value = this.childNodes[1].value
		dragSrcEl.childNodes[3].value = this.childNodes[3].value
		dragSrcEl.childNodes[4].value = this.childNodes[4].value
		dragSrcEl.id = this.id
		dragSrcEl.childNodes[6].innerHTML = this.childNodes[6].innerHTML
		// change other element
		this.childNodes[1].value = source_gram
		this.childNodes[3].value = source_name
		this.childNodes[4].value = source_percent
		this.id = source_id
		this.childNodes[6].innerHTML = source_type
	}
	else{
		return false;
	}
  }
  

document.getElementById("addPre11").addEventListener("click", function(){createEntryField("list1", Pre1, T_FLOUR);createPredoughField("list3", Main, T_PREDOUGH, Pre1)});
document.getElementById("addPre12").addEventListener("click", function(){createEntryField("list1", Pre1, T_WATER);createPredoughField("list3", Main, T_PREDOUGH, Pre1)});
document.getElementById("addPre13").addEventListener("click", function(){createEntryField("list1", Pre1, T_OTHER);createPredoughField("list3", Main, T_PREDOUGH, Pre1)});

document.getElementById("addPre21").addEventListener("click", function(){createEntryField("list2", Pre2, T_FLOUR);createPredoughField("list3", Main, T_PREDOUGH, Pre2)});
document.getElementById("addPre22").addEventListener("click", function(){createEntryField("list2", Pre2, T_WATER);createPredoughField("list3", Main, T_PREDOUGH, Pre2)});
document.getElementById("addPre23").addEventListener("click", function(){createEntryField("list2", Pre2, T_OTHER);createPredoughField("list3", Main, T_PREDOUGH, Pre2)});

document.getElementById("addPreMain1").addEventListener("click", function(){createEntryField("list3", Main, T_FLOUR)});
document.getElementById("addPreMain2").addEventListener("click", function(){createEntryField("list3", Main, T_WATER)});
document.getElementById("addPreMain3").addEventListener("click", function(){createEntryField("list3", Main, T_OTHER)});
////////////////////////////////////////////////////////////////////////////////

//// Pre-ferment 1 field
// var list = document.getElementById("list3");
// var list_el_pre1 = document.createElement('li');
// var pre1_input = document.createElement("div");
// // pre1_input.type = "text";
// pre1_input.className = "Pre-fermentText"; // set the CSS class
// pre1_input.innerHTML = "Pre-ferment 1"
// // pre1_input.setAttribute("style",'text-align: center;')
// var close = document.createElement("span")
// close.className = "close"
// close.innerHTML = "-"
// close.addEventListener("click", function() {
// 	Pre1.removeAll()
// 	Main.update()
// 	document.getElementById("Pre1_title").value = "Pre-ferment 1"
// 	list_el_pre1.remove()
// });
// list_el_pre1.appendChild(pre1_input);
// list_el_pre1.appendChild(close)
// list.appendChild(list_el_pre1);


//// Pre-ferment 2 field
// var list = document.getElementById("list3");
// var list_el_pre2 = document.createElement('li');
// var pre2_input = document.createElement("div");
// pre2_input.className = "Pre-fermentText"; // set the CSS class
// pre2_input.innerHTML = "Pre-ferment 2"
// // pre2_input.setAttribute("style",'text-align: center;')
// var close = document.createElement("span")
// close.className = "close"
// close.innerHTML = "-"
// close.addEventListener("click", function() {
// 	Pre2.removeAll()
// 	Main.update()
// 	document.getElementById("Pre2_title").value = "Pre-ferment 2"
// 	list_el_pre2.remove()
// });
// list_el_pre2.appendChild(pre2_input);
// list_el_pre2.appendChild(close)
// list.appendChild(list_el_pre2);


// title updates for above Pre-ferment fields
// update entry pre1 in main dough
var pre1_title = document.getElementById("Pre1_title")
pre1_title.addEventListener("focusout", function() {
	// pre1_input.innerHTML = this.value
	Pre1.name = this.value
	Main.getEntry(Pre1.id).updateName(Pre1.name)
});
pre1_title.addEventListener ('keyup', function() {
	// pre1_input.innerHTML = this.value 
	Pre1.name = this.value
	Main.getEntry(Pre1.id).updateName(Pre1.name)

});
// update entry pre2 in main dough
var pre2_title = document.getElementById("Pre2_title")
pre2_title.addEventListener("focusout", function() {
	// pre2_input.innerHTML = this.value
	Pre2.name = this.value
	Main.getEntry(Pre2.id).updateName(Pre2.name)
});
pre2_title.addEventListener ('keyup', function() {
	// pre2_input.innerHTML = this.value 
	Pre2.name = this.value
	Main.getEntry(Pre2.id).updateName(Pre2.name)
});