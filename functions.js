const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Fluid"
var ID = 0
const T_GRAM = "gram"
const T_PERCENT = "percent"


class Entry{

	constructor(id, type){
		// console.log("Created id: "+id)
		this.id = id
		this.gram = 0
		this.name = "Name"
		this.lastEdited = ""
		this.percent = 0
		this.type = type
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
				this.entries.splice(i,1)
			}
		}
		// console.log("---- NEW ------")
		// this.showEntries()
	}


	update(id){
		// fetch all entries from pre doughs
		if (this.isMain){
			this.pre_flour_gram = 0
			this.pre_fluid_gram = 0
			this.addDough(Pre1)
			this.addDough(Pre2)
		}

		for (let i = 0; i < 1; i++) {
			
		
			var flour = {}
			var flour_total = this.pre_flour_gram
			var fluids = {}
			var fluid_total = 0
			var percent_total = 0

			// sum all weights
			for (let i = 0; i < this.entries.length; i++) {
				const e = this.entries[i];
				if (e.isFlour()){
					percent_total += e.percent
					flour[e.id] = e.gram;
					flour_total += e.gram;
				}
				else{
					fluids[e.id] = e.gram;
					fluid_total += e.gram;
				}
			}
			// console.log(this.name+" percent: "+percent_total)

			for (var key in flour) {
				var percent = (this.getEntry(key).gram/flour_total)*100
				var grams = this.getEntry(key).percent*flour_total/100
				var le = this.getEntry(key).lastEdited
				if (le == T_GRAM){
					this.getEntry(key).updatePercent(percent)
				}
				if (le == T_PERCENT){
					this.getEntry(key).updateGrams(grams)
				}
			}
			for (var key in fluids) {
				var percent = (this.getEntry(key).gram/flour_total)*100
				var grams = this.getEntry(key).percent*flour_total/100
				var le = this.getEntry(key).lastEdited
				if (le == T_GRAM){
					this.getEntry(key).updatePercent(percent)
				}
				if (le == T_PERCENT){
					this.getEntry(key).updateGrams(grams)
				}
			}
		}
			

			
	}	

	
}




var Pre1 = new Dough("Vorteig 1");
var Pre2 = new Dough("Vorteig 2");
var Main = new Dough("Main");
Main.makeMain()




var closebtns = document.getElementsByClassName("close");
var i;

/* Loop through the elements, and hide the parent, when clicked on */
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
  this.parentElement.style.display = 'none';
});
}

////////////////////////////////////////////
// ZUTAT SPALTE
////////////////////////////////////////////
function createEntryField(listID, Dough, type){
	var list = document.getElementById(listID);
	var list_el = document.createElement('li');
	list_el.setAttribute("style","transition: 0.5s;")
	list_el.id = ID;
	ID += 1;
	var entry = new Entry(list_el.id, type)
	Dough.addEntry(entry)


	var close = document.createElement("span")
	close.className = "close"
	close.innerHTML = "-"
	close.addEventListener("click", function() {
		Dough.removeEntry(list_el.id)
		Dough.update()
		list_el.remove()
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


var list = document.getElementById("list3");
var list_el_pre1 = document.createElement('li');
var pre1_input = document.createElement("input");
pre1_input.type = "text";
pre1_input.className = "predoughText"; // set the CSS class
pre1_input.value = "Predough 1"
// pre1_input.setAttribute("style",'text-align: center;')
var close = document.createElement("span")
close.className = "close"
close.innerHTML = "-"
close.addEventListener("click", function() {
	Main.update()
	list_el_pre1.remove()
});
list_el_pre1.appendChild(pre1_input);
list_el_pre1.appendChild(close)
list.appendChild(list_el_pre1);

var list = document.getElementById("list3");
var list_el_pre2 = document.createElement('li');
var pre2_input = document.createElement("input");
pre2_input.type = "text";
pre2_input.className = "predoughText"; // set the CSS class
pre2_input.value = "Predough 2"
// pre2_input.setAttribute("style",'text-align: center;')
var close = document.createElement("span")
close.className = "close"
close.innerHTML = "-"
close.addEventListener("click", function() {
	Main.update()
	list_el_pre2.remove()
});
list_el_pre2.appendChild(pre2_input);
list_el_pre2.appendChild(close)
list.appendChild(list_el_pre2);

var pre1_title = document.getElementById("Pre1_title")
pre1_title.addEventListener("focusout", function() {
	pre1_input.value = this.value
});
pre1_title.addEventListener ('keyup', function() {
	pre1_input.value = this.value });

var pre2_title = document.getElementById("Pre2_title")
pre2_title.addEventListener("focusout", function() {
	pre2_input.value = this.value
});
pre2_title.addEventListener ('keyup', function() {
	pre2_input.value = this.value });