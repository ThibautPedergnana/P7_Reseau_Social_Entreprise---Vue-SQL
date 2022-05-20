const { pool } = require("../config/db");
const fs = require("fs");

exports.getAll = (req, res, next) => {
  let sql =
    "SELECT * FROM post p JOIN user WHERE user.id=authorId ORDER BY date DESC LIMIT 50;";
  pool.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};

exports.create = (req, res, next) => {
  const { userId } = req.auth;

  // DEFINI LES CHAMPS REMPLI
  // const image = req.file
  //   ? `${req.protocol}://${req.get("host")}/images/post/${req.file.filename}`
  //   : "";
  const textSend = req.body.text ? req.body.text : " ";
  const post = {
    text: textSend,
    imageUrl: "image",
    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
    authorId: userId,
  };

  //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
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
