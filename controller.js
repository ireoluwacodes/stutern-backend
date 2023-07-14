const bcrypt = require("bcryptjs");

const Users = [];

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Enter All Fields",
      });
    }
    // Check if the email is already taken
    if (Users.some((user) => user.email === email)) {
      return res.status(409).json({ error: "Email already exists" });
    }
    // hash the user password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // Create a new user object and add it to the database
    const newUser = { email, hash };
    Users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Enter All Fields",
      });
    }

    const user = Users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ error: "User Does not exist" });
    }
    let verify = await bcrypt.compare(password, user.hash);
    if (!verify) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
