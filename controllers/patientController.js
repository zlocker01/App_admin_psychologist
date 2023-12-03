import { Patient } from "../models/Patient.js";

const addPatient = async (req, res) => {
  const patient = new Patient(req.body);
  patient.psychologist = req.psychologist._id;

  try {
    const savedPatient = await patient.save();
    res.json(savedPatient);
  } catch (error) {
    console.log(error);
  }
};

const getPatients = async (req, res) => {
  const patients = await Patient.find()
    .where("psychologist")
    .equals(req.psychologist);
  res.json(patients);
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }
  
  if (patient.psychologist._id.toString() !== req.psychologist._id.toString()) {
    return res.status(403).json({ msg: "Acción invalida" });
  }

  res.json(patient);
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id).populate("sessions");

  if (!patient) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  if (patient.psychologist._id.toString() !== req.psychologist._id.toString()) {
    return res.status(403).json({ msg: "Acción invalida" });
  }

  //   updating patient

  // basic info
  patient.name = req.body.name || patient.name;
  patient.age = req.body.age || patient.age;
  patient.gender = req.body.gender || patient.gender;
  patient.scholarship = req.body.scholarship || patient.scholarship;
  patient.phone = req.body.phone || patient.phone;
  patient.email = req.body.email || patient.email;
  patient.address = req.body.address || patient.address;

  // first evaluation
  patient.evaluationMentalHealth =
    req.body.evaluationMentalHealth || patient.evaluationMentalHealth;
  patient.evaluationRisk = req.body.evaluationRisk || patient.evaluationRisk;
  patient.objectivesTherapeuticsInitials =
    req.body.objectivesTherapeuticsInitials ||
    patient.objectivesTherapeuticsInitials;

  // progress and sessions
  patient.sessions = req.body.sessions || patient.sessions;
  patient.date = req.body.date || patient.date;
  patient.duration = req.body.duration || patient.duration;
  patient.discussedTopics = req.body.discussedTopics || patient.discussedTopics;
  patient.therapeuticTechniques =
    req.body.therapeuticTechniques || patient.therapeuticTechniques;
  patient.progress = req.body.progress || patient.progress;

  // Diagnostic
  patient.provisionalDiagnosis =
    req.body.provisionalDiagnosis || patient.provisionalDiagnosis;
  patient.evaluationDiagnosis =
    req.body.evaluationDiagnosis || patient.evaluationDiagnosis;

  // treatment
  patient.planningTreatment =
    req.body.planningTreatment || patient.planningTreatment;
  patient.therapeuticInterventions =
    req.body.therapeuticInterventions || patient.therapeuticInterventions;
  patient.recommendedActivities =
    req.body.recommendedActivities || patient.recommendedActivities;

  // Medication
  patient.medicines = req.body.medicines || patient.medicines;
  patient.dose = req.body.dose || patient.dose;
  patient.frequency = req.body.frequency || patient.frequency;

  // evaluation
  patient.reviewsTreatment =
    req.body.reviewsTreatment || patient.reviewsTreatment;
  patient.adjustmentsMade = req.body.adjustmentsMade || patient.adjustmentsMade;
  patient.treatmentEffectiveness =
    req.body.treatmentEffectiveness || patient.treatmentEffectiveness;

  // notes
  patient.observations = req.body.observations || patient.observations;
  patient.importantEvents = req.body.importantEvents || patient.importantEvents;
  patient.feedbackPatient = req.body.feedbackPatient || patient.feedbackPatient;

  try {
    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    console.log(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  if (patient.psychologist._id.toString() !== req.psychologist._id.toString()) {
    return res.stauts(403).json({ msg: "Acción invalida" });
  }

  try {
    await patient.deleteOne();
    res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
