Market = new Mongo.Collection("market");

Market.allow({
  update: function () {
    return true;
  },
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
});
