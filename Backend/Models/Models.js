const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patient_uid: String,
  reg_no: String,
  firstname: String,
  lastname: String,
  mobilenumber: String,
  prefix: String,
  gender: String,
  address: String,
  state: String,
  city: String,
  pincode: String,
  doctor: [{ type: String }],
  department: [{ type: String }],
  treatment: [{ type: String }],
  is_active: Boolean,
  created_at : Date,
});

module.exports = mongoose.model("Patient", patientSchema);
