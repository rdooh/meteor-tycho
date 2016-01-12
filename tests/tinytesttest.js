
// Set up a simple base class
const TychoTest = Astro.Class({
  name: 'Tycho', // not going to be needed
  fields: {
    '_eventStream': {
      type: 'array',
      default: function() {
        return [];
      }
    },
    'name': 'string'
  }
});


const Observation = Astro.Class({
  name: 'Observation', // not going to be needed
  // these fields actually represent a user model, not the base class...
  // but this will be a surrogate for now
  fields: {
    eventType: 'string',  // might not be the way to model this...
    changeFirstName: 'string',  // using language to capture event intent
    changeLastName: 'string', // using language to capture event intent
    addNote: 'string' // using language to capture event intent
  }
  // somehow enforce immutability for fields?
  // possibly manage all of this with behaviours
});

const Items = new Mongo.Collection('items');
// Inherit as you might for
const KeplerTest = TychoTest.inherit({
  name: 'Kepler', // will be optional
  typeField: 'type', // will be optional
  collection: Items,
  fields: {
    someField: 'string'
  }
});

const tycho = new TychoTest();
const kepler = new KeplerTest();
const observation = new Observation();

// console.log('kepler object', kepler);









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



Tinytest.add('Observation - Basic event model tests', (test) => {

  observation.set('changeFirstName','Rob');
  test.equal(observation.get('changeFirstName'),'Rob','Change to first name should be `Rob`');

});


Tinytest.add('Kepler - Push in new event', (test) => {
  observation.set('changeFirstName','Joe');
  kepler.push('_eventStream','test');
  kepler.push('_eventStream',observation);
  // test.equal(, true);
  // test.equal(, true);

  console.log('observation',observation);
  console.log('kepler',kepler);

  test.equal(kepler.get('_eventStream')[1]['changeFirstName'],'Joe','Should have a first event with `changeFirstName` = `Rob`');

  console.log("raw event stream", kepler.raw('_eventStream'));

});
