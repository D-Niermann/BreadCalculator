const T_OTHER = "Sonstige"
const T_FLOUR = "Flour"
const T_WATER = "Liquid"
var ID = 0
const T_GRAM = "gram"
const T_PERCENT = "percent"

class Entry{

	constructor(id){
		this.id = id
		this.gram = 0
		this.name = "Name"
		this.lastEdited = ""
		this.percent = 0
		this.type = T_FLOUR
	}

	getInfo(){
		console.log(this.id+", "+this.gram+", "+this.name+", "+this.percent+", "+this.type)
	}

	updateGrams(value){
		this.gram = parseFloat(value)
		// document.getElementById(this.id).childNodes.getElementsByClassName("input-text-gram").value = "test"
		var childs = document.getElementById(this.id).childNodes
		for(let i = 0; i<childs.length; i++){
			if (childs[i].className == "input-text-gram"){
				childs[i].value = parseInt(this.gram)
			}
		}
	}
	updateName(value){
		this.name = value
	}
	updatePercent(value){
		this.percent = parseFloat(value)
		var childs = document.getElementById(this.id).childNodes
		for(let i = 0; i<childs.length; i++){
			if (childs[i].className == "input-text-percent"){
				childs[i].value = Math.round(parseFloat(this.percent))
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
}

class Dough{

	constructor(name){
		this.name = name
		this.id = 0
		this.entries = []
		console.log("Init Dough!")
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


	update(id, type = ""){
		var flour = {}
		var flour_total = 0
		var fluids = {}
		var fluid_total = 0
		console.log("Updating " + this.name)
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			if (e.isFlour()){
				flour[e.id] = e.gram;
				flour_total += e.gram;
			}
			else if(e.isWater){
				fluids[e.id] = e.gram;
				fluid_total += e.gram;
			}
		}
		
		

		for (var key in flour) {
			var percent = this.getEntry(key).gram/flour_total*100
			var grams = this.getEntry(key).percent*flour_total/100
			var le = this.getEntry(key).lastEdited
			if (le == T_GRAM){
				console.log("Updateing percents")
				this.getEntry(key).updatePercent(percent)
			}
			if (le == T_PERCENT){
				console.log("Updateing grams")
				this.getEntry(key).updateGrams(grams)
			}
		}
		for (var key in fluids) {
			var percent = this.getEntry(key).gram/flour_total*100
			var grams = this.getEntry(key).percent*flour_total/100
			var le = this.getEntry(key).lastEdited
			if (le == T_GRAM){
				console.log("Updateing percents")
				this.getEntry(key).updatePercent(percent)
			}
			if (le == T_PERCENT){
				console.log("Updateing grams")
				this.getEntry(key).updateGrams(grams)
			}
		}
		
		
			// for (var key in flour) {
				
			// }
			// for (var key in fluids) {
			// 	this.getEntry(key).updateGrams(grams)
			// }
		
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
function createEntryField(listID, Dough){
	var list = document.getElementById(listID);
	var list_el = document.createElement('li');
	list_el.id = ID;
	ID += 1;
	var entry = new Entry(list_el.id)
	Dough.addEntry(entry)


	var close = document.createElement("span")
	close.className = "close"
	close.innerHTML = "x"
	close.addEventListener("click", function() {
		Dough.removeEntry(list_el.id)
		Dough.update()
		list_el.remove()
	});

	var input = document.createElement("input");
	input.type = "text";
	input.className = "input-text-gram"; // set the CSS class
	input.value = "0"
	input.addEventListener ('keydown', function (event) {
		if (event.which == 13) { //enter key
			Dough.getEntry(list_el.id).updateGrams(this.value)
			Dough.getEntry(list_el.id).lastEdited = T_GRAM
			Dough.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updateGrams(this.value)
		Dough.getEntry(list_el.id).lastEdited = T_GRAM
		Dough.update(list_el.id)
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.innerHTML = "g  "
	list_el.appendChild(text)

	var input = document.createElement("input");
	input.type = "text";
	input.className = "input-text-name"; // set the CSS class
	input.value = "Name"
	input.addEventListener ('keydown', function (event) {
		if (event.which == 13) { //enter key
			Dough.getEntry(list_el.id).updateName(this.value)
			Dough.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
			Dough.getEntry(list_el.id).updateName(this.value)
			Dough.update(list_el.id)
		});
	list_el.appendChild(input); // put it into the DOM

	
	var input = document.createElement("input");
	input.type = "text";
	input.className = "input-text-percent"; // set the CSS class
	input.value = "0"
	input.addEventListener("focusout", function(event){});

	input.addEventListener ('keydown', function(event) {
		if (event.which == 13) { //enter key
			// only if value is different to old vlaue -> implement everything into an update funciton and a fetch function? or update with keyword arg
			Dough.getEntry(list_el.id).updatePercent(this.value)
			Dough.getEntry(list_el.id).lastEdited = T_PERCENT
			// Dough.update(list_el.id, "percent")
			Dough.update(list_el.id)
		} });
	input.addEventListener ('focusout', function (event) {
		Dough.getEntry(list_el.id).updatePercent(this.value)
		Dough.getEntry(list_el.id).lastEdited = T_PERCENT
		Dough.update(list_el.id,"percent")
		});
	list_el.appendChild(input); // put it into the DOM
	text = document.createElement("a")
	text.innerHTML = "%      "
	list_el.appendChild(text)
	
	
	
	var sel = document.createElement("select")
	var c = document.createElement("option");
	c.text = T_FLOUR;
	sel.options.add(c, 1);
	var c = document.createElement("option");
	c.text = T_WATER;
	sel.options.add(c, 2);
	var c = document.createElement("option");
	c.text = T_OTHER;
	sel.options.add(c, 2);
	sel.addEventListener("change", function(){
		Pre1.getEntry(list_el.id).updateType(this.value)
		Pre1.update(list_el.id)
	})
	list_el.appendChild(sel)


	list_el.appendChild(close)
	list.appendChild(list_el);
	Pre1.update(list_el.id)

}
// for i in getElementsbyName("addButton"){
//  if add button.class == "addWater" -> field type = Water
// add the list el
// }
document.getElementById("addPre1").addEventListener("click", function(){createEntryField("list1", Pre1)});
document.getElementById("addPre2").addEventListener("click", function(){createEntryField("list2", Pre2)});
////////////////////////////////////////////////////////////////////////////////

// key down event with enter key
// document.getElementById('form').addEventListener ('keydown', function (event) {
//   if (event.which == 13) { //enter key
//      event.preventDefault();
//      let field = event.target;
    
//   }
// });