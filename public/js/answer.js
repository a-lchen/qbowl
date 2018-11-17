const answerbox = document.querySelector('.answer-textbox');
const answerbutton = document.querySelector('.answer-button');
const answerattempt = document.querySelector('.answer-attempt');
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var answer_array = [];
var seconds = 00;
var tens = 00; 

var Interval;


function levenshteinDistance(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }


  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

const successful = (answer, userid) => {
  socket.emit('success-answer', {"userid": userid, "answer": answer})
}


const evalAnswer = (myanswer, actualanswers) => {
  score = 0
  actualanswers;
  for (i = 0; i < actualanswers.length; i++){
    if (levenshteinDistance(myanswer, actualanswers[i]) < 3){
      console.log(myanswer + " pairs with " + actualanswers[i])
      score+=1
    }
  }
  success = (score > 0)
  console.log("the score for this answer was " + score)
  return success

} 

const showAnswerBox = () => {
  answerattempt.classList.remove('hidden')
  answerbox.classList.remove("incorrect")
  answerbox.classList.remove("correct")
  answerbox.focus();
}


answerbutton.addEventListener('click', (e) => {
  myanswer = answerbox.value;
  // console.log("your answer was: " + myanswer);
  // console.log("the actual answer was " + answer);
  success = evalAnswer(myanswer, answer);
  answerattempt.classList.add('hidden');
  answerbox.value = "";
  if (success){
    successful(myanswer, myid);
  }
  else{
    if (state === "interrupt"){
      socket.emit('failure-answer', {"userid": myid, "answer": myanswer, "penalty": -5});
    }
    else if (state === "answering"){
      socket.emit('failure-answer', {"userid": myid, "answer": myanswer, "penalty": 0});

    }
    // if (state === "interrupt"){
    //   state = "reading"
    // }
    // else if (state === "buzz"){
    //   state = "stopped"
    // }

  }


})