const { pool } = require("../config/db");

exports.create = (req, res, next) => {
  // DEFINI LES CHAMPS REMPLI
  const { userId } = req.auth;

  const comment = {
    comment: req.body.comment,
    authorId: userId,
    postId: req.body.postId,
  };

  let sql = `INSERT INTO comment (comment, authorId, postId) VALUES (?,?,?);`;
  pool.execute(
    sql,
    [comment.comment, comment.authorId, comment.postId],
    function (err, result) {
      if (err) res.status(400).json({ err });
      let sql = `UPDATE post SET post.comment = post.comment + 1 WHERE postId=?;`;
      pool.execute(sql, [req.body.postId], function (err, result) {
        if (err) throw err;
        res.status(201).json(comment);
      });
    }
  );
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.auth;

  let sql = `SELECT * FROM comment WHERE idComment = ?`;
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });
    if (!result[0])
      res.status(404).json({ message: "Le commentaire n'existe pas" });
    else {
      if (result[0].authorId == userId || isAdmin) {
        // SUPPRIME LE COMMENTAIRE DANS LA DB
        let sql2 = `DELETE FROM comment WHERE idComment = ?`;
        pool.execute(sql2, [id], function (err, resp) {
          if (err) throw err;
          let sql = `UPDATE post SET post.comment = post.comment - 1 WHERE postId=?;`;
          pool.execute(sql, [result[0].postId], function (err, resp) {
            if (err) throw err;
            res.status(204).send();
          });
        });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    }
  });
};
