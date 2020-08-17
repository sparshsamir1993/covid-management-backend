var sequelizeMock = require("sequelize-mock");
var dbMock = new sequelizeMock();

var UserMock = dbMock.define("User", {
  name: "shreyash",
  email: "smac123@gmail.com",
  password: "sh123",
  createdAt: new Date(),
  updatedAt: new Date(),
});

let getUserEmail = async () => {
  //console.log(UserMock)
  //  console.log(userId)
  const user = await UserMock.findOne({
    // where: {
    //   id: userId,
    // },
  }).catch((error) => {
    // console.log(error);
  });

  // console.log(user);
  return user.get("email");
};

module.exports.getUserEmail = getUserEmail;
module.exports.UserMock = UserMock;
