const express = require("express");
const router = express.Router();

/* ------------------------------ */

// const Event = require("../models/eventmodel");
// const { getEventPage, getEventDetail } = require("../controllers/eventcontrol");

const User = require("../models/usermodel")
const { getNewUser, getLogIn } = require('../controllers/usercontrol')

/* ------------------------------ */

// Pour la page de l'acceuille
router.get("/", async (req, res) => {
  res.render("index");
});

// Pour la page des membres
router.get("/membres", async (req, res) => {
  res.render("membre");
});

// Pour la page des projet
router.get("/project", async (req, res) => {
  res.render("project");
});

router.get("/project/:id")

// pour la page d'Evenement
router.get("/evenement");

router.get("/evenement/:id")

// pour le page de log-in / sign-up
router.get("/log&sign", async (req, res) => {
  res.render("log&sign");
});

router.post("/register", getNewUser)

router.post("/login", getLogIn)

// exporation des routes
module.exports = router;
