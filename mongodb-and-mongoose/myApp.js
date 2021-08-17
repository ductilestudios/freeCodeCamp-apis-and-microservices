require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Successful!");
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const bart = new Person({
    name: 'Bart Simpson',
    age: '10',
    favoriteFoods: ['Butterfinger', 'Krusty Burger', 'Chili']
  });
  bart.save(function(err, data) {
    if (err) return console.error(err);
    console.log("Document inserted succesfully!");
    done(null , data);
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    console.log("Document inserted succesfully!");
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    console.log(`${personName} found!`);
    done(null , data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    console.log(`${food} found!`);
    done(null , data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    console.log(`${personId} found!`);
    done(null , data);
  });  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    console.log(`${personId} found!`);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, newData) {
      if (err) return console.error(err);
      console.log(`${foodToAdd} inserted succesfully!`);
    done(null , data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
