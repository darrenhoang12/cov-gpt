const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const letterSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  letterContent: {
    type: String,
    required: true,
  },
});

const Letter = mongoose.model("Letter", letterSchema);

module.exports = Letter;
