// app/server/api/appointments/[id].put.ts
import { db } from '~/server/database'
import { appointments } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const appointmentId = parseInt(event.context.params.id, 10)

    await db.update(appointments)
      .set({
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        purpose: body.purpose,
        notes: body.notes
      })
      .where(eq(appointments.id, appointmentId))
      .execute()

    return { message: 'Appointment updated' }
  } catch (error) {
    console.error('Error updating appointment:', error)
    return { error: 'Error updating appointment' }
  }
})
