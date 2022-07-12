const { pool } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription
exports.register = (req, res) => {
  let sql = `SELECT * FROM user WHERE email=?`;
  pool.execute(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const image = `${req.protocol}://${req.get("host")}/images/pp.png`;
          const user = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,
            imageUrl: image,
          };
          let sql = `INSERT INTO user (lastname, firstname, email, password, pp) VALUES (?,?,?,?,?)`;
          pool.execute(
            sql,
            [
              user.lastname,
              user.firstname,
              user.email,
              user.password,
              user.imageUrl,
            ],
            function (err, result) {
              if (err) throw err;
              res.status(201).json({
                token: jwt.sign(
                  { userId: user.id, isAdmin: user.admin },
                  process.env.SECRET_TOKEN_KEY,
                  {
                    expiresIn: "24h",
                  }
                ),
                message: `Utilisateur ${user.prenom} ajouté`,
              });
            }
          );
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(401).json({ message: "Email déja pris" });
    }
  });
};

// Connexion
exports.login = (req, res) => {
  let sql = `SELECT * FROM user WHERE email=?`;
  pool.execute(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user) return res.status(401).json({ error: "Email incorrect" });
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: " Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id, isAdmin: user.admin },
            process.env.SECRET_TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          ),
        });
      })
      .catch((error) =>
        res.status(500).json({ message: "Erreur authentification" })
      );
  });
};

// Vérification de l'utilisateur connecté
exports.currentUser = (req, res) => {
  const { userId } = req.auth;

  let sql = `SELECT * FROM user WHERE id=?`;
  pool.execute(sql, [userId], function (err, result) {
    let user = result[0];
    if (!user) return res.status(401).json({ error: "User doesn't exist" });

    const { password, ...rest } = user;

    return res.status(200).json({ ...rest });
  });
};
