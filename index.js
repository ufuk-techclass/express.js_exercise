const logger = require("./middleware/logger");
const express = require("express"); //returns a function which is express
const app = express(); //store the result when we called express() function
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use("/api/courses", courses); //for any routes that start with /api/courses, use this router: courses
app.use("/", home);
app.use(express.json()); //we are adding a middleware
app.use(logger);
app.use(express.urlencoded({ extended: true })); // parses incoming request with url encoded payloads.
app.use(express.static("public")); // we use it to serve static files. we put static files (css, image etc) into public folder

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listeninig on port ${port}`));
//in terminal, type: set PORT=5000
