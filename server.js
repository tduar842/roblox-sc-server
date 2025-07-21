const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

let img_data = {};
let last_input = {};

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

//get last player to update remote
app.get("/remote_inp", (req, res) => {
  res.send(last_input);
  last_input = {};
});

//get input
app.post("/inp_data", (req, res) => {
  console.log("Headers:", req.headers);
  
  last_input = req.body;
  
  res.json({ success: true, message: "Data received!" });
});

// Handle POST requests from python
app.post("/data", (req, res) => {
  console.log("Headers:", req.headers);

  img_data = req.body;
 /* const player = req.body.player;
  console.log("player:", player.name);
  console.log("pos_x:", player.pos_x);
  console.log("pos_y:", player.pos_y);
  console.log("pos_z:", player.pos_z);

  last_player_data = player; */
  
  res.json({ success: true, message: "Data received!" });
});

//get last player to update remote
app.get("/remote", (req, res) => {
  res.send(img_data);
});

// Debug route for testing
app.get("/debug", (req, res) => {
  console.log("Debug route hit");
  res.send("Debugging successful");
});

// Root route for checking the server
app.get("/", (req, res) => {
  res.send("Hello from Render Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
