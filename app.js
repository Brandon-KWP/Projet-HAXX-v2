const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connectDb = require("./src/databases/connect.js");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3008;

/* ------------------------------ */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "views/pages");
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8554685 },
  })
);

/* ------------------------------ */

// database
connectDb();

/* ------------------------------ */

// importation et appel de la route
const RouteRoad = require("./src/routes/route.js");
app.use(RouteRoad);

// demarrage su serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
