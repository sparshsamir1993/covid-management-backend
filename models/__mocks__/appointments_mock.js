var sequelizeMock = require('sequelize-mock');
var dbMock = new sequelizeMock();


var AppointmentMock = dbMock.define('Appointments', {

    appointmentDate: new Date(),
    appointmentTime: new Date().getTime(),
    appointmentStatus: "Booked",
    userId: 2,
    hospitalId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

});
let getAppointmentStatus = (userId) => {
    const question = AppointmentMock.findOne({
        where: { userId: userId },

    }).catch((error) => {
        console.log(error);

    })
    return question.get("appointmentStatus");
}

module.exports.getAppointmentStatus = getAppointmentStatus;
module.exports.dbMock = dbMock;