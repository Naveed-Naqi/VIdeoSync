const { User } = require("../database/models");
const users = require("../data/users");
const bcrypt = require("bcryptjs");

const populateUsersTable = async users => {
  for (let i = 0; i < users.length; i++) {
    let newUser = await User.build(users[i]);
    newUser.email = newUser.email.toLowerCase();
    await newUser.save();
  }
};

const seedDatabase = async () => {
  try {
    await populateUsersTable(users);
    console.log("Successfully seeded!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();
