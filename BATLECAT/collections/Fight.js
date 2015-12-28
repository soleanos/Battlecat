Fight = new Mongo.Collection("fight");

Fight.allow({
  update: function () {
    return true;
  },
  insert: function () {
    return true;
  }
  
});
