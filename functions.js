var closebtns = document.getElementsByClassName("close");
var i;

/* Loop through the elements, and hide the parent, when clicked on */
for (i = 0; i < closebtns.length; i++) {
  console.log(i)
  closebtns[i].addEventListener("click", function() {
  this.parentElement.style.display = 'none';
});
}

////////////////////////////////////////////
// ZUTAT SPALTE
////////////////////////////////////////////
document.getElementById("add").addEventListener("click", function() {
    var list = document.getElementById('list');
    var entry = document.createElement('li');
    var close = document.createElement("span")
    close.className = "close"
    close.innerHTML = "x"
    close.addEventListener("click", function() {
      this.parentElement.style.display = 'none';
    });

    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-gramm"; // set the CSS class
    input.value = "0"
    input.addEventListener ('keydown', function (event) {
      if (event.which == 13) { //enter key
         event.preventDefault();
         let field = event.target;
        console.log("Updated Grams")
      } });
    entry.appendChild(input); // put it into the DOM
   
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-name"; // set the CSS class
    input.value = "Name"
    input.addEventListener ('keydown', function (event) {
      if (event.which == 13) { //enter key
         event.preventDefault();
         let field = event.target;
        console.log("Updated Name")
      } });
    entry.appendChild(input); // put it into the DOM
  
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text-percent"; // set the CSS class
    input.value = "0"
    input.addEventListener("focusout", function(event){});

    input.addEventListener ('keydown', function(event) {
      if (event.which == 13) { //enter key
         event.preventDefault();
         let field = event.target;
        console.log("Updated Percent")
      } });
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


    entry.appendChild(close)
    list.appendChild(entry);
});
////////////////////////////////////////////////////////////////////////////////

// key down event with enter key
document.getElementById('form').addEventListener ('keydown', function (event) {
  if (event.which == 13) { //enter key
     event.preventDefault();
     let field = event.target;
    
  }
});