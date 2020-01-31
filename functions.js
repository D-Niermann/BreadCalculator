var closebtns = document.getElementsByClassName("close");
var i;

for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    var list = document.getElementById('list');
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode("asdasd"));
    list.appendChild(entry);
  });
}