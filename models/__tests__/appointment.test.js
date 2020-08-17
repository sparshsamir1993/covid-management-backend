var appointment = require("../__mocks__/appointments_mock");

describe("sequelize mock test for Appointments", () => {
    test("should return appointment status ", async (done) => {
        await appointment.getAppointmentStatus(2).then((status) => {
            expect(status).toMatch("Booked");
            done();
        }, 40000).catch(done);

    })
})
