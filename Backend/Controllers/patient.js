const patient = require('../Models/Models')
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
let number = 1000;

//GET ALL PATIENTS
const getpatients = async(req,res)=>{
  try {

    const patient_db = await patient.find({ is_active: true },{_id:0});
    
    if(patient_db.length > 0) {
      res.status(200);
      return res.send({ type:'sucess', data: patient_db });
    }else {
      res.status(200);
      return res.send({ type:'sucess', message: "No patient" });
    }

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//GET A PATIENT
const getonepatient = async(req,res)=>{

  const patient_uid = req.params.patient_uid;

  const requiredFields = ["patient_uid"];
  const missingFields = requiredFields.filter(field => ![field]);

  if (missingFields.length > 0) {
    res.status(400);
    return res.send({ type: "error", message: `Mandatory fields missing: ${missingFields.join(', ')}` });
  }

  try {

    const patient_db = await patient.find({ patient_uid:patient_uid, is_active: true },{_id:0});
    
    if(patient_db.length > 0) {
      res.status(200);
      return res.send({ type:'sucess', data: patient_db });
    }else {
      res.status(200);
      return res.send({ type:'sucess', message: "No patient" });
    }

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//CREATE A PATIENT
const createpatient = async(req,res)=>{

  const firstname = req.body.firstname || req.query.firstname ;
  const lastname = req.body.lastname || req.query.lastname ;
  const mobilenumber = req.body.mobilenumber || req.query.mobilenumber ;
  const prefix = req.body.prefix || req.query.prefix ;
  const gender = req.body.gender || req.query.gender ;
  const address = req.body.address || req.query.address ;
  const state = req.body.state || req.query.state ;
  const city = req.body.city || req.query.city ;
  const pincode = req.body.pincode || req.query.pincode ;
  const doctor = req.body.doctor || req.query.doctor ;
  const department = req.body.department || req.query.department ;
  const treatment = req.body.treatment || req.query.treatment ;


  const requiredFields = ["firstname", "lastname", "mobilenumber", "prefix", "gender", "address", "state", "city", "pincode","doctor","treatment","department"];
  const missingFields = requiredFields.filter(field => ![field]);

  if (missingFields.length > 0) {
    res.status(400);
    return res.send({ type: "error", message: `Mandatory fields missing: ${missingFields.join(', ')}` });
  }

  try {

    const patient_data = {
      patient_uid: uuidv4(),
      reg_no: number,
      firstname: firstname,
      lastname: lastname,
      mobilenumber: mobilenumber,
      prefix: prefix,
      gender: gender,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      doctor: doctor,
      department: department,
      treatment: treatment,
      is_active: true,
      created_at: moment().utcOffset('+0530') 
    }

    const patient_db = await patient.create(patient_data);

    if(patient_db) {
      number = number + 1;
      res.status(200);
      return res.send({ type:'sucess', message: "patient added sucessfully" })
    }else {
      res.status(400);
      return res.send({ type:"error", message: "Can't added patient" });
    }

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//EDIT A PATIENT
const editpatient = async(req,res)=>{
    
  const patient_uid = req.params.patient_uid;
  const firstname = req.body.firstname || req.query.firstname ;
  const lastname = req.body.lastname || req.query.lastname ;
  const mobilenumber = req.body.mobilenumber || req.query.mobilenumber ;
  const prefix = req.body.prefix || req.query.prefix ;
  const gender = req.body.gender || req.query.gender ;
  const address = req.body.address || req.query.address ;
  const state = req.body.state || req.query.state ;
  const city = req.body.city || req.query.city ;
  const pincode = req.body.pincode || req.query.pincode ;
  const doctor = req.body.doctor || req.query.doctor ;
  const department = req.body.department || req.query.department ;
  const treatment = req.body.treatment || req.query.treatment ;

  const requiredFields = ["firstname", "lastname", "mobilenumber", "prefix", "gender", "address", "state", "city", "pincode","doctor","treatment","department","patient_uid"];
  const missingFields = requiredFields.filter(field => ![field]);

  if (missingFields.length > 0) {
    res.status(400);
    return res.send({ type: "error", message: `Mandatory fields missing: ${missingFields.join(', ')}` });
  }

  try {

    const patient_db = await patient.findOne({ patient_uid: patient_uid, is_active: true });

    if(!patient_db) {
      res.status(400);
      return res.send({ type:"error", message: "patient not found" });
    }

    const patient_data = {
      firstname: firstname,
      lastname: lastname,
      mobilenumber: mobilenumber,
      prefix: prefix,
      gender: gender,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      doctor: doctor,
      department: department,
      treatment: treatment,
    }

    const patient_save_db = await patient.updateOne({ patient_uid: patient_uid },{ $set: patient_data} )

    if(patient_save_db) {
      res.status(200);
      return res.send({ type:'sucess', message: "patient updated sucessfully" })
    }else {
      res.status(400);
      return res.send({ type:"error", message: "Can't added patient" });
    }


  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//DELETE A PATIENT
const deletepatient = async(req,res)=>{
    console.log(req.params)
  const patient_uid = req.params.patient_uid;

  const requiredFields = ["patient_uid"];
  const missingFields = requiredFields.filter(field => ![field]);

  if (missingFields.length > 0) {
    res.status(400);;;
    return res.send({ type: "error", message: `Mandatory fields missing: ${missingFields.join(', ')}` });
  }

  try {

    const patient_db = await patient.findOneAndDelete({ patient_uid: patient_uid, is_active: true });

    if(!patient_db) {
      res.status(400);
      return res.send({ type:"error", message: "patient not found" });
    }
    res.status(200);
    return res.send({ type:'sucess', message: "Deleted sucessfully" });

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//BIG FILTER
const bigfilter = async(req,res)=>{

  const keyword = req.body.keyword || req.query.keyword ;

  const requiredFields = ["keyword"];
  const missingFields = requiredFields.filter(field => ![field]);

  if (missingFields.length > 0) {
    res.status(400);
    return res.send({ type: "error", message: `Mandatory fields missing: ${missingFields.join(', ')}` });
  }

  try {
    const patient_db = await patient.find({
      $or: [
        { "firstname": { $regex: `^${keyword}$`, $options: 'i' } },
        { "gender": { $regex: `^${keyword}$`, $options: 'i' } },
        { "mobilenumber": { $regex: `^${keyword}$`, $options: 'i' } }
      ],
      is_active: true
    },{_id:0  });
    
    if(patient_db.length > 0) {
      res.status(200);
      return res.send({ type:'sucess', data: patient_db });
    }else {
      res.status(200);
      return res.send({ type:'sucess', message: "No patient" });
    }

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//REPORT
const report = async(req,res) => {
  console.log(req.body)
  const reg_no = req.body.reg_no || req.query.reg_no;
  const first_name = req.body.firstname || req.query.firstname;
  const mobile_number = req.body.mobilenumber || req.query.mobilenumber;
  const from_date = req.body.from_date || req.query.from_date;
  const to_date = req.body.to_date || req.query.to_date;
  let filter = {is_active: true}

  if(reg_no && reg_no != "") {
    filter.reg_no = reg_no;
  }

  if(first_name && first_name != "") {
    filter.firstname = first_name
  }

  if(mobile_number && mobile_number != "") {
    filter.mobilenumber = mobile_number
  }

  if(from_date && to_date && from_date !== "" && to_date !== "") {
    const from = moment(from_date).utcOffset('+0530').startOf('day');
    const to = moment(to_date).utcOffset('+0530').endOf('day');
    filter.created_at = { $gt: from, $lt:to }
  }

  if(from_date && (!to_date || to_date == "")) {
    const date = moment(from_date).utcOffset('+0530').startOf('day');
    filter.created_at = { $gt: date }
  }

  if((!from_date || from_date == "") && to_date) {
    const date = moment(to_date).utcOffset('+0530').endOf('day');
    filter.created_at = { $lte: date }
  }

  try {

    const patient_db = await patient.find(filter);
    
    if(patient_db.length > 0) {
      res.status(200);
      return res.send({ type:'sucess', data: patient_db });
    }else {
      res.status(200);
      return res.send({ type:'sucess', message: "No patient" });
    }

  }catch(error) {
    console.log(error);
    res.status(500);
    return res.send({ type:"error", message:"Internal Server Error" });
  }
}

//DATEOFBIRTH
const dateofbirth = async(req,res) => {
  const date_time = req.body.date || req.query.date;

  if(!date_time) {
    res.status(400)
    return res.send({ type:"error", message: "Mandatory field missing" });
  }

  try{
    const date = moment(date_time).startOf('day');
    const current_date = moment();

    const age = current_date.diff(date, 'years');

    res.status(200)
    return res.send({ type: 'success', age: age });

  }catch(error) {
    res.status(500)
    return res.send({ type: "error", message: "Internal Server Error" })
  }
}

module.exports = {
  getpatients: getpatients,
  getonepatient: getonepatient,
  createpatient : createpatient,
  editpatient: editpatient,
  deletepatient: deletepatient,
  bigfilter: bigfilter,
  report:report,
  dateofbirth: dateofbirth
}