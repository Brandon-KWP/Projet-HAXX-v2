const express = require("express");
const app = express();

/* ------------------------------ */

const Event = require("../models/eventmodel");
const User = require("../models/usermodel");

/* ------------------------------ */

exports.getViewsEvent = async (req, res) => {
  try {
    const events = await Event.find();
    console.log("🚀 Données envoyées à la vue :", events)
    res.render("events", { events });
  } catch (err) {
    console.error("Erreur lors de la récupération des événements :", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des événements",
      error: err.message,
    });
  }
};

exports.getAddEvent = async (req, res) => {
  console.log("Donnée événement reçue :", req.body);
  try {
    const { title, cover, description, date, city, place_available } = req.body;

    if (!title || !description || !date || !cover) {
      return res.status(400).json({
        message:
          "Les champs title, description, date et cover sont obligatoires.",
      });
    }

    const newEvent = new Event({
      title,
      cover,
      description,
      date,
      city,
      place_available,
    });

    console.log("Nouvel événement créé :", newEvent);

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Événement créé avec succès", events: newEvent });
  } catch (err) {
    console.error("Erreur lors de la création de l'événement :", err);
    res.status(500).json({
      message: "Erreur lors de la création de l'événement",
      error: err.message,
    });
  }
};
