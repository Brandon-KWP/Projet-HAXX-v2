const mongoose = require("mongoose");

// schema pour les users
const UserShema = new mongoose.Schema({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pseudo_discord: { type: String, required: true },
  pseudo_ubisoft: { type: String, required: true },
});

// defenir le modèle + bien mettre le nom de la base de donnée
const User = mongoose.model("User", UserShema);

// exportation du modele
module.exports = User;