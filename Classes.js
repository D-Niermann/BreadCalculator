const T_OTHER = "Other"
const T_FLOUR = "Flour"
const T_WATER = "Fluid"
const T_PREDOUGH = "Pref."


class Entry{
	
	constructor(id, type){
		// console.log("Created id: "+id)

		// vars relevant for the saving entry
		this.id = id
		this.gram = 0
		this.name = "Name"
		this.lastEdited = ""
		this.percent = 0
		this.type = type


		// consts 
		this.stringSeperator = ", "
	}

	removeListEl(){
		document.getElementById(this.id).remove();	
	}
	getInfo(){
		console.log("ID: "+this.id +" Gram: "+this.gram + " %: "+ this.percent+ " Type: "+ this.type)
	}

	roundToTens(value){
		return Math.round(value*10.0)/10
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
		var childs = document.getElementById(this.id).childNodes
			for(let i = 0; i<childs.length; i++){
				if (childs[i].className == "input-text-name"){
					childs[i].value = this.name
				}
			}
	}
	updatePercent(value, fetchedFromHTML = false){
		if (this.roundToTens(this.percent) != this.roundToTens(value)){
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
					childs[i].value = this.roundToTens(this.percent)
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
	isPredough(){
		if(this.type == T_PREDOUGH){
			return true}
		else{return false}
	}

	save(){
		var string;
		string = this.id.toString() + this.stringSeperator +
				this.gram.toString() + this.stringSeperator +
				this.name.toString() + this.stringSeperator +
				this.lastEdited.toString() + this.stringSeperator +
				this.percent.toString() + this.stringSeperator +
				this.type.toString() + this.stringSeperator 
		string+= "\n"
		return string

	}

	load(stringLine){
		var strings = stringLine.split(this.stringSeperator)
		this.id = parseInt(strings[0])
		this.gram = parseInt(strings[1])
		this.name = strings[2]
		this.lastEdited = strings[3]
		this.percent = parseFloat(strings[4])
		this.type = strings[5]
		
		console.log("----------")
		console.log("Loaded Vars")
		console.log("ID: "+this.id+"... Gram: "+this.gram)
	}
}













class Dough{

	constructor(name, id){
		this.name = name
		this.id = id
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

	getTotalWeight(){
		return this.flour_total+this.fluid_total+this.other_total
	}
	getTotalHydration(){
		return 100*this.fluid_total/this.flour_total
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
			if(e.isPredough()){
				
			}
			if(e.isOther()){
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
		console.log("Entries of "+ this.id+":\n")
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			e.getInfo()
		}
		console.log("-----------------")
	}

	makeMain(){
		this.isMain = true
		this.predoughEntries = []
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
		return -1;
	}

	getAllEntries(){
		return this.entries;
	}

	removeEntry(id){
		console.log("---- OLD ------")
		this.showEntries()
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			if(e.id == id){
				e.removeListEl()
				this.entries.splice(i,1)
			}
		}
		console.log("---- NEW ------")
		this.showEntries()
	}

	removeAll(){
		for (let i = 0; i < this.entries.length; i++) {
			const e = this.entries[i];
			e.removeListEl()
		}
		this.entries = []
		this.update()
	}



	update(id=0){
		
		// fetch all entries from pre doughs
		if (this.isMain){
			// !Hardcoded predough!
			this.pre_flour_gram = 0
			this.pre_fluid_gram = 0
			this.addDough(Pre1)
			this.addDough(Pre2)
			this.addDough(Pre3)
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
				if(e.isPredough()){
					// !Hardcoded predough!
					if (e.id == "Pre1"){
						e.updateGrams(Math.round(Pre1.getTotalWeight()))
						// e.updatePercent(Math.round(Pre1.getTotalHydration()))
					}
					if (e.id == "Pre2"){
						e.updateGrams(Math.round(Pre2.getTotalWeight()))
						// e.updatePercent(Math.round(Pre2.getTotalHydration()))
					}
					if (e.id == "Pre3"){
						e.updateGrams(Math.round(Pre3.getTotalWeight()))
						// e.updatePercent(Math.round(Pre2.getTotalHydration()))
					}
				}
				if(e.isOther()){
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
			this.percent_field.value = Math.round((this.fluid_total)/(this.flour_total) * 100)
		}
			
	}	

	save(folderName){
		const fs = require("fs")
		var saveString = ""
		var fName = folderName+ this.id +".txt"

		// create file for this dough
		fs.writeFileSync(fName, "");
		// save the entrie into a line of the file
		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			if (entry.type != T_PREDOUGH){
				saveString = entry.save()
				fs.appendFileSync(fName, saveString); 
			}
		}
	}

	load(folderName){
		// load file for this dough
		const fs = require("fs")
		var fName = folderName+ this.id +".txt"

		var string = fs.readFileSync(fName,"utf8")

		// split data into lines 
		var stringEntries = string.split("\n")
		// go through each line and load the entries
		for (let i = 0; i < (stringEntries.length)-1; i++) {
			const line = stringEntries[i];
			var entry = new Entry(0,0)
			entry.load(line)
			console.log(this.id + " loading entry: "+entry.getInfo())
			this.addEntry(entry)
		}
		this.update()
	}
	
}

module.exports.Entry = Entry;
module.exports.Dough = Dough;