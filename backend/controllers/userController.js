import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({});
    res.json(users);
  } catch (error) {
    console.log("**Error**", error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, isAdmin } = req.body;
  if (password !== confPassword) {
    res.json({ error: "password is not match!" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const findEmail = await Users.findOne({ where: { email: email } });
    if (findEmail) {
      return res.json({ error: "This email exist. Use another email!" });
    }
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
    });
    res.json({ message: "Register successfully done." });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const findUser = await Users.findAll({
      where: { email: req.body.email },
    });
    const matchPassword = await bcrypt.compare(
      req.body.password,
      findUser[0].password
    );

    if (!matchPassword) {
      return res.json({ error: "Password is not correct!" });
    }

    const userId = findUser[0].id;
    const name = findUser[0].name;
    const email = findUser[0].email;
    const isAdmin = findUser[0].isAdmin;
    const accessToken = jwt.sign(
      { userId, name, email, isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "220s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email, isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      //to save refreshToken in the cookie of the browser of the client
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //to convert 1d to milliseconds
    });

    res.json({
      userId,
      name,
      email,
      isAdmin,
      accessToken,
      msg: "you are successfully logged in.",
    });
  } catch (error) {
    res.json({ error: "Email or password is not correct!" });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json("Couldn't find any token");
    const user = await Users.findOne({ refresh_token: refreshToken });
    console.log("********", user);
    if (!user) return res.json("User does not exist!");
    const clr = null;
    await Users.update({ refresh_token: clr }, { where: { id: user.id } });
    res.clearCookie("refreshToken");
    res.json("You logged out successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.json({ message: "This user doesn't exist!" });

  try {
    await Users.destroy({
      // method 'destroy' is to delete base on id.
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "The user deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, confPassword, isAdmin } = req.body;
  if (password !== confPassword) {
    return res.json({
      error: "Password and confPassword are not the same!",
    });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        isAdmin: isAdmin,
      },
      {
        where: {
          id: req.body.id, // you can get the id of the user from params as well.
        }, //  req.params.id
      }
    );

    res.json({ message: "Editing is successfully done." });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User is not exist!" });
  let fileName = "";
  if (req.files === null) {
    // if the user during updating his profile, doesn't send any image(file)
    fileName = user.image; // the the value for the image will be the image is already in the database.
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name); // path.extname get the extension of a file (pasvand) fx .jpg
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext; // to change the name of the image that the user uploads.
    // to avoid overwriting. if the previous image that user has uploaded
    // has the same name as the new uploaded image, they will be overwrite.
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.json(
        "Oops! The image formate is not allowed. Just png, jpg, jpeg are acceptable."
      );
    }
    if (fileSize > 1000000)
      return res.json(
        "The size of the image shouldn't be larger than 1 mega bite"
      );

    // if (user.image) {
    //   const filePath = `./public/avatars/${user.image}`; //to remove the previous image in the server
    //   fs.unlinkSync(filePath);
    // }

    file.mv(`./public/avatars/${fileName}`, (err) => {
      if (err) return res.json({ message: err.message });
    });
  }

  const { name, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.json({
      error: "Password and confirm password are not the same!",
    });
  }
  const salt = await bcrypt.genSalt();
  const hasPassword = await bcrypt.hash(password, salt);
  const url = `${req.protocol}://${req.get("host")}/avatars/${fileName}`;
  console.log("********", url);

  try {
    await Users.update(
      { name: name, password: hasPassword, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "The user profile is successfully updated." });
  } catch (error) {
    console.log(error);
  }
};

export const Profile = async (req, res) => {
  //this function is to send info of the profile back to the user.
  try {
    const id = req.userId; // instead of get data of the user from 'front'
    const user = await Users.findByPk(id);
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        url: user.url,
      });
    } else {
      res.json({ error: "User is not found" });
    } // we get data of the user from 'VerifyToken' (line 18)
  } catch (error) {
    console.log(error);
  }
};
