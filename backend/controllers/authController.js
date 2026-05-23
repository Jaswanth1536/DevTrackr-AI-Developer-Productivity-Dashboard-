const users = [];

// SIGNUP
const signup = async (req, res) => {
try {
console.log("Signup Request:", req.body);


const {
  username,
  email,
  password,
} = req.body;

// Validation
if (!username || !email || !password) {
  return res.status(400).json({
    message: "Please fill all fields",
  });
}

// Existing user check
const existingUser = users.find(
  (user) => user.email === email
);

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

// Create user
const user = {
  id: Date.now(),
  username,
  email,
  password,
};

users.push(user);

res.status(201).json({
  success: true,
  data: {
    token: "mock-token",
    _id: user.id,
    username: user.username,
    email: user.email,
  },
});


} catch (error) {
console.error("Signup Error:", error);


res.status(500).json({
  message: "Server error during signup",
});


}
};

// LOGIN
const login = async (req, res) => {
try {
const { email } = req.body;

res.status(200).json({
  success: true,
  data: {
    token: "mock-token",
    _id: Date.now(),
    username: email.split("@")[0],
    email,
  },
});


} catch (error) {
console.error("Login Error:", error);


res.status(500).json({
  message: "Server error during login",
});


}
};


module.exports = {
signup,
login,
};
