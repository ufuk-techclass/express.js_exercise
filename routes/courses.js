const express = require("express");
const router = express.Router();

const courses = [
  { myid: 1, name: "course1" },
  { myid: 2, name: "course2" },
  { myid: 3, name: "course3" }
];

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
  //we write a logic to look for a course for given id
  //as an argument of find() method, we need to pass a function which is ussed to
  //find a course matches with given criteria
  const course = courses.find(c => c.myid === parseInt(req.params.id));
  //if we cant find a course for the given id

  //convention of restful apis. if a client ask for resource which does not exist
  //on the server, we return a response with the status code of 404
  if (!course) return res.status(404).send("id not found");
  res.send(course);
});

router.get("/:id/:year", (req, res) => {
  res.send(req.params);
});

//POST METHOD 
router.post("/", (req, res) => {
  //input validation: never trust what the client sends you
  //manual validation logic
  if (!req.body.name || req.body.name.length < 3) {
    //400 Bad Request
    res.status(400).send("name is required and should be min 3 characters");
    return; 
  }
  
  const course = {
    id: courses.length + 1,
    name: req.body.name // we assume that in the request body we have an object which has name property
  };
  courses.push(course);
  res.send(course);
});

//PUT METHOD
router.put("/:id", (req, res) => {
  //we need route parameter :id because we are dealing with a specific course
  //Check the course, if it doesn't exit, return 404
  //Validate, if invalid, return 404 - bad request
  //if valid, update course and return it to client
  const course = courses.find(c => c.myid === parseInt(req.params.id));
  if (!course) return res.status(404).send("id not found");

  //validation logic should be added here (not added)

  course.name = req.body.name;
  res.send(course);
});

//DELETE METHOD 
router.delete("/:id", (req, res) => {
  //look up the course, not existing return 404
  //if exist, delete and return the course
  const course = courses.find(c => c.myid === parseInt(req.params.id));
  if (!course) return res.status(404).send("id not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});
module.exports = router;
