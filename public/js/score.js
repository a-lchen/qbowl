const scorediv = document.querySelector('.score');


const updateScore = function(){
  console.log("updating");
  for (var i in players) {
    var row = document.getElementById(i);
    children = row.children
    name = row.children[1]
    score = row.children[2]
    negs = row.children[3]
    console.log(children)
    console.log(players[i])
    if (name.innerText !== players[i].name){
      name.innerText = players[i].name
    }
    if (score.innerText !== players[i].score){
      score.innerText = players[i].score
    }
    if (negs.innerText !== players[i].negs){
      negs.innerText = players[i].negs
    }
  }
}


const initScore = function(){
  var tbl = document.getElementById('score-table')
  tbl.innerHTML = "";
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");

  var starCell = document.createElement("td");
  var starCellStar = document.createElement("i");
  starCellStar.setAttribute("class", "fa fa-star");
  starCell.appendChild(starCellStar);
  starCellStar.setAttribute("style", "height: 10px;")
  row.appendChild(starCell);

  var nameCell = document.createElement("td");
  var nameCellText = document.createTextNode("Name");
  nameCell.appendChild(nameCellText);
  row.appendChild(nameCell);

  var scoreCell = document.createElement("td");
  var scoreCellText = document.createTextNode("Score");
  scoreCell.appendChild(scoreCellText);
  //scoreCell.setAttribute("class", "scoreCell")
  row.appendChild(scoreCell);

  var negCell = document.createElement("td");
  var negCellText = document.createTextNode("Negs");
  negCell.appendChild(negCellText);
  //negCell.setAttribute("class", "negCell")
  row.appendChild(negCell);
  tblBody.appendChild(row)
  for (var i in players) {
    // creates a table row
    var row = document.createElement("tr");

    var starCell = document.createElement("td");
    var starCellText = document.createTextNode("5");
    starCell.appendChild(starCellText);
    var starCellStar = document.createElement("i");
    starCellStar.setAttribute("class", "fa fa-star");

    starCell.setAttribute("class", "starCell");
    starCell.appendChild(starCellStar);
    row.appendChild(starCell);

    var nameCell = document.createElement("td");
    var nameCellText = document.createTextNode(players[i].name);
    nameCell.appendChild(nameCellText);
    nameCell.setAttribute("class", "nameCell")
    row.appendChild(nameCell);
 
    var scoreCell = document.createElement("td");
    var scoreCellText = document.createTextNode(players[i].score);
    scoreCell.appendChild(scoreCellText);
    scoreCell.setAttribute("class", "scoreCell")
    row.appendChild(scoreCell);

    var negCell = document.createElement("td");
    var negCellText = document.createTextNode(players[i].negs);
    negCell.appendChild(negCellText);
    negCell.setAttribute("class", "negCell")
    row.appendChild(negCell);



    row.setAttribute("id", players[i].id)
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}