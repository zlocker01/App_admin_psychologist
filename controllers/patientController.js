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
  const patient = await Patient.findById(id);

  if (!patient) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  if (patient.psychologist._id.toString() !== req.psychologist._id.toString()) {
    return res.status(403).json({ msg: "Acción invalida" });
  }

  //   updating patient

  const {
    name,
    age,
    gender,
    email,
    phone,
    address,
    date,
    scholarship,
    reasonForConsultation,
    medicalHistory,
    familyBackground,
    previousTreatments,
    evaluationMentalHealth,
    evaluationRisk,
    objectivesTherapeuticsInitials,
    provisionalDiagnosis,
    evaluationDiagnosis,
    planningTreatment,
    therapeuticInterventions,
    recommendedActivities,
    medicines,
    dose,
    frequency,
    duration,
    discussedTopics,
    therapeuticTechniques,
    progress,
    reviewsTreatment,
    adjustmentsMade,
    treatmentEffectiveness,
    observations,
    importantEvents,
    feedbackPatient,
  } = req.body;

  // basic info
  patient.name = name || patient.name;
  patient.age = age || patient.age;
  patient.gender = gender || patient.gender;
  patient.scholarship = scholarship || patient.scholarship;
  patient.phone = phone || patient.phone;
  patient.email = email || patient.email;
  patient.address = address || patient.address;
  
  // history
  patient.reasonForConsultation = reasonForConsultation || patient.reasonForConsultation;
  patient.medicalHistory = medicalHistory || patient.medicalHistory; 
  patient.reasonForConsultationaddress = reasonForConsultationaddress || patient.reasonForConsultationaddress;
  patient.familyBackground = familyBackground|| patient.familyBackgrounds;
  patient.previousTreatments = previousTreatments|| patient.previousTreatments;

  // first evaluation
  patient.evaluationMentalHealth = evaluationMentalHealth || patient.evaluationMentalHealth;
  patient.evaluationRisk = evaluationRisk || patient.evaluationRisk;
  patient.objectivesTherapeuticsInitials = objectivesTherapeuticsInitials || patient.objectivesTherapeuticsInitials;

  // progress and sessions
  patient.sessions = sessions || patient.sessions;
  patient.date = date || patient.date;
  patient.duration = duration || patient.duration;
  patient.discussedTopics = discussedTopics || patient.discussedTopics;
  patient.therapeuticTechniques = therapeuticTechniques || patient.therapeuticTechniques;
  patient.progress = progress || patient.progress;

  // Diagnostic
  patient.provisionalDiagnosis = provisionalDiagnosis || patient.provisionalDiagnosis;
  patient.evaluationDiagnosis = evaluationDiagnosis || patient.evaluationDiagnosis;

  // treatment
  patient.planningTreatment = planningTreatment || patient.planningTreatment;
  patient.therapeuticInterventions = therapeuticInterventions || patient.therapeuticInterventions;
  patient.recommendedActivities = recommendedActivities || patient.recommendedActivities;

  // Medication
  patient.medicines = medicines || patient.medicines;
  patient.dose = dose || patient.dose;
  patient.frequency = frequency || patient.frequency;

  // evaluation
  patient.reviewsTreatment =
    req.body.reviewsTreatment || patient.reviewsTreatment;
  patient.adjustmentsMade = adjustmentsMade || patient.adjustmentsMade;
  patient.treatmentEffectiveness = treatmentEffectiveness || patient.treatmentEffectiveness;

  // notes
  patient.observations = observations || patient.observations;
  patient.importantEvents = importantEvents || patient.importantEvents;
  patient.feedbackPatient = feedbackPatient || patient.feedbackPatient;

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
