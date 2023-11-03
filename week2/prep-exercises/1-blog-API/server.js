const express = require("express");
const app = express();
const fs = require("fs");

// Configure parsing of request bodies in JSON format
app.use(express.json());

// New Blog Post
app.post("/blogs", (req, res) => {
  // Get the title and content from the request body
  const title = req.body.title;
  const content = req.body.content;

  // Use fs.writeFileSync to store the data in a file
  fs.writeFileSync(`${title}.txt`, content);
  res.end("ok");
});

// Update an Existing post
app.put("/posts/:title", (req, res) => {
  const title = req.params.title; //Get the title from the URL
  const content = req.params.content; //Get the content from the request body

  if (fs.existsSync(title)) {
    //the file with the given title already exist, so we overwrite it with the new content
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    // Send a response with an error message
    res.status(404).send("This post does not exist!");
  }
});

//Delete a Blog post
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title; // Get the title from the URL parameters

  if (fs.existsSync(title)) {
    // The file with the given title exists, so we delete it
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    // Respond with an error message
    res.status(404).send("This post does not exist!");
  }
});

// Read a Blog post by title
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title; // Get the title from the URL parameters

  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title, "utf8"); // Read the post content
    res.status(200).send(post); //Respond with the post content
  } else {
    // Respond with an error message
    res.status(404).send("This post does noy exist!");
  }
});

//Read all Blog post titles
app.get("/blogs", (req, res) => {
  const files = fs.readdirSync(__dirname); // Get the list of all files in the current directory
  const postTitles = [];

  files.forEach((file) => {
    if (file.endsWith(".txt")) {
      // check if the file is a text file
      const title = file.replace(".txt", ""); // Extract the title from the file name
      postTitles.push({ title });
    }
  });

  res.status(200).send(postTitles); // Respond with the titles of all blog posts
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
