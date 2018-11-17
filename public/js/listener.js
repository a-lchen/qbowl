
socket.on("question", (questionObj) => {
  question = questionObj[0];
  answer = questionObj[1];
  //answerattempt.innerText = ""
  state = "reading";
  content.innerText = "";
  console.log("question is: " + question);
  question_array.push(question);
  answer_array.push(answer);
  current_question += 1;
  interval = 50;
  showTimer(Math.floor((question.length*interval)/1000) + 8, Math.floor(((question.length*interval)/10)%100), false);
  console.log("length of this question is: " + question.length + " which translates to " + question.length*interval)
  showText(question, 0, interval, current_question);
  
})

socket.on('key', (keyreturn) =>{
  user = keyreturn.user;
  value = keyreturn.value;
  if (parseInt(user) !== myid && value !== ""){
    document.getElementById("answer-text").innerText = players[user].name + ": " + value;
  }
})

socket.on('buzzes', (first) => {
  //answerattempt.innerText = first + " was the first one to buzz! "
  showTimer(8,0, true)
  if (parseInt(first) !== myid){
    document.getElementById("answer-text").innerText = players[first].name + " was the first one to buzz!"
  }
  if (state === "reading"){
    state = "interrupt";
  }
  else if (state === "awaiting"){
    state = "answering";
  }
  if (parseInt(first) === myid){
    showAnswerBox();
  }
})

socket.on('success-answer', (ansobj) => {
  console.log(ansobj.answerer.name + " answered correctly with answer " + ansobj.answer);
  players = ansobj.users;
  state = "stopped";
  answerbox.classList.add("correct");
  updateScore();
  hideTimer();
  if (ansobj.answerer === myid){
    document.getElementById("answer-text").innerText = "Correct! :)"
  }

  else{
    document.getElementById("answer-text").innerText = players[ansobj.answerer.id].name + " answered correctly with " + ansobj.answer + "!";
  }
})

socket.on('failure-answer', (ansobj) => {
  if (state === "interrupt"){
    state = "reading";
  }
  else if (state === "answering"){
    state = "awaiting";
  }
  players = ansobj.users;
  answerbox.classList.add("incorrect");
  updateScore();
  hideTimer();
  showTimer(savedSeconds, savedTens, false);
  if (ansobj.answerer === myid){
    document.getElementById("answer-text").innerText = "Incorrect :("
  }

  else{
    document.getElementById("answer-text").innerText = players[ansobj.answerer.id].name + " answered incorrectly with " + ansobj.answer
  }
})

socket.on('activate', (activateObject) => {
  players = activateObject.users;
  if (myid === activateObject.oldid){
    myid = activateObject.userid;
  }
  initScore();
})

