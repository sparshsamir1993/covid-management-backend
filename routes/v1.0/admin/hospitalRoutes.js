var router = require("express").Router();
var Hospital = require("../../../models/hospital");
const verifyToken = require("../../../middlewares/verifyToken");

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.get("/", verifyToken(), async (req, res) => {
  const questions = await Hospital.findAll().catch(errHandler);
  res.status(200).send(questions);
});

router.post("/", verifyToken(), async (req, res) => {
  let { name, contact, detailedAddress, lat, lng } = req.body;
  try {
    const hospital = await Hospital.create({
      name,
      contact,
      detailedAddress,
      lat,
      lng,
    });
    res.status(200).send(hospital);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.patch("/", verifyToken(), async (req, res) => {
  let { name, contact, detailedAddress, lat, lng, id } = req.body;
  try {
    const hospital = await Hospital.update(
      {
        name,
        contact,
        detailedAddress,
        lat,
        lng,
      },
      { where: { id: id } }
    );
    res.status(200).send(hospital);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", verifyToken(), async (req, res) => {
  let hospitalId = req.params.id;
  const requestId = await Hospital.destroy({
    where: {
      id: hospitalId,
    },
  }).catch(errHandler);
  console.log(requestId);
  if (requestId < 1) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200).send(requestId);
  }
});

module.exports = router;
