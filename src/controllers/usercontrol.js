const express = require("express");
const app = express()
const bcrypt = require('bcrypt')

/* ------------------------------ */

// const Event = require("../models/eventmodel");
const User = require("../models/usermodel");

/* ------------------------------ */

exports.getNewUser = async (req, res) => {
  console.log("Donnée reçue :", req.body);
  try {
    // on verifie les données reçues
    const { pseudo, email, password, pseudo_discord, pseudo_ubisoft } =
      req.body;

    // on verifie si l'User existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Cette email est déjà utilisé."})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)

    const newUser = new User({
      pseudo,
      email,
      password: hashedPassword,
      pseudo_discord,
      pseudo_ubisoft
    });

    console.log("Nouvel utilisateur créé :", newUser);

    await newUser.save();
    res.status(201).json({ message: "User créé avec succès", users: newUser })
  } catch (err) {
    console.error("Erreur lors de la création du user :", err);
    res.status(500).json({
      message: "Erreur lors de la création du user",
      error: err.message,
    });
  }
};

exports.getLogIn = async (req, res) => {
  try {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe." })
    }
    
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "L'email ou le mot de passe est incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "L'email ou le mot de passe est incorrect." });
    }

    res.status(201).json({
      status: 'sucess',
      mssg: 'You are logged in '
  })
  } catch (err) {
    console.error("Erreur lors de la création du user :", err);
     return res.status(500).json({
      message: "Erreur lors de la création du user",
      error: err.message,
    });
  }
}