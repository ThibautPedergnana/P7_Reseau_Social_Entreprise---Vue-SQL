const express = require("express");
const urlencoded = require("express");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const likeRoutes = require("./routes/like");
const cors = require("cors");
const verifyAuthorization = require("./middlewares/verifyAuthorization");
const path = require("path");

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
// Sauvegarde des images
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes inscriptions/connections
app.use("/api/auth", authRoutes);

// Vérification des tokens d'authentification
app.use(verifyAuthorization);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);

// Export
module.exports = app;
