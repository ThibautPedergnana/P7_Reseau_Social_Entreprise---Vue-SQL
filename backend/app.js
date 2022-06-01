const express = require("express");
const urlencoded = require("express");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const cors = require("cors");
const verifyAuthorization = require("./middlewares/verifyAuthorization");

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// app.options("*", cors());
app.use(
  cors({
    origin: "*",
  })
);

// Routes inscriptions/connections
app.use("/api/auth", authRoutes);
// Sauvegarde des images
// app.use("/images", express.static(path.join(__dirname, "images")));

// Vérification des tokens d'authentification
app.use(verifyAuthorization);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// Routes users
// app.use("/api/auth", authRoutes);

// Export
module.exports = app;
