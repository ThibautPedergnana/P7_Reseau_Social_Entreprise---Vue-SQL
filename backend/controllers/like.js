const { pool } = require("../config/db");

// Récupérer les likes de tout les posts
exports.like = (req, res, next) => {
  const { userId } = req.auth;
  const { postId } = req.body;

  let sql =
    "SELECT * FROM groupomania.like l WHERE l.postId=? and l.userId=? ;";
  pool.execute(sql, [postId, userId], function (err, results) {
    const alreadyLiked = results?.length > 0;
    const sqlUpdate = alreadyLiked
      ? `UPDATE post SET post.like = post.like - 1 WHERE postId=?;`
      : `UPDATE post SET post.like = post.like + 1 WHERE postId=?;`;

    const sqlAction = alreadyLiked
      ? `DELETE FROM groupomania.like l WHERE l.postId = ? AND l.userId = ?`
      : `INSERT INTO groupomania.like (postId, userId) VALUES (?,?);`;

    pool.execute(sqlUpdate, [postId], function (err, result1) {
      if (err) res.status(400).json({ err });
      pool.execute(sqlAction, [postId, userId], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!alreadyLiked) res.status(200).json({ userId, postId });
        else res.status(204).json();
      });
    });
  });
};
