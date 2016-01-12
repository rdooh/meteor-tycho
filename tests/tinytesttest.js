
// Set up a simple base class
const TychoTest = Astro.Class({
  name: 'Tycho',
  fields: {
    '_eventStream': 'array',
    'name': 'string'
  }
});


const Items = new Mongo.Collection('items');
// Inherit as you might for
const KeplerTest = TychoTest.inherit({
  name: 'Kepler',
  typeField: 'type',
  collection: Items,
  fields: {
    someField: 'string'
  }
});

const tycho = new TychoTest();
const kepler = new KeplerTest();
console.log('kepler object', kepler);





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
  test.equal(_.difference(KeplerTest.getFieldsNames(),["_eventStream","name","_id","someField","type"]),[],'Kepler should have a expected fields.');
  test.equal(_.difference(["_eventStream","name","_id","someField"],KeplerTest.getFieldsNames()),[],'Kepler should have a expected fields.');
  test.equal(kepler.type,'Kepler','KeplerTest type should be `Kepler`');

});
