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
