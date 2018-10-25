const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.port || 3000;

const app = express();

//=============== Handlebars ===============

hbs.registerPartials(__dirname + "/views/partials/");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.set("view engine", "hbs");

//=============== End of Handlebars ===============

//=============== Middleware =================

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use((req, res, next) => {
  let now = new Date().toString();
  let serverLog = `${now} ${req.method} ${req.url}`;
  console.log(serverLog);
  fs.appendFile("server_log.txt", `${serverLog} \n`, err => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use(express.static(__dirname + "/public"));

//=============== End of Middleware =================

// ============ Routes ===============
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home page",
    welcomeMessage: "Welcome !!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    type: "error",
    message: "bad request"
  });
});

// ============ End of Routes ===============

app.listen(port, () => {
  console.log(`Server is listening on PORT: ${port}`);
});
