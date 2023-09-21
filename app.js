const express = require("express");
const path = require("path");
const http = require("http");


const {routesInit} = require("./routes/configRoutes")

require("./db/mongoConnect");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

routesInit(app);


const server = http.createServer(app);
// בודק באיזה פורט להריץ את השרת  , אם בשרת אמיתי אוסף
// את המשתנה פורט מהסביבת עבודה שלו ואם לא 3001
const port = process.env.PORT || 3001;
server.listen(port);