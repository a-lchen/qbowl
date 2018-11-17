const timerbar = document.querySelector('.timerbar');

var seconds;
var tens;
var savedSeconds;
var savedTens;

const refreshTimer = () => {
  //called upon a buzz
  savedSeconds = seconds;
  savedTens = tens;
  seconds = 0;
  tens = 0;
}


const showTimer = (s, t, buzz) => {
  clearInterval(Interval);
  refreshTimer();
  seconds = s;
  tens = t;
  console.log("showing timer")
  Interval = setInterval(function() {startTimer(buzz)}, 10);
  timerbar.classList.remove("hidden")
}

const hideTimer = (time) => {
  seconds = 0;
  tens = 0;
  appendTens.innerHTML = "00"
  appendSeconds.innerHTML = "00"
  clearInterval(Interval);
  timerbar.classList.add("hidden")
}


function startTimer (buzz) {
    tens--; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens < 0) {
      seconds--;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 99;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds < 9) {
      appendSeconds.innerHTML = "0" + seconds;
    }


    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

    if (seconds < 0){
      clearInterval(Interval);
      hideTimer();
      answerattempt.classList.add('hidden');
      answerbox.value = "";
      if (buzz == true){
        console.log("ping");
        socket.emit('failure-answer', {"userid": myid, "answer": "", "timeout": true, "penalty": 0});
      }
      else{
        state = "stopped"
        document.getElementById("answer-text").innerText = "No one answered! The correct answer was: " + answer[0]
      }
    }
  
  }
