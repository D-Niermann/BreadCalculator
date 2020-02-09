const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Fluid"
var ID = 0
const T_GRAM = "gram"
const T_PERCENT = "percent"


class Entry{

	constructor(id, type, listEl){
		// console.log("Created id: "+id)
		this.id = id
		this.gram = 0
		this.name = "Name"
		this.lastEdited = ""
		this.percent = 0
		this.type = type
	}

	removeListEl(){
		document.getElementById(this.id).remove();	
	}
	getInfo(){
		console.log("ID: "+this.id + " Type: "+ this.type)
	}

	updateGrams(value, fetchedFromHTML = false){
		if (Math.round(this.gram) != Math.round(value)){
			this.gram = parseFloat(value)
			if (isNaN(this.gram)){
				this.gram = 0
			}
			if (fetchedFromHTML){
				this.lastEdited = T_GRAM
			}
			// document.getElementById(this.id).childNodes.getElementsByClassName("input-text-gram").value = "test"
			var childs = document.getElementById(this.id).childNodes
			for(let i = 0; i<childs.length; i++){
				if (childs[i].className == "input-text-gram"){
					childs[i].value = Math.round(this.gram)
				}
			}
		}
	}
	updateName(value, fetchedFromHTML = false){
		this.name = value
	}
	updatePercent(value, fetchedFromHTML = false){
		if (Math.round(this.percent) != Math.round(value)){
			this.percent = parseFloat(value)
			if (isNaN(this.percent)){
				this.percent = 0
			}
			if (fetchedFromHTML){
				this.lastEdited = T_PERCENT
			}
			var childs = document.getElementById(this.id).childNodes
			for(let i = 0; i<childs.length; i++){
				if (childs[i].className == "input-text-percent"){
					childs[i].value = Math.round(this.percent)
				}
			}
		}
	}
	updateType(value){
		this.type = value
	}

	isFlour(){
		if(this.type==T_FLOUR){
			return true}
		else{return false}
	}
	isWater(){
		if(this.type==T_WATER){
			return true}
		else{return false}
	}
	isOther(){
		if(this.type==T_OTHER){
			return true}
		else{return false}
	}
}

class Dough{

	constructor(name){
		this.name = name
		this.id = 0
		this.entries = []
		this.isMain = false;
		this.pre_flour_gram = 0
		this.pre_fluid_gram = 0
		this.pre_other_gram = 0
		this.flour_total = 0
		this.fluid_total = 0
	}

	addEntry(Entry){
		console.log("adding entry: "+Entry.name)
		this.entries.push(Entry)
	}

	addDough(dough){
		const entries = dough.getAllEntries()
		
		for (let i = 0; i < entries.length; i++) {
			const e = entries[i]
			if(e.isFlour()){
				this.pre_flour_gram += e.gram
			}
			if(e.isWater()){
				this.pre_fluid_gram += e.gram
			}
			else{
				this.pre_other_gram += e.gram
			}
			// var entry = new Entry(ID, e.type)
			// ID += 1 
			// entry.gram = e.gram
			// entry.percent = e.percent

			// this.addEntry(entry)
		}
	}

	showEntries(){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			e.getInfo()
		}
	}

	makeMain(){
		this.isMain = true
		this.weight_field = document.getElementById("total_weight")
		this.weight_field.value = "0"
		this.flour_field = document.getElementById("total_flour")
		this.flour_field.value = "0"		
		this.fluid_field = document.getElementById("total_fluid")
		this.fluid_field.value = "0"
		this.percent_field = document.getElementById("total_percent")
		this.percent_field.value = "0"
	}

	// genID(){
	// 	this.id += 1;
	// 	return this.id.toString()
	// }
	
	getEntry(id){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			if(e.id == id){
				return e
			}
		}
	}

	getAllEntries(){
		return this.entries;
	}

	removeEntry(id){
		// console.log("---- OLD ------")
		// this.showEntries()
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			if(e.id == id){
				e.removeListEl()
				this.entries.splice(i,1)
			}
		}
		// console.log("---- NEW ------")
		// this.showEntries()
	}

	removeAll(){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			e.removeListEl()
		}
		this.entries = []
		this.update()
	}


	update(id){
		// fetch all entries from pre doughs
		if (this.isMain){
			this.pre_flour_gram = 0
			this.pre_fluid_gram = 0
			this.addDough(Pre1)
			this.addDough(Pre2)
		}

		for (let i = 0; i < 7; i++) { // this must be done multiple times if some percentages are wrong (dont add to 100%)
			
		
			var flour = {}
			this.flour_total = this.pre_flour_gram
			var fluids = {}
			this.fluid_total = this.pre_fluid_gram
			var others = {}
			this.other_total = this.pre_other_gram
			var percent_total = 0

			// sum all weights
			for (let i = 0; i < this.entries.length; i++) {
				const e = this.entries[i];
				if (e.isFlour()){
					percent_total += e.percent
					flour[e.id] = e.gram;
					this.flour_total += e.gram;
				}
				if(e.isWater()){
					fluids[e.id] = e.gram;
					this.fluid_total += e.gram;
				}
				else{
					others[e.id] = e.gram
					this.other_total += e.gram
				}
			}
			// console.log(this.name+" percent: "+percent_total)

			for (var key in flour) {
				var e = this.getEntry(key)
				// calculate percentage and gram of entry
				var percent = (e.gram/this.flour_total)*100
				var grams = e.percent*this.flour_total/100
				// set entry values (also into html elements)
				if (e.lastEdited == T_GRAM){
					e.updatePercent(percent)}
				if (e.lastEdited == T_PERCENT){
					e.updateGrams(grams)}
			}
			for (var key in fluids) {
				var e = this.getEntry(key)
				// calculate percentage and gram of entry
				var percent = (e.gram/this.flour_total)*100
				var grams = e.percent*this.flour_total/100
				// set entry values (also into html elements)
				if (e.lastEdited == T_GRAM){
					e.updatePercent(percent)}
				if (e.lastEdited == T_PERCENT){
					e.updateGrams(grams)}
			}
			for (var key in others) {
				var e = this.getEntry(key)
				// calculate percentage and gram of entry
				var percent = (e.gram/this.flour_total)*100
				var grams = e.percent*this.flour_total/100
				// set entry values (also into html elements)
				if (e.lastEdited == T_GRAM){
					e.updatePercent(percent)}
				if (e.lastEdited == T_PERCENT){
					e.updateGrams(grams)}
			}
		}
			
		if (this.isMain){
			this.weight_field.value = Math.round(this.flour_total + this.fluid_total)
			this.flour_field.value = Math.round(this.flour_total)
			this.fluid_field.value = Math.round(this.fluid_total)
			this.percent_field.value = 100+Math.round((this.fluid_total)/(this.flour_total) * 100)
		}
			
	}	

	
}




var Pre1 = new Dough("Vorteig 1");
var Pre2 = new Dough("Vorteig 2");
var Main = new Dough("Main");
Main.makeMain()





function dragStart(event) {
	// console.log(this.childNodes[0].value)
	dragSrcEl = this;
	// event.dataTransfer.effectAllowed = 'move';
	// event.dataTransfer.setData('text/html', this.innerHTML);
  };
  
//   function dragEnter(event) {
// 	this.classList.add('over');
//   }
  
  function dragLeave(event) {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = "none"
  }
  
  function dragOver(event) {
	event.preventDefault();
	return false;
  }
  
  function dragDrop(event) {
	var source_gram;
	var source_name;
	var source_percent;
	var source_id;
	if (this.parentElement.id==dragSrcEl.parentElement.id && dragSrcEl != this) {
		// ursprung
		console.log(dragSrcEl.childNodes[0].value)
		// target
		console.log(this.childNodes[0].value)

		// save values from source element
		source_gram = dragSrcEl.childNodes[0].value
		source_name = dragSrcEl.childNodes[2].value
		source_percent = dragSrcEl.childNodes[3].value
		source_id = dragSrcEl.id
		// change source element
		dragSrcEl.childNodes[0].value = this.childNodes[0].value
		dragSrcEl.childNodes[2].value = this.childNodes[2].value
		dragSrcEl.childNodes[3].value = this.childNodes[3].value
		dragSrcEl.id = this.id
		// change other element
		this.childNodes[0].value = source_gram
		this.childNodes[2].value = source_name
		this.childNodes[3].value = source_percent
		this.id = source_id
	}
	return false;
  }
  
////////////////////////////////////////////
// ZUTAT SPALTE
////////////////////////////////////////////
function createEntryField(listID, Dough, type){
	var list = document.getElementById(listID);
	var list_el = document.createElement('li');
	list_el.draggable = true
	list_el.setAttribute("style","transition: 0.5s;")
	list_el.id = ID;
	ID += 1;
	var entry = new Entry(list_el.id, type)
	Dough.addEntry(entry)
	list_el.addEventListener('dragstart', dragStart, false);
	list_el.addEventListener('dragover', dragOver, false);
	list_el.addEventListener('dragleave', dragLeave, false);
	list_el.addEventListener('drop', dragDrop, false);

	var close = document.createElement("span")
	close.className = "close"
	close.innerHTML = "-"
	close.addEventListener("click", function() {
		Dough.removeEntry(list_el.id)
		Dough.update()
		Main.update()
	});

	var input = document.createElement("input");
	input.type = "number";
	input.className = "input-text-gram"; // set the CSS class
	input.value = 0
	input.setAttribute("onClick","this.select();")
	input.addEventListener ('keydown', function (event) {
		if (event.which == 13) { //enter key
			Dough.getEntry(list_el.id).updateGrams(this.value, true)
			Dough.update(list_el.id)
			Main.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updateGrams(this.value, true)
		Dough.update(list_el.id)
		Main.update(list_el.id)
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.innerHTML = " g "
	text.setAttribute("style",'margin-right: 10px;')
	text.className = "InfoTypeText"
	list_el.appendChild(text)

	var input = document.createElement("input");
	input.type = "text";
	input.className = "input-text-name"; // set the CSS class
	input.value = "Name"
	input.setAttribute("style",'margin-right: 20px;')
	input.setAttribute("onClick","this.select();")
	input.addEventListener ('keydown', function (event) {
		if (event.which == 13) { //enter key
			Dough.getEntry(list_el.id).updateName(this.value, true)
			Dough.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
			Dough.getEntry(list_el.id).updateName(this.value, true)
			Dough.update(list_el.id)
			
		});
	list_el.appendChild(input); // put it into the DOM

	
	var input = document.createElement("input");
	input.type = "number";
	input.className = "input-text-percent"; // set the CSS class
	input.setAttribute("onClick","this.select();")
	input.value = 0
	input.addEventListener("focusout", function(event){});

	input.addEventListener ('keydown', function(event) {
		if (event.which == 13) { //enter key
			// only if value is different to old vlaue -> implement everything into an update funciton and a fetch function? or update with keyword arg
			Dough.getEntry(list_el.id).updatePercent(this.value, true)
			Dough.update(list_el.id)
			Main.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updatePercent(this.value, true)
		Dough.update(list_el.id,"percent")
		Main.update(list_el.id)
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.className = "InfoTypeText"
	text.innerHTML = "%      "
	text.setAttribute("style",'margin-right: 40px;')
	list_el.appendChild(text)
	
	
	var textType = document.createElement("a")
	textType.innerHTML = type
	textType.className = "InfoTypeText-transparent"
	list_el.appendChild(textType)


	list_el.appendChild(close)
	list.appendChild(list_el);

	Dough.update(list_el.id)	
	

	
	
	Main.update(list_el.id)
}

document.getElementById("addPre11").addEventListener("click", function(){createEntryField("list1", Pre1, T_FLOUR)});
document.getElementById("addPre12").addEventListener("click", function(){createEntryField("list1", Pre1, T_WATER)});
document.getElementById("addPre13").addEventListener("click", function(){createEntryField("list1", Pre1, T_OTHER)});
document.getElementById("addPre21").addEventListener("click", function(){createEntryField("list2", Pre2, T_FLOUR)});
document.getElementById("addPre22").addEventListener("click", function(){createEntryField("list2", Pre2, T_WATER)});
document.getElementById("addPre23").addEventListener("click", function(){createEntryField("list2", Pre2, T_OTHER)});
document.getElementById("addPreMain1").addEventListener("click", function(){createEntryField("list3", Main, T_FLOUR)});
document.getElementById("addPreMain2").addEventListener("click", function(){createEntryField("list3", Main, T_WATER)});
document.getElementById("addPreMain3").addEventListener("click", function(){createEntryField("list3", Main, T_OTHER)});
////////////////////////////////////////////////////////////////////////////////

//// Predough 1 field
var list = document.getElementById("list3");
var list_el_pre1 = document.createElement('li');
var pre1_input = document.createElement("div");
// pre1_input.type = "text";
pre1_input.className = "predoughText"; // set the CSS class
pre1_input.innerHTML = "Predough 1"
// pre1_input.setAttribute("style",'text-align: center;')
var close = document.createElement("span")
close.className = "close"
close.innerHTML = "-"
close.addEventListener("click", function() {
	Pre1.removeAll()
	Main.update()
	list_el_pre1.remove()
});
list_el_pre1.appendChild(pre1_input);
list_el_pre1.appendChild(close)
list.appendChild(list_el_pre1);


//// Predough 2 field
var list = document.getElementById("list3");
var list_el_pre2 = document.createElement('li');
var pre2_input = document.createElement("div");
pre2_input.className = "predoughText"; // set the CSS class
pre2_input.innerHTML = "Predough 2"
// pre2_input.setAttribute("style",'text-align: center;')
var close = document.createElement("span")
close.className = "close"
close.innerHTML = "-"
close.addEventListener("click", function() {
	Pre2.removeAll()
	Main.update()
	list_el_pre2.remove()
});
list_el_pre2.appendChild(pre2_input);
list_el_pre2.appendChild(close)
list.appendChild(list_el_pre2);


// title updates for above predough fields
// update entry pre1 in main dough
var pre1_title = document.getElementById("Pre1_title")
pre1_title.addEventListener("focusout", function() {
	pre1_input.innerHTML = this.value
});
pre1_title.addEventListener ('keyup', function() {
	pre1_input.innerHTML = this.value });
// update entry pre2 in main dough
var pre2_title = document.getElementById("Pre2_title")
pre2_title.addEventListener("focusout", function() {
	pre2_input.innerHTML = this.value
});
pre2_title.addEventListener ('keyup', function() {
	pre2_input.innerHTML = this.value });