import mongoose, { Schema, Document, models } from "mongoose";

export interface IPersonalInformation extends Document {
  userId?: string;
  profileId?: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  mobileNo?: string;
  emailId?: string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  currentStatus?: string;
  otherStatus?: string;
  selfEmployedDesc?: string;
  employedInJobDesc?: string;
  qualificationRows: Array<{ name: string; checked: boolean; year: string; experience: string }>;
  softwareKnowledge: string[];
  softwareOther?: string;
  specialization: string[];
  specializationOther?: string;
  priorWorkExperience: string[];
  priorWorkOther?: string;
  serviceAvailability: string[];
  serviceOther?: string;
  geographicCoverage: string[];
  linkedinUrl?: string;
  attachment?: {
    name: string;
    type: string;
    size: number;
    base64: string;
  } | null;
  status: "incomplete" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInformationSchema = new Schema<IPersonalInformation>(
  {
    userId: { type: String },
    profileId: { type: String, unique: true, sparse: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String },
    mobileNo: { type: String },
    emailId: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    pinCode: { type: String },
    currentStatus: { type: String },
    otherStatus: { type: String },
    selfEmployedDesc: { type: String },
    employedInJobDesc: { type: String },
    qualificationRows: [
      {
        name: { type: String },
        checked: { type: Boolean },
        year: { type: String },
        experience: { type: String },
      },
    ],
    softwareKnowledge: [{ type: String }],
    softwareOther: { type: String },
    specialization: [{ type: String }],
    specializationOther: { type: String },
    priorWorkExperience: [{ type: String }],
    priorWorkOther: { type: String },
    serviceAvailability: [{ type: String }],
    serviceOther: { type: String },
    geographicCoverage: [{ type: String }],
    linkedinUrl: { type: String },
    attachment: { type: mongoose.Schema.Types.Mixed, default: null },
    status: { type: String, enum: ["incomplete", "completed"], default: "incomplete" },
  },
  { timestamps: true }
);

const PersonalInformation = models.PersonalInformation || mongoose.model<IPersonalInformation>("PersonalInformation", PersonalInformationSchema);
export default PersonalInformation;
