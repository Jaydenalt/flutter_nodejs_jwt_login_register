const bcrypt = require("bcryptjs");
const userServices = require("../services/user.services");
const User = require("../models/user.model");

exports.register = (req, res, next) => {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  req.body.password = bcrypt.hashSync(password, salt);

  userServices.register(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  userServices.login({ username, password }, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.userProfile = (req, res, next) => {
  return res.status(401).json({ message: "Authorized User!!" });
};

exports.apiInit = (req, res, next) => {
  return res.status(200).json({ message: 'Welcome'})
}

exports.otpLogin = (req, res, next) => {
  userServices.createNewOTP(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.verifyOTP = (req, res, next) => {
  userServices.verifyOTP(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const options = { new: true }

    const result = await User.findByIdAndUpdate(id, updates, options)
    res.send(result)
  } catch (error) {
    console.log(error.message)
  }
}

exports.getInfo = async (req, res, next) => {
  try {
    const id = req.params.id

    const result = await User.findById(id)
    res.send(result)
  } catch (error) {
    console.log(error.message)
  }
}