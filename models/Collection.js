const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    label: String
});

const Collection = mongoose.model("Collections", collectionSchema);

module.exports = Collection;
