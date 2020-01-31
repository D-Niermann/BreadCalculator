

document.getElementById("add").addEventListener("click", function() {
    var list = document.getElementById('list');
    var entry = document.createElement('li');
   
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-gramm"; // set the CSS class
    input.value = "0"
    entry.appendChild(input); // put it into the DOM
   
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-name"; // set the CSS class
    input.value = "Name"
    entry.appendChild(input); // put it into the DOM
  
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-percent"; // set the CSS class
    input.value = "0"
    entry.appendChild(input); // put it into the DOM
    
    var sel = document.createElement("select")
    var c = document.createElement("option");
    c.text = "Mehl";
    sel.options.add(c, 1);
    var c = document.createElement("option");
    c.text = "Wasser";
    sel.options.add(c, 2);
    var c = document.createElement("option");
    c.text = "Sonstiges";
    sel.options.add(c, 2);

    entry.appendChild(sel)


    list.appendChild(entry);
});


// key down event with enter key
// document.getElementById('form').addEventListener ('keydown', function (event) {
//   if (event.which == 13) { //enter key
//      event.preventDefault();
//      let field = event.target;
    
//   }
// });