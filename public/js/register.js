const form = document.querySelector('.js-join');


const getUserInfo = () => {
  user = JSON.parse(localStorage.getItem('user')) || {};
  if (user.name) {
    form.querySelector('[name=name]').value = user.name;
    form.querySelector('[name=team]').value = user.team;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var user = {}
  user.name = form.querySelector('[name=name]').value;
  user.score = 0;
  user.negs = 0;
  if (!user.id) {
    myid = Math.floor(Math.random() * new Date());
    user.id = myid;
  }

  console.log("Id set: " + myid)
  socket.emit('join', user);
  // joinedInfo.innerText = `${user.name} on Team ${user.team}`;
  // form.classList.add('hidden');
  // joined.classList.remove('hidden');
  $('#regmodal').modal('hide');

})
