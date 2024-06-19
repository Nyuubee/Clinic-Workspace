// Contains sample drizzle code to be run in drizzle studio.

import { eq } from "drizzle-orm";
import { db, tables } from ".";
import { treatment } from "./schema/treatment";
import { auth } from "./schema/auth";
import { payment, PaymentMethodEnum } from "./schema/payment";
import { user,UserRoleEnum,UserSexEnum } from "./schema/user";
export async function _samplePatient() {
  // Insert a patient, no middle name
  await db.insert(user)
    .values({
      id:1,
      firstName: 'John',
      lastName: 'Doe',
      role: 'patient',
      email: 'JohnDoe@gmail.com',
      phone: '091234567',
      sex: 'male',
      suffix: 'Jr'
    }).onConflictDoNothing()
}

export async function _sampleDoctor() {
  // Insert a doctor, with middle name
  await db.insert(user)
    .values({
      id:2,
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'doctor',
      email: 'JaneDoe@gmail.com',
      phone: '091234567',
      sex: 'female',
      middleName: 'Smith'
    }).onConflictDoNothing()
}


export async function _sampleTreatment() {
  // get the doctor and patient ids
  const doctor = await db.select().from(user)
    .where(eq(user.role, 'doctor'))
    .limit(1).then(takeUniqueOrThrow)
  const patient = await db.select().from(user)
    .where(eq(user.role, 'patient'))
    .limit(1).then(takeUniqueOrThrow)

  await db.transaction(async (tx) => {
    // Insert a treatment
    const t = await db.insert(treatment)
      .values({
        id: 1,
        doctorId: doctor.id,
        patientId: patient.id,
        // Php 100
        amountChargedCentavos: 10000,
        procedure: 'Cleaning',
        toothNumbers: [54, 55, 56]
      }).returning({
        id: treatment.id,
        amountChargedCentavos: treatment.amountChargedCentavos
      }).then(takeUniqueOrThrow)

    // Insert a complete payment
    await db.insert(payment)
      .values({
        id: 1,
        amountPaidCentavos: t.amountChargedCentavos,
        method: 'cash',
        treatmentId: t.id
      })
  })
}

export async function _sampleDoctorWithCredentials() {
  // Insert a doctor, with middle name
  const doctor = await db.insert(user)
    .values({
      id:3,
      firstName: 'chani',
      lastName: 'atreides',
      role: 'doctor',
      email: 'chani@dune.com',
      phone: '091234567',
      sex: 'female',
    })
    .onConflictDoNothing()
    .returning({ id: user.id}).then(takeUniqueOrThrow)

    const auth = await db.insert(tables.auth)
    .values({
      userId: doctor.id,
      username: 'chani',
      password: '008830000045751464051690000002060500038',
      salt: 'melange'
    }).returning({ userId: tables.auth.userId })
    .onConflictDoNothing()
    .then(takeUniqueOrThrow)
}
