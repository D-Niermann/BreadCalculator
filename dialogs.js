function createSaveWarn(on=true){
	if (on){
		bgOn()
	}
	else{
		bgOff()
	}
	// canceling
	document.getElementById("overlay").addEventListener("click",function(){
		bgOff()
	})

	// var div = document.createElement("div")
	// div.className = "DialogMain"
	// div.setAttribute("style", "background-color: black;")
}


function bgOn() {
	document.getElementById("overlay").style.display = "block";
	document.getElementById("DialogMain").style.display = "block";
	document.getElementById("yesButton").style.display = "block";
	document.getElementById("noButton").style.display = "block";
}

function bgOff() {
	document.getElementById("overlay").style.display = "none";
	document.getElementById("DialogMain").style.display = "none";
	document.getElementById("yesButton").style.display = "none";
	document.getElementById("noButton").style.display = "none";
}

module.exports.createSaveWarn = createSaveWarn