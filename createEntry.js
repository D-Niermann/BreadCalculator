// const  { Entry } = require("./Classes.js");
////////////////////////////////////////////
// ZUTAT SPALTE
////////////////////////////////////////////
function createEntryField(listID, Dough, Entry, loaded = false){
	var list = document.getElementById(listID);
	var list_el = document.createElement('li');
	list_el.setAttribute("style","transition: 0.5s;")
	list_el.id = Entry.id;
	
	if (loaded == false){
		Dough.addEntry(Entry)
	}
	var img = document.createElement(	"img")
	img.src = "./dragButton.png"
	img.alt=""
	img.className = "unselectable"
	img.draggable = false
	img.width="15" 
	img.style = "margin-right: 5px;"
	img.height="15"
	
	list_el.appendChild(img)
	list_el.addEventListener('dragstart', dragStart);
	list_el.addEventListener('dragover', dragOver);
	list_el.addEventListener('dragleave', dragLeave);
	list_el.addEventListener('drop', dragDrop);

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
	input.value = parseFloat(Entry.gram)
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
	input.value = Entry.name
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
	input.value = parseFloat(Entry.percent)
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
	textType.innerHTML = Entry.type
	textType.className = "InfoTypeText-transparent"
	list_el.appendChild(textType)


	list_el.appendChild(close)
	list_el.draggable = true
	list.appendChild(list_el);

	Dough.update(list_el.id)	
	

	
	
	Main.update(list_el.id)
}

module.exports.createEntryField = createEntryField;