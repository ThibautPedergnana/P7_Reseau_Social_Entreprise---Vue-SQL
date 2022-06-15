const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

exports.getAll = (req, res, next) => {
  const search = "%" + req.query.search + "%";

  let sql =
    "SELECT * FROM user WHERE firstname LIKE ? or lastname LIKE ? LIMIT 50;";
  pool.execute(sql, [search, search], function (err, result) {
    if (err) res.status(400).json({ err });
    const users = result.map((res) => {
      const { password, ...rest } = res;
      return rest;
    });
    res.status(200).json(users);
  });
};

exports.getPostsByUser = (req, res, next) => {
  const { id } = req.params;

  let sql =
    "SELECT * FROM post JOIN user WHERE user.id=authorId and authorId=? ORDER BY date DESC LIMIT 50;";
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });

    const posts = result.map((res) => {
      const { admin, desc, email, password, ...rest } = res;
      return rest;
    });
    res.status(200).json(posts);
  });
};

exports.getOne = (req, res, next) => {
  const { id } = req.params;

  let sql = "SELECT * FROM user WHERE id=?";
  pool.execute(sql, [id], function (err, result) {
    if (err) res.status(400).json({ err });

    if (!result[0]) res.status(404);
    const { password, desc, admin, ...user } = result[0];

    res.status(200).json(user);
  });
};

exports.updateAccount = (req, res, next) => {
  const { userId } = req.auth;

  if (!req.body.lastname && !req.body.firstname && !req.body.email)
    return res.status(400);

  pool.execute(
    "SELECT * FROM user WHERE id=?",
    [userId],
    function (err, result) {
      if (err) res.status(400).json({ err });
      if (!result[0]) res.status(404);

      let sql = `UPDATE user SET `;
      let arrayValues = [];
      let attributes = [];

      if (req.body.lastname !== "") {
        attributes.push(`lastname=? `);
        arrayValues.push(req.body.lastname);
      }
      if (req.body.firstname !== "") {
        attributes.push(`firstname=? `);
        arrayValues.push(req.body.firstname);
      }
      if (req.body.email !== "") {
        attributes.push(`email=? `);
        arrayValues.push(req.body.email);
      }
      sql += attributes.join(", ");
      sql += `WHERE id=?`;
      arrayValues.push(userId);

      pool.execute(sql, arrayValues, function (err, resultat) {
        if (err) throw err;
        res.status(200).json({});
      });
    }
  );
};

exports.updatePassword = (req, res, next) => {
  const { userId } = req.auth;
  const { password, confirmPassword, oldPassword } = req.body;

  if (!password || !confirmPassword || !oldPassword)
    return res.status(400).json({
      error: "The body keys must contain password and confirmPassword",
    });

  if (password !== confirmPassword)
    return res.status(400).json({
      error: "The password doesn't match with the confirmPassword",
    });

  pool.execute(
    "SELECT * FROM user WHERE id=?",
    [userId],
    async function (err, result) {
      if (err) return res.status(400).json({ err });
      if (!result[0]) return res.status(404);
      const currentuser = result[0];

      const isValid = await bcrypt.compare(oldPassword, currentuser.password);
      if (!isValid)
        return res.status(400).json({
          error: "The current password is invalid",
        });

      const hash = await bcrypt.hash(password, 10);

      pool.execute(
        `UPDATE user SET password=? WHERE id=?`,
        [hash, userId],
        function (err, result) {
          if (err) throw err;
          console.log(result);
          res.status(200).json(result[0]);
        }
      );
    }
  );
};

exports.delete = (req, res, next) => {
  const { password } = req.body;
  const { userId } = req.auth;

  if (!password)
    return res.status(400).json({
      error: "The body must contain a key password",
    });

  try {
    let sql = `SELECT * FROM user WHERE id=?`;
    pool.execute(sql, [userId], async function (err, result) {
      if (!result[0]) return res.status(404).send();
      let user = result[0];

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ error: " Mot de passe incorrect !" });

      let sql = `DELETE FROM user WHERE id=?`;
      pool.execute(sql, [userId], function (err, result) {
        if (err) throw err;

        res.status(200).json({
          message: `Compte numéro ${userId} supprimé`,
        });
      });
    });
  } catch (error) {
    res.status(500);
  }
};
