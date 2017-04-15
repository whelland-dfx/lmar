//DB Helper 

var insertDocument = function(db, callback, collection, str) {
   db.collection(collection).insertOne( { 
   	str
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Document intserted into collection.");
    callback();
  });
};