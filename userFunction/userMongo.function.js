const User = require('../models/User.model');

///////////////////////////////////////// READ MANY DOCUMENTS USER /////////////////////////////////////

async function readAllDocumentsUser() {
  const users = await User.find({});
  return users;
}

async function readManyDocumentsUsersbyfavourite_books_id(favourite_books_id) {
  const users = await User.find({
    favourite_books_id: favourite_books_id,
  });
  return users;
}

///////////////////////////////////////// READ ONE DOCUMENT USER /////////////////////////////////////

async function readOneDocumentUserbyuser_name(user_name) {
  const user = await User.find({
    user_name: user_name,
  });
  return user;
}

///////////////////////////////////////// ADD MANY DOCUMENTS USER /////////////////////////////////////

async function addManyDocumentsUser(usersList) {
  try {
    const users = await User.insertMany(usersList);
    return users;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// ADD ONE DOCUMENT USER /////////////////////////////////////

async function addOneDocumentUser(user_name, favourite_books_id) {
  try {
    const user = await User.create({
      user_name: user_name,
      favourite_books_id: favourite_books_id,
    });
    return user;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// UPDATE ONE DOCUMENT USER /////////////////////////////////////

async function updateOneDocumentUser(user_name, user_name_set, favourite_books_id_set) {
  const user = await User.updateOne(
    {
      user_name: user_name,
    },
    {
      $set: {
        user_name: user_name_set,
        favourite_books_id: favourite_books_id_set,
      },
    }
  );
  return user;
}

///////////////////////////////////////// DELETE MANY DOCUMENTS USER /////////////////////////////////////

async function deleteAllDocumentsUser() {
  const users = await User.deleteMany({});
  return users;
}

async function deleteManyDocumentsUsersbyfavourite_books_id(favourite_books_id) {
  const users = await User.deleteMany({
    favourite_books_id: favourite_books_id,
  });
  return users;
}

///////////////////////////////////////// DELETE ONE DOCUMENT USER /////////////////////////////////////

async function deleteOneDocumentUser(user_name) {
  const user = await User.deleteOne({
    user_name: user_name,
  });
  return user;
}

module.exports = {
  readAllDocumentsUser,
  readManyDocumentsUsersbyfavourite_books_id,
  readOneDocumentUserbyuser_name,
  addManyDocumentsUser,
  addOneDocumentUser,
  updateOneDocumentUser,
  deleteAllDocumentsUser,
  deleteManyDocumentsUsersbyfavourite_books_id,
  deleteOneDocumentUser,
};
