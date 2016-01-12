
// Set up a simple base class
const TychoTest = Astro.Class({
  name: 'Tycho',
  typeField: 'type',
  fields: {
    '_eventStream': 'array',
    'name': 'string'
  }
});


const Items = new Mongo.Collection('items');
// Inherit as you might for
const KeplerTest = TychoTest.inherit({
  name: 'Kepler',
  collection: Items,
  fields: {
    someField: 'string'
  }
});

const tycho = new TychoTest();
const kepler = new KeplerTest();





const Observation = Astro.Class({
  name: 'Observations'
});


// Run basic tests on Tycho
Tinytest.add('Tycho - Basic Fields tests', (test) => {

  test.equal(TychoTest.getFieldsNames(),['_eventStream','name'],'TychoTest should have a `name` field.');
  // test.equal(tycho.type,'TychoTest','TychoTest should be `TychoTest`','boo');
  // console.log("message");
  // console.log(tycho);


});



Tinytest.add('Kepler - Basic Kepler tests', (test) => {
  console.log("message");
  console.log(kepler);
  test.equal(KeplerTest.getFieldsNames(),["_eventStream","name","_id","someField"],'Kepler should have a expected fields.');
  test.equal(kepler.type,'KeplerTest','KeplerTest should be `KeplerTest`');

});
