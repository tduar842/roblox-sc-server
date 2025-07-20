const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

let players = {}
let players_server2 = {}
let map_data = {}

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

app.post("/world-data", (req, res) => {
  map_data = req.body

  res.json({ success: true, message: "Map data received!" });
});

app.get("/rem-world-data", (req, res) => {
  console.log("Map:", map_data);
  
  res.send(map_data);
});

// Handle POST requests from Roblox
app.post("/data", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  players = req.body;
 /* const player = req.body.player;
  console.log("player:", player.name);
  console.log("pos_x:", player.pos_x);
  console.log("pos_y:", player.pos_y);
  console.log("pos_z:", player.pos_z);

  last_player_data = player; */
  
  res.json({ success: true, message: "Data received!" });
});

// Handle POST requests from Roblox
app.post("/data2", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  players_server2 = req.body;
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
  console.log("player data:", players);

  res.send(players);
});

//get last player to update remote
app.get("/remote2", (req, res) => {
  console.log("player data:", players_server2);

  res.send(players_server2);
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
