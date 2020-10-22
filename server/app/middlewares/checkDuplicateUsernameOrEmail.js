const User = require("../models/user");

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.exists(
    {
      username: req.body.username,
    },
    (err, userExists) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (userExists) throw new Error("Username already in use!");
      User.exists(
        {
          email: req.body.email,
        },
        (err, emailExists) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (emailExists) throw new Error("Email already in use!");
          next();
        }
      );
    }
  );
};

module.exports = checkDuplicateUsernameOrEmail;
