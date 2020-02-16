const  { Entry } = require("./Classes.js");
const T_PREDOUGH = "Pref."

function createPredoughField(listID, Dough, type, Predough){
	var list = document.getElementById(listID);
	if (document.getElementById(Predough.id)==null){
		var list_el = document.createElement('li');
		list_el.setAttribute("style","transition: 0.5s;")
		list_el.id = Predough.id;
		var entry = new Entry(list_el.id, type)
		Dough.addEntry(entry)
		var img = document.createElement("img")
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
		});

		var input = document.createElement("input");
		input.type = "number";
		input.className = "input-text-gram"; // set the CSS class
		input.value = Predough.getTotalWeight()
		list_el.appendChild(input); // put it into the DOM
		text = document.createElement("a")
		text.innerHTML = " g "
		text.setAttribute("style",'margin-right: 10px;')
		text.className = "InfoTypeText"
		input.setAttribute("tabindex", "-1")
		input.onmousedown=function(){return false}
		list_el.appendChild(text)

		var input = document.createElement("input");
		input.type = "text";
		input.className = "input-text-name"; // set the CSS class
		input.value = Predough.name
		input.onmousedown= "return false;"
		input.setAttribute("tabindex", "-1")
		input.onmousedown=function(){return false}
		input.setAttribute("style",'margin-right: 20px;')
		// input.setAttribute("style",'font-size: 12pt;')
		// input.setAttribute("style",'color: rgba(70, 51, 10, 0.936);')
		list_el.appendChild(input); // put it into the DOM

		
		var input = document.createElement("input");
		input.type = "number";
		input.className = "input-text-percent"; // set the CSS class
		input.value = Predough.getTotalHydration()
		input.onmousedown= "return false;"
		input.setAttribute("tabindex", "-1")
		input.setAttribute("style", "color: rgb(0,0,0,0)")
		list_el.appendChild(input); // put it into the DOM
		
		text = document.createElement("a")
		text.className = "InfoTypeText"
		text.innerHTML = "     "
		text.setAttribute("style",'margin-right: 40px;')
		list_el.appendChild(text)
		
		
		var textType = document.createElement("a")
		textType.innerHTML = type
		textType.className = "InfoTypeText-transparent"
		textType.setAttribute("style", "color: rgb(0,0,0,0)")
		list_el.appendChild(textType)


		list_el.appendChild(close)
		list_el.draggable = true
		
		// for (let i = 0; i < list.childNodes.length; i++) {
		
		list.insertBefore(list_el,list.childNodes[1])
		
		
		// }

		Dough.update(list_el.id)
		

	}	
	
}

module.exports.createPredoughField = createPredoughField;