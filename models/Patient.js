import mongoose from "mongoose";

const patientsSchema = mongoose.Schema(
  {
    // basic info
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    scholarship: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    // clinical history
    reasonForConsultation: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    familyBackground: {
      type: String,
    },
    previousTreatments: {
      type: String,
    },

    // first evaluation
    evaluationMentalHealth: {
      type: String,
    },
    evaluationRisk: {
      type: String,
    },
    objectivesTherapeuticsInitials: {
      type: String,
    },

    // Diagnostic
    provisionalDiagnosis: {
      type: String,
    },
    evaluationDiagnosis: {
      type: String,
    },

    // treatment
    planningTreatment: {
      type: String,
    },
    therapeuticInterventions: {
      type: String,
    },
    recommendedActivities: {
      type: String,
    },

    // Medication
    medicines: {
      type: String,
    },
    dose: {
      type: String,
    },
    frequency: {
      type: String,
    },

    // progress and sessions
    duration: {
      type: String,
    },
    discussedTopics: {
      type: String,
    },
    therapeuticTechniques: {
      type: String,
    },
    progress: {
      type: String,
    },

    // evaluation
    reviewsTreatment: {
      type: String,
    },
    adjustmentsMade: {
      type: String,
    },
    treatmentEffectiveness: {
      type: String,
    },

    // notes
    observations: {
      type: String,
    },
    importantEvents: {
      type: String,
    },
    feedbackPatient: {
      type: String,
    },

    // Psychologist
    psychologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Psychologist",
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientsSchema);