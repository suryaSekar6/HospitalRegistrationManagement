const express = require('express');
const router = express.Router();
const patient = require("../Controllers/patient")



router.get("/patient",patient.getpatients);
router.get("/patient/:patient_uid",patient.getonepatient);
router.post("/patient/create",patient.createpatient);
router.put("/patient/edit/:patient_uid",patient.editpatient);
router.delete("/patient/delete/:patient_uid",patient.deletepatient);
router.post("/patient/bigfilter",patient.bigfilter);
router.post("/patient/report",patient.report);
router.post("/patient/age",patient.dateofbirth);


module.exports = router;