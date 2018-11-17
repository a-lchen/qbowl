const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express();
const server = http.Server(app);
const io = socketio(server);
const mongoose = require('mongoose');

const title = 'Buffer Buzzer'

mongoose.connect('mongodb://user:pass@ds153958.mlab.com:53958/qb-questions')
questions = undefined
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
  Packet.find({}, function(err, packet){
  	if (err){
  	  console.log("error")
  	}
  	else{
  	  console.log(packet)
  	  questions = packet[0]['packet']
  	  console.log(packet)
  	  console.log(questions)
  	}
  });
  console.log("in connected: " + questions)
});

var packetSchema = mongoose.Schema({
  packet: [{answer: [String], question: String}]
});

var Packet = mongoose.model('questions', packetSchema);

// questions = [

// {"question": "(1) In a novel by this author, the title character takes over Merlin’s position by predicting an eclipse. Hank Morgan is a creation of this man, who wrote about the deceitful Duke and Dauphin and a boy who tricks children in (*) St Petersburg, Missouri into whitewashing a fence. A Connecticut Yankee in King Arthur’s Court and a novel about a boy who rafts down the Mississippi River are by, for ten points, what creator of Huck Finn and Tom Sawyer? ", "answer": ["Twain", "Clemens"]},
// {"question": "(2) This force is related to an accelerating observer by the Equivalence Principle of general relativity. Its ﬁelds can be visualized as wells, which spacecraft can use to speed up using this force as a (*) “slingshot.” Galileo demonstrated that the effects of this force are constant using two balls of different masses. For ten points, name this force that accelerates objects at 9.81 meters per second squared toward the Earth. ", "answer": ["gravity", "gravitation"]},
// {"question": "(3) This political party’s primary ofﬁce was organized by Martin Bormann, the private secretary of its leader. Kurt Georg Kiesinger led the Christian Democrats and served as Chancellor in the 1960s despite his former membership in this political party. The (*) SS and SA were paramilitary wings of this party, whose propaganda was organized by Joseph Goebbels. For ten points, name this socialist political party that ruled the Third Reich of Germany under Adolf Hitler. ", "answer": ["Nazi", "National Socialist", "NS", "Nazi"]},
// {"question": "(4) For one work in this genre, Michel Fokine [foh-keen] planned for three puppets on a wall to come to life. Prince Ivan spares a magical bird in another of these works that was produced by (*) Sergei Diaghilev. Igor Stravinsky’s Petrushka and The Firebird are examples of, for ten points, what genre of artistic dance that combines classical music with challenging choreography, often incorporating moves like jet´es [zheh-tays] and pli´es [plee-ays]? ", "answer": ["ballet"]},
// {"question": "(5) A group of texts found in these buildings at Saqqara describe a king hunting and eating the gods. Graduating sizes of mastabas were used by Imhotep to create Djoser’s (*) “stepped” one of these buildings, and three of these structures belonging to Menkaure, Khafre, and Khufu were built near Giza. For ten points, name these enormous structures used to bury Egyptian Pharaohs. ", "answer": ["pyramid"]},
// {"question": "(6) These mathematical objects are the solutions to ordinary differential equations, which relate them with their derivatives. Composition of these objects make the codomain of one of them the domain of the other. The (*) vertical line test can easily determine whether a given graph describes one of these objects. For ten points, name this mathematical term for a relation in which every input has exactly one possible output, often written in “f of x” form. ", "answer": ["function"]},
// {"question": "(7) A character in this novel grows to over ten feet tall after being put on a stretching machine, since he had tried to appear on TV by using a shrink ray. The title character of this novel is deemed more virtuous than children like Mike (*) Teavee and Augustus Gloop after he opens a Whipple-Scrumptious Fudgemallow Delight. For ten points, name this Roald Dahl novel in which Willy Wonka entrusts his Oompa-Loompas to the title boy after he ﬁnds a golden ticket. ", "answer": ["Charlie and the Chocolate Factory"]},
// {"question": "(8) On this date in 1929, Albert Kachelleck, the Gusenberg brothers, and four other members of Bugs Moran’s gang were killed, probably on the orders of (*) Al Capone. This Christian feast day celebrates a saint who, according to legend, broke Roman law by performing weddings for soldiers. A Prohibition-era gangster massacre took place on, for ten points, what holiday now often celebrated with ﬂowers and written expressions of love? ", "answer": ["February 14", "Valentine’s", "Valentine’s Day Massacre"]},
// {"question": "(9) After this event, critics complained that a two-year timeline has not yet begun because no “ofﬁcial notice” was given that Article 50 would be invoked. In its aftermath, Nigel Farage stepped down as a party leader and (*) Theresa May replaced David Cameron as Prime Minister. Stock markets plunged after news broke of, for ten points, what June 2016 public referendum that decided to end a country’s participation in a European political community? ", "answer": ["Brexit", "UK", "referendum", "leave the EU", "Britainvote", "leave the EU"]},
// {"question": "(10) Three atoms of this element are present in acetone, the simplest ketone; one of those atoms is double bonded with oxygen. This element’s four valence electrons allow it to form four bonds with other elements. This element’s allotropes include (*) diamond, graphite, and stable nanotubes, and its 14-amu isotope is used in radiometric dating. For ten points, name this element, the focus of organic chemistry, with atomic number 6 and atomic symbol C. ", "answer": ["carbon", "C"]},
// {"question": "(11) Characters with this profession include Ornstein, the captain of Gwyn’s Four in Dark Souls. In a 2014 game partially titled for this profession, players ﬁght the Order of No Quarter and use a shovel as a weapon. In Hearthstone, taunt minions can be (*) killed by the battlecry of a Black one of these warriors, who says “None shall pass” in reference to a skit from Monty Python and the Holy Grail. For ten points, name this class of warriors that, in video games, often ﬁght dragons with swords. ", "answer": ["knight", "Dragon Slayer"]},
// {"question": "(12) This biblical ﬁgure’s father described him as either a “fruitful vine” or a “wild donkey’s foal,” and he was thrown in jail for refusing the romantic advances of Potiphar’s wife. This man slipped a silver cup into a bag of grain belonging to his brother, (*) Benjamin. This man’s brothers, including Gad and Judah, sold him into slavery out of jealousy, since he was the son of Rachel and the favorite of his father, Jacob. For ten points, name this biblical man who owned a beautiful coat. ", "answer": ["Joseph"]},
// {"question": "(13) This country is home to the Turpan Water System, which collects runoff from the Flaming Mountains. Monks in this country accidentally altered the dangerous conﬂuence of three rivers when they created a giant stone statue to bless sailors traversing it. A tomb for one leader of this country contained a (*) mercury river and an army of Terracotta soldiers. The Leshan Buddha is located in, for ten points, what country, which was historically defended by its Great Wall? ", "answer": ["China", "Middle Kingdom", "Zhongguo"]},
// {"question": "(14) This author told a ﬂower that “beauty is its own excuse for being” in “The Rhodora.” A “transparent eyeball” absorbs all the world has to offer in one of this man’s essays, and a speech he gave at Harvard was published as “The (*) American Scholar.” This author wrote that “a foolish consistency is the hobgoblin of little minds” and rented the use of a pond to his friend, Henry David Thoreau. For ten points, name this Transcendentalist author of the essays “Nature” and “Self-Reliance.” ", "answer": ["Emerson"]},
// {"question": "(15) A failure to complete this project was remedied by Scotland’s 1707 union with England, as Scottish ﬁnanciers failed to complete it at the Gulf of Dari´en. When this project was completed in 1914, it incorporated a valley through the Gaillard Cut, the man-made (*) Gatun Lake, and a series of three locks into a 48-mile long structure. For ten points, name this engineering project that cut across Central America to connect the Atlantic and Paciﬁc Oceans. ", "answer": ["Panama Canal"]},
// {"question": "(16) One of these events radiates from Eltanin and Rastaban and is produced by Earth’s intersection with Giacobini-Zinner’s debris path. Another of these events appears to originate from the constellation Perseus, as seen from the (*) ground, and occurs each year in August. The Draconids and Perseids are examples of, for ten points, what brilliant celestial displays in which hundreds of “shooting stars” appear? ", "answer": ["meteor shower"]},
// {"question": "(17) In a painting by this artist, ﬁve peasants gather around the title food under the light of a single lantern. This man painted a yellow restaurant in Caf´e Terrace at Night, and this artist of The Potato Eaters also painted a series of (*) Sunﬂowers while living in Arles. This man painted the village of Saint-R´emy [son-ray-mee] under a swirling sky while institutionalized for cutting off his own ear. For ten points, name this Dutch painter of Starry Night. ", "answer": ["van Gogh"]},
// {"question": "(18) These plastids contain translocons called Tic and Toc, and replicate independently in the mesophyll of leaves. Within these double-membraned organelles, a ﬂuid called (*) stroma surrounds grana, stacks of thylakoids that carry out light-dependent reactions. For ten points, name these cell organelles that contain chlorophyll, a green pigment that helps conduct photosynthesis. ", "answer": ["chloroplast"]},
// {"question": "(19) In a short story written in this language, the book The Combed Thunderclap is kept in an inﬁnite library of hexagonal rooms. A poet wrote in this language that “tonight I can write the saddest lines” as part of his (*) Twenty Love Poems and a Song of Despair. The Garden of Forking Paths is a collection in, for ten points, what language that was used by Jorge Luis Borges and Pablo Neruda, writers from Argentina and Chile? ", "answer": ["Spanish", "Espa˜nol"]},
// {"question": "(20) A wagon train retreating from this battle was caught at Monterey Pass, though George Meade couldn’t catch up to inﬂict serious damage. On the last day of this battle, Lewis Armistead broke the enemy line at “the Angle,” a spot now commemorated as the (*) “High Water Mark of the Confederacy,” and Pickett’s Charge failed to turn the tide of this July 1863 battle. For ten points, name this battle of the Civil War, whose site was made a cemetery by President Lincoln in a famous address. ", "answer": ["Gettysburg", "Gettysburg"]},
// ]



const getQuestions = () => {


}

var dataindex = -1

let data = {
  users: {},
}

var buzzes = [];

const getData = () => Object.keys(data).reduce((d, key) => {
  d[key] = data[key] instanceof Set ? [...data[key]] : data[key]
  return d
}, {})


const checkUser = (user) => {
  var same = false;
  for (var key in data.users){
    if (data.users[key].name === user.name){
      same = true;
      return key;
    } 
  }
  if (same === false){
    data.users[user.id] = user;
    return user.id;
  }
}


app.use(express.static('public'))
app.set('view engine', 'hbs')



app.get('/', (req, res) => res.render('index', { title }))
//app.get('/host', (req, res) => res.render('host', Object.assign({ title }, getData())))

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    key = checkUser(user)
    // data.users[user.id] = user;
    // io.emit('active', [...data.users].length)
    console.log("returning this user " + JSON.stringify(data.users[key]));
    io.emit('activate', {"users": data.users, "userid": data.users[key].id, "oldid": user.id});
    console.log(`${user.name} joined!`);
    console.log("Users: " + JSON.stringify(data.users));
  })

  socket.on('key', (key) => {
    value = key.value
    user = key.user
    console.log("got new value: " + key);
    io.emit("key", {"user": user, "value": value});
  })

  socket.on('buzz', (userid) => {
    buzzes.push(`${userid}`)
    console.log(buzzes.size)
    console.log(buzzes)
    io.emit('buzzes', buzzes[buzzes.length-1])
    console.log(`${userid} buzzed in!`)
  })

  socket.on('next', () => {
    dataindex += 1
    console.log("in next: " + JSON.stringify(questions))
    io.emit('question', [questions[dataindex].question, questions[dataindex].answer])
    data.buzzes = new Set()
    console.log(`Clear buzzes`)
  })

  socket.on('success-answer', (ansobj) => {
    console.log(ansobj)
    data.users[ansobj.userid].score = data.users[ansobj.userid].score + 10
    io.emit('success-answer', {"answer": ansobj.answer, "answerer": data.users[ansobj.userid], "users": data.users})
  })

  socket.on('failure-answer', (ansobj) => {
    console.log(data.users)
    console.log(ansobj)
    data.users[ansobj.userid].score = data.users[ansobj.userid].score + ansobj.penalty;
    if (ansobj.penalty < 0){
      data.users[ansobj.userid].negs = data.users[ansobj.userid].negs + 1;
    }
    io.emit('failure-answer', {"answer": ansobj.answer, "answerer": data.users[ansobj.userid], "users": data.users});
  })

})

server.listen(8000, () => console.log('Listening on 8000'))
