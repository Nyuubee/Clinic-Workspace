import type { PatientInfo } from "./PatientInfo";
import type { DentalHistory, MedicalHistory } from "./medicalHistory";
import {type FormKitGroupValue} from "@formkit/core";
export interface FormRequest extends FormKitGroupValue {
    dentalHistory: DentalHistory
    medicalHistory: MedicalHistory
    patientInfo: PatientInfo
}

/**
 * It's fine to make subfields optional, but the top level fields should be defined as {}.
 */
export interface PartialFormRequest extends FormKitGroupValue {
    dentalHistory: Partial<DentalHistory>
    medicalHistory: Partial<MedicalHistory>
    patientInfo: Partial<PatientInfo>
}
