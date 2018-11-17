var question = document.querySelector('.question');
var content = document.querySelector('.question .content')
var question_array = [];


const showText = function (message, index, interval, qid) {
  if (index < message.length && qid === current_question) {
    if (state === "reading"){
      content.append(message[index++]);
    }
    if (index == message.length-1){
      state = "awaiting"
      
    }
    else{
      setTimeout(function () { showText(message, index, interval, qid); }, interval);
    }
  }

}



