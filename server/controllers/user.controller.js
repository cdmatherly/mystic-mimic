const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
  console.log("\nRegistering...\n")

  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {id: user._id},
        process.env.SECRET_KEY);

      res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    });
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  console.log("\nAuthenticating...\n")
  console.log(user)

  if (user === null) {
    // email not found in users collection
    return res.status(400).json({error: "Invalid credentials"});
  }

  // if we made it this far, we found a user with this email address
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!correctPassword) {
    // password wasn't a match!
    return res.status(400).json({error: "Invalid credentials"});
  }

  // if we made it this far, the password was correct
  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  // note that the response object allows chained calls to cookie and json
  res
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getAll = (req, res) => {
    User.find().sort({"number": 1})
        .then((allUsers) => {
			console.log("Running query to find all users:", allUsers)
			res.json(allUsers)
		})
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}

module.exports.getUser = (request, response) => {
  Store.findOne({_id:request.params.id})
      .then(store => {
          console.log("Running query to find one store:", store)
          response.json(store)
      })
      .catch(err => {
          console.log(err)
          response.status(400).json(err)
      })
}