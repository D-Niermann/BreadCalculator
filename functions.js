const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Fluid"
const T_PREDOUGH = "Pref."
const T_GRAM = "gram"
const T_PERCENT = "percent"
const saveMainFolder = "./saves/"
const fs = require("fs")
if (!fs.existsSync(saveMainFolder)){fs.mkdirSync(saveMainFolder)}
if (!fs.existsSync(saveMainFolder + "fileManager.txt")){fs.writeFileSync(saveMainFolder + "fileManager.txt", "")}

const {createEntryField} = require("./createEntry.js")
const {createPredoughField} = require("./createDoughField.js")
const {Dough, Entry} = require("./Classes.js")
const {createSaveWarn,createNewWarn, createDeleteWarn} = require("./dialogs.js")
console.log("Import")
var Pre1 = new Dough("Pre-ferment 1", "Pre1");
var Pre2 = new Dough("Pre-ferment 2", "Pre2");
var Pre3 = new Dough("Pre-ferment 3", "Pre3");
// if adding more predoughs search for comments that mark where code change is needed: // !Hardcoded predough!

var Main = new Dough("Main", "Main");
Main.makeMain()
console.log("Dough defs")

class IDGen{
	constructor(){
		this.ID = 11000
	}

	get(){
		this.ID += 1
		return this.ID
	}
}
const ID = new IDGen()

console.log("ID Class def")

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
	var type1 = this.childNodes[6].innerHTML
	var type2 = dragSrcEl.childNodes[6].innerHTML
	var do_copy = false;
	if (type1!=T_PREDOUGH && type2 != T_PREDOUGH){
		do_copy = true
	}
	if (type1==type2){
		do_copy = true
	}

	// list.replaceChild(copy, list.childNodes[1])
	if (do_copy && ( this.parentElement.id==dragSrcEl.parentElement.id && this.id != dragSrcEl.id && this.nodeName=="LI")) {
		// ursprung
		console.log("source: " + dragSrcEl.childNodes[1].value)
		// target
		console.log("target: "+ this.childNodes[1].value)

		// for (let i = 0; i < dragSrcEl.childNodes.length; i++) {
		// 	const c = dragSrcEl.childNodes[i];
		// 	console.log(i)
		// 	console.log(c)
		// 	this.replaceChild(dragSrcEl.childNodes[i], this.childNodes[i])
		// }

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
  

document.getElementById("addPre11").addEventListener("click", function(){createEntryField("list1", Pre1, new Entry(ID.get(), T_FLOUR));createPredoughField("list3", Main, T_PREDOUGH, Pre1)});
document.getElementById("addPre12").addEventListener("click", function(){createEntryField("list1", Pre1, new Entry(ID.get(), T_WATER));createPredoughField("list3", Main, T_PREDOUGH, Pre1)});
document.getElementById("addPre13").addEventListener("click", function(){createEntryField("list1", Pre1, new Entry(ID.get(), T_OTHER));createPredoughField("list3", Main, T_PREDOUGH, Pre1)});

document.getElementById("addPre21").addEventListener("click", function(){createEntryField("list2", Pre2, new Entry(ID.get(), T_FLOUR));createPredoughField("list3", Main, T_PREDOUGH, Pre2)});
document.getElementById("addPre22").addEventListener("click", function(){createEntryField("list2", Pre2, new Entry(ID.get(), T_WATER));createPredoughField("list3", Main, T_PREDOUGH, Pre2)});
document.getElementById("addPre23").addEventListener("click", function(){createEntryField("list2", Pre2, new Entry(ID.get(), T_OTHER));createPredoughField("list3", Main, T_PREDOUGH, Pre2)});

document.getElementById("addPre31").addEventListener("click", function(){createEntryField("list4", Pre3, new Entry(ID.get(), T_FLOUR));createPredoughField("list3", Main, T_PREDOUGH, Pre3)});
document.getElementById("addPre32").addEventListener("click", function(){createEntryField("list4", Pre3, new Entry(ID.get(), T_WATER));createPredoughField("list3", Main, T_PREDOUGH, Pre3)});
document.getElementById("addPre33").addEventListener("click", function(){createEntryField("list4", Pre3, new Entry(ID.get(), T_OTHER));createPredoughField("list3", Main, T_PREDOUGH, Pre3)});

document.getElementById("addPreMain1").addEventListener("click", function(){createEntryField("list3", Main, new Entry(ID.get(), T_FLOUR))});
document.getElementById("addPreMain2").addEventListener("click", function(){createEntryField("list3", Main, new Entry(ID.get(), T_WATER))});
document.getElementById("addPreMain3").addEventListener("click", function(){createEntryField("list3", Main, new Entry(ID.get(), T_OTHER))});
////////////////////////////////////////////////////////////////////////////////


// !Hardcoded predough!
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
// update entry pre3 in main dough
var pre3_title = document.getElementById("Pre3_title")
pre3_title.addEventListener("focusout", function() {
	// pre2_input.innerHTML = this.value
	Pre3.name = this.value
	Main.getEntry(Pre3.id).updateName(Pre3.name)
});
pre3_title.addEventListener ('keyup', function() {
	// pre2_input.innerHTML = this.value 
	Pre3.name = this.value
	Main.getEntry(Pre3.id).updateName(Pre3.name)
});


/////////////////////////////////////////////////////////////////////////////
// Save and Load			// !Hardcoded predough!
/////////////////////////////////////////////////////////////////////////////

document.getElementById("saveButton").addEventListener("click", function(){
	saveRecipe(false)
})




function saveRecipe(overwrite){
	console.log("Save Recipe")
	const saveFolder = document.getElementById("titleInput").value + "/"	

	if (!fs.existsSync(saveMainFolder + saveFolder)){
		fs.mkdirSync(saveMainFolder + saveFolder);


		Pre1.save(saveMainFolder + saveFolder)
		Pre2.save(saveMainFolder + saveFolder)
		Pre3.save(saveMainFolder + saveFolder)
		Main.save(saveMainFolder + saveFolder)
		// some metadata save
		var saveString = ""
		var fName = saveMainFolder + saveFolder+ "Metadata" +".txt"

		// create file 
		fs.writeFileSync(fName, document.getElementById("titleInput").value + ";" + 

								document.getElementById("authorInput").value + ";" + 
								document.getElementById("textArea").value
		);

		fs.appendFileSync(saveMainFolder + "fileManager.txt", saveFolder+"\n")
	}
	else if(overwrite == true){
		Pre1.save(saveMainFolder + saveFolder)
		Pre2.save(saveMainFolder + saveFolder)
		Pre3.save(saveMainFolder + saveFolder)
		Main.save(saveMainFolder + saveFolder)
		// some metadata save
		var saveString = ""
		var fName = saveMainFolder + saveFolder+ "Metadata" +".txt"

		// create file 
		fs.writeFileSync(fName, document.getElementById("titleInput").value + ";" + 

								document.getElementById("authorInput").value + ";" + 
								document.getElementById("textArea").value
		);

		createSaveWarn(false)
	}
	else{
		createSaveWarn(true)
	}
}

function loadFiles(folderName){
	// load in the metadata
	var contentList = fs.readFileSync(saveMainFolder + folderName + "Metadata" + ".txt", "utf8").split(";")
	document.getElementById("titleInput").value = contentList[0]
	document.getElementById("authorInput").value = contentList[1]
	document.getElementById("textArea").value = contentList[2]

	// load in the entries
	Main.removeAll()
	Pre1.removeAll()
	Pre2.removeAll()
	Pre3.removeAll()


	Pre1.load(saveMainFolder + folderName)
	document.getElementById("Pre1_title").value = Pre1.name
	for (let i = 0; i < Pre1.entries.length; i++) {
		createEntryField("list1", Pre1, Pre1.entries[i], true)
		createPredoughField("list3", Main, T_PREDOUGH, Pre1)
	}
	
	
	Pre2.load(saveMainFolder + folderName)
	document.getElementById("Pre2_title").value = Pre2.name
	for (let i = 0; i < Pre2.entries.length; i++) {
		createEntryField("list2", Pre2, Pre2.entries[i], true)
		createPredoughField("list3", Main, T_PREDOUGH, Pre2)
	}
	

	Pre3.load(saveMainFolder + folderName)
	document.getElementById("Pre3_title").value = Pre3.name
	for (let i = 0; i < Pre3.entries.length; i++) {
		createEntryField("list4", Pre3, Pre3.entries[i], true)
		createPredoughField("list3", Main, T_PREDOUGH, Pre3)
	}
	

	Main.load(saveMainFolder + folderName)
	document.getElementById("Main_title").value = Main.name

	for (let i = 0; i < Main.entries.length; i++) {
		if (Main.entries[i].type != T_PREDOUGH){
			createEntryField("list3", Main, Main.entries[i], true)
		}
	}
	
	expandColl(loadListContent)
	
	
}
document.getElementById("newButton").addEventListener("click",function(){	
	createNewWarn(true)
})

function resetAll(){
	console.log("Reset All")
	document.getElementById("titleInput").value = "Title"
	document.getElementById("authorInput").value = "Author"
	document.getElementById("textArea").value = ""
	document.getElementById("Pre1_title").value = "Pre-ferment 1"
	document.getElementById("Pre2_title").value = "Pre-ferment 2"
	document.getElementById("Pre3_title").value = "Pre-ferment 3"
	document.getElementById("Main_title").value = "Main"
	// load in the entries
	Main.removeAll()
	Pre1.removeAll()
	Pre2.removeAll()
	Pre3.removeAll()
	createNewWarn(false)

}


var loadListContent = document.getElementById("loadListContent")
document.getElementById("loadButton").addEventListener("click",function(){expandColl(loadListContent)})


function expandColl(item){
	if (item.style.maxHeight == "100vh"){
		item.setAttribute("style", "max-height: 0vh;")
	}
	else{
		item.setAttribute("style", "max-height: 100vh; ")
	}
}

var loadList = document.getElementById("loadList")
var  fileCont = ""
setInterval(function(){
	
	if (fileCont != fs.readFileSync(saveMainFolder + "fileManager.txt", "utf8")){
		fileCont = fs.readFileSync(saveMainFolder + "fileManager.txt", "utf8")
		
		var len = loadList.childNodes.length
		for (let i = 0; i < len; i++) {
			const c = loadList.childNodes[0];
			loadList.removeChild(c)
		}
		
		var contents = fileCont.split("\n")
		
		var len_contents = (contents.length)-1
		for (let i = 0; i < len_contents; i++) {
			const line = contents[len_contents-1 - i]
			var list_el = document.createElement("li")
			list_el.className = "loadList-li"
			
			var div = document.createElement("div")
			div.innerHTML = line.slice(0,-1)
			div.addEventListener("click", function(){loadFiles(line)})
			div.className = "loadListDiv"
			list_el.appendChild(div)
			
			var anchor = document.createElement("a")
			anchor.innerHTML = "delete"
			anchor.setAttribute("style", "cursor: pointer;")
			anchor.addEventListener("click",function(){
				createDeleteWarn(true, line)
			})
			list_el.appendChild(anchor)
			
			loadList.appendChild(list_el)

		}
	}
},100)
var deleteFolderRecursive = function(path) {
	if( fs.existsSync(path) ) {

		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} 
			else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		console.log("Delete folder "+path)
		fs.rmdirSync(path);
	}
};

function deleteFile(folderName){
	console.log("Delete Files in "+ folderName)
	// open fileManager.txt
	var fileCont = fs.readFileSync(saveMainFolder + "fileManager.txt", "utf8")
	fileCont = fileCont.split("\n")
	// search for folderName and delete line
	for (let i = 0; i < fileCont.length; i++) {
		const line = fileCont[i];
		if (line == folderName){
			fileCont.splice(i,1)
			console.log("Spliced: " + i + ", " + folderName)
			break
		}
	}
	// save fileManager
	console.log(fileCont)
	fs.writeFileSync(saveMainFolder + "fileManager.txt", "")
	for (let i = 0; i < fileCont.length; i++) {
		if (fileCont[i] != ""){
			fs.appendFileSync(saveMainFolder + "fileManager.txt", fileCont[i]+"\n")
		}
	}

	// delete folder with folderName
	deleteFolderRecursive(saveMainFolder + folderName)
}