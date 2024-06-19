// Runs all in the sample
import * as sample from "../database/sample"

export default eventHandler(async () => {
    await sample._sampleDoctor()
    await sample._sampleDoctorWithCredentials()
    await sample._samplePatient()
    await sample._sampleTreatment()
})
