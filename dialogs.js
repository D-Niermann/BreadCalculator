function createSaveWarn(on=true){
	if (on){
		bgOn()
		document.getElementById("yesButton_Save").style.display = "block";
		document.getElementById("MessageSpan").innerHTML = "A recipe with this name already exists. Do you want to overwrite it?"
	}
	else{
		bgOff()
	}
	// var div = document.createElement("div")
	// div.className = "DialogMain"
	// div.setAttribute("style", "background-color: black;")
}

function createNewWarn(on=true){
	if (on){
		bgOn()
		document.getElementById("yesButton_New").style.display = "block";
		// add message
		document.getElementById("MessageSpan").innerHTML = "Are you sure you want to create a new Recipe? Unsaved changes are lost."
	}
	else{
		bgOff()
	}
}

function createDeleteWarn(on=true, line){
	if (on){
		bgOn()
		document.getElementById("yesButton_Delete").style.display = "block";
		document.getElementById("yesButton_Delete").addEventListener("click", function(){
			deleteFile(line)
			createDeleteWarn(false)
		})
		// add message
		document.getElementById("MessageSpan").innerHTML = "Are you sure you want to delete the Recipe?"
	}
	else{
		bgOff()
	}
}

// canceling
document.getElementById("overlay").addEventListener("click",function(){
	bgOff()
})
document.getElementById("noButton").addEventListener("click",function(){
	bgOff()
})

function bgOn() {
	document.getElementById("overlay").style.display = "block";
	document.getElementById("DialogMain").style.display = "block";
	document.getElementById("noButton").style.display = "block";
}

function bgOff() {
	document.getElementById("overlay").style.display = "none";
	document.getElementById("DialogMain").style.display = "none";
	document.getElementById("yesButton_New").style.display = "none";
	document.getElementById("yesButton_Delete").style.display = "none";
	document.getElementById("yesButton_Save").style.display = "none";
	document.getElementById("noButton").style.display = "none";
}

document.getElementById("yesButton_New").addEventListener("click", function(){
	resetAll()
	createNewWarn(false)
})
document.getElementById("yesButton_Save").addEventListener("click", function(){
	saveRecipe(true)
})
module.exports.createSaveWarn = createSaveWarn
module.exports.createNewWarn = createNewWarn
module.exports.createDeleteWarn = createDeleteWarn