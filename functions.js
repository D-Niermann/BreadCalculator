const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Liquid"
var ID = 0
const T_GRAM = "gram"
const T_PERCENT = "percent"

class Entry{

	constructor(id, type){
		this.id = id
		this.gram = 0
		this.name = "Name"
		this.lastEdited = ""
		this.percent = 0
		this.type = type
	}

	getInfo(){
	}

	updateGrams(value, fetchedFromHTML = false){
		if (this.gram != value){
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
		if (this.percent != value){
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
	}

	addEntry(Entry){
		this.entries.push(Entry)
	}

	showEntries(){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			e.getInfo()
		}
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

	removeEntry(id){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			if(e.id == id){
				this.entries.splice(i)
				return 0
			}
		}
	}


	update(id){
		for (let i = 0; i < 10; i++) {
			
		
			var flour = {}
			var flour_total = 0
			var fluids = {}
			var fluid_total = 0

			// sum all weights
			for (let i = 0; i < this.entries.length; i++) {
				const e = this.entries[i];
				if (e.isFlour()){
					flour[e.id] = e.gram;
					flour_total += e.gram;
				}
				else{
					fluids[e.id] = e.gram;
					fluid_total += e.gram;
				}
			}

			for (var key in flour) {
				var percent = this.getEntry(key).gram/flour_total*100
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
				var percent = this.getEntry(key).gram/flour_total*100
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
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updateGrams(this.value, true)
		Dough.update(list_el.id)
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.innerHTML = "g  "
	text.className = "InfoTypeText"
	list_el.appendChild(text)

	var input = document.createElement("input");
	input.type = "text";
	input.className = "input-text-name"; // set the CSS class
	input.value = "Name"
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
			// Dough.update(list_el.id, "percent")
			Dough.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updatePercent(this.value, true)
		Dough.update(list_el.id,"percent")
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.className = "InfoTypeText"
	text.innerHTML = "%      "
	list_el.appendChild(text)
	
	
	var textType = document.createElement("a")
	textType.innerHTML = type
	textType.className = "InfoTypeText"
	list_el.appendChild(textType)
	// var sel = document.createElement("select")
	// var c = document.createElement("option");
	// c.text = T_FLOUR;
	// sel.options.add(c, 1);
	// var c = document.createElement("option");
	// c.text = T_WATER;
	// sel.options.add(c, 2);
	// var c = document.createElement("option");
	// c.text = T_OTHER;
	// sel.options.add(c, 2);
	// sel.addEventListener("change", function(){
	// 	Pre1.getEntry(list_el.id).updateType(this.value)
	// 	Pre1.update(list_el.id)
	// })
	// list_el.appendChild(sel)



	list_el.appendChild(close)
	list.appendChild(list_el);
	Pre1.update(list_el.id)

}
// for i in getElementsbyName("addButton"){
//  if add button.class == "addWater" -> field type = Water
// add the list el
// }
document.getElementById("addPre11").addEventListener("click", function(){createEntryField("list1", Pre1, T_FLOUR)});
document.getElementById("addPre12").addEventListener("click", function(){createEntryField("list1", Pre1, T_WATER)});
document.getElementById("addPre13").addEventListener("click", function(){createEntryField("list1", Pre1, T_OTHER)});
document.getElementById("addPre21").addEventListener("click", function(){createEntryField("list2", Pre2, T_FLOUR)});
document.getElementById("addPre22").addEventListener("click", function(){createEntryField("list2", Pre2, T_WATER)});
document.getElementById("addPre23").addEventListener("click", function(){createEntryField("list2", Pre2, T_OTHER)});
////////////////////////////////////////////////////////////////////////////////

// key down event with enter key
// document.getElementById('form').addEventListener ('keydown', function (event) {
//   if (event.which == 13) { //enter key
//      event.preventDefault();
//      let field = event.target;
    
//   }
// });