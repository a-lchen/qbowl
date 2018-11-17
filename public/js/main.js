/*for stuff for all files*/
const socket = io()

var current_question = 0
var answer = "None"
//var stop = true
var players = []
var question_array = []
var myid = undefined; 
//var interrupt = true;
var state = "stopped"
//possible states: stopped, interrupt, reading, paused, awaiting, answering

$(document).ready(function(){
    $('#regmodal').modal('show');
    $('#name-input')[0].focus();
});


document.body.onkeyup = function(e){
  
  if (e.keyCode == 13){
    console.log("enter")
    if (document.getElementById("answer-textbox").value != ""){
      answerbutton.click();
    }
  }
  if ((document.getElementById("answer-textbox") !== document.activeElement) && (document.getElementById("name-input") !== document.activeElement)&& myid != undefined)
  {
    if(e.keyCode == 32){
      if(state === "awaiting" || state === "reading"){
        console.log("space!")
        console.log("Id number " + myid + "buzzed ")
        document.getElementById("answer-text").innerText = "";
        socket.emit('buzz', myid)
      }
      else{
        console.log("cant buzz right now, your state is: " + state)
      }
    }
    if(e.keyCode == 65){
        console.log("clear")
        socket.emit('clear')
    }
//CHANGEEEEE
    if (e.keyCode == 78 && state === "stopped"){
        console.log("next")
        socket.emit("next")
    }
  }

  if (document.getElementById("answer-textbox") === document.activeElement){
    socket.emit("key", {"value" : answerbox.value, "user" : myid});
  }

}
