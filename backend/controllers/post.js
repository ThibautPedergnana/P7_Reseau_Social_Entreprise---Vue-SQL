const { pool } = require("../config/db");
const fs = require("fs");

// Récupérer tout les posts
exports.getAll = (req, res, next) => {
  let sql =
    "SELECT * FROM post JOIN user WHERE user.id=authorId ORDER BY date DESC LIMIT 50;";
  pool.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });

    const posts = result.map((res) => {
      const { admin, email, password, ...rest } = res;
      return rest;
    });
    res.status(200).json(posts);
  });
};

// Récupérer un post
exports.getOne = (req, res, next) => {
  const { id } = req.params;
  let sql =
    "SELECT * FROM post JOIN user WHERE user.id=authorId and postId=? ORDER BY date DESC LIMIT 50;";
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });
    if (!result[0]) res.status(404);
    const { admin, email, password, ...post } = result[0];

    res.status(200).json(post);
  });
};

// Récupérer tout les commentaires
exports.getComments = (req, res, next) => {
  const { id } = req.params;
  let sql =
    "SELECT * FROM comment c JOIN user u WHERE c.authorId = u.id and postId=? ORDER BY idComment;";
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });

    const posts = result.map((res) => {
      const { admin, email, password, ...rest } = res;
      return rest;
    });
    res.status(200).json(posts);
  });
};

// Création d'un post
exports.create = (req, res, next) => {
  const { userId } = req.auth;

  // DEFINI LES CHAMPS REMPLI
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";

  const textSend = req.body.text ? req.body.text : " ";
  const post = {
    text: textSend,
    imageUrl: image,
    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
    authorId: userId,
  };

  // Envoie la requête avec multer et les valeurs par défaut
  let sql = `INSERT INTO post (text, date, imageUrl, authorId) VALUES (?,?,?,?);`;
  pool.execute(
    sql,
    [post.text, post.date, post.imageUrl, post.authorId],
    function (err, result) {
      if (err) throw err;
      res.status(201).json(post);
    }
  );
};

// Supprimer un post
exports.delete = (req, res, next) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.auth;

  let sql = `SELECT * FROM post WHERE postId = ?`;
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });
    if (!result[0]) res.status(404).json({ message: "Le post n'existe pas" });
    else {
      if (result[0].authorId == userId || isAdmin) {
        // Supprime l'image dans le dossier Images
        if (result[0].imageUrl != "") {
          const name = result[0].imageUrl.split("/images/")[1];
          fs.unlink(`images/${name}`, () => {
            if (err) console.log(err);
          });
        }
        // Supprime le post dans la BD
        let sql2 = `DELETE FROM post WHERE postId = ?`;
        pool.execute(sql2, [id], function (err, result) {
          if (err) throw err;
          res.status(204).json();
        });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    }
  });
};

// Récupérer les likes d'un post
exports.liked = (req, res, next) => {
  const { userId } = req.auth;

  let sql = `SELECT * FROM groupomania.like WHERE userId=? and postId=? `;
  pool.execute(sql, [userId, req.params.id], function (err, result) {
    if (err) res.status(400).json({ err });
    const alreadyLiked = result?.length > 0;
    res.status(200).json({ alreadyLiked });
  });
};
