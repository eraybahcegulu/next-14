const mongoose = require("mongoose");

const TitleSchema = mongoose.Schema(
  {
    name: String,
  },
);
const Titles = mongoose.models.Titles || mongoose.model("Titles", TitleSchema);

export default Titles;