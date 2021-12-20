var router = require("express").Router();
var geolib = require("geolib");
var Hospital = require("../../../models/hospital");
const verifyToken = require("../../../middlewares/verifyToken");
const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.get("/", async (req, res) => {
  const hospitals = await Hospital.findAll().catch(errHandler);
  res.status(200).send(questions);
});

router.get("/nearby", verifyToken(), async (req, res) => {
  let userlatitude = req.query.latitude;
  let userlongitude = req.query.longitude;
  var filteredHospitals = [];
  const hospitals = await Hospital.findAll().catch(errHandler);
  for (myhospital in hospitals) {
    let { lat, lng } = hospitals[myhospital];
    var distance = geolib.getDistance(
      { latitude: userlatitude, longitude: userlongitude },
      { latitude: lat, longitude: lng },
      (accuracy = 0.2)
    );

    var distanceinKM = geolib.convertDistance(distance, "km");

    if (distanceinKM <= 10.0) {
      filteredHospitals.push(hospitals[myhospital]);
    }
  }

  res.status(200).send(filteredHospitals);
});

module.exports = router;
