import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctorprofile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import doctorModel from "../models/doctorModel.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointements", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appiontment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appiontment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorprofile);

export default doctorRouter;
