

// Regardless of how access is granted, all events are written to this collection
// is meteor reactive on the contents of a cursor?  But even if so, this can
// only be when actually loaded... so we still need some sort of hooks
const Observations = new Mongo.Collection('observations');
// Set up a simple event stream collection
const Observation = Astro.Class.create({
  collection: Observations,
  name: 'Observation', // not going to be needed
  // these fields actually represent a user model, not the base class...
  // but this will be a surrogate for now
  fields: {
    eventType: {
      type: String
    },  // might not be the way to model this...
    addNumber: {
      type: String
    } // using language to capture event intent
  }
  // somehow enforce immutability for fields?
  // possibly manage all of this with behaviours
});


const addToTotal = function( number ) {
  let doc = this;
  doc.total += number;
  console.log(doc);
  return true;
}

const ReadModels = new Mongo.Collection('readModels');
// Set up a simple base class
const TychoReadModel = Astro.Class.create({
  collection: ReadModels,
  name: 'Tycho', // not going to be needed
  fields: {
    'name': {
      type: String
    },
    'total': {
      type: Number
    }, // arbitrary summation
  },
  methods: {
    addToTotal: addToTotal
  },
  events: {
    // This is where we want to hook into beforeSave or similar,
    // primarily on the server, to then route to event stream
    beforeSave: (e) => {
      let doc = e.currentTarget;
      doc.addToTotal(3);
    }
  }
});



// Run basic tests on Tycho
Tinytest.add('Tycho - Separate ES collection', (test) => {
  test.equal(TychoReadModel.getFieldsNames(),['_id','name','total'],'TychoTest should have a `name` field.');
  // test.equal(tycho.type,'TychoTest','TychoTest should be `TychoTest`','boo');
  // console.log("message");
  // console.log(tycho);
});



// Run basic tests on Tycho
Tinytest.add('Tycho - Try to find an event trigger', (test) => {
  testTRM = new TychoReadModel();
  test.isTrue(testTRM.addToTotal(1),'testTRM document should have a `addToTotal` that returns true.');
  // console.log(TychoReadModel);
  testTRM.set({ name: 'I have Events', total: 4 });
  testTRM.save();
});




// TODO: Set up some random data that is very large - 10,000 events or so - and test performance
