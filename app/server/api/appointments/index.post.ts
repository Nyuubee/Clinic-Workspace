import { db } from '~/server/database'
import { appointments } from '~/server/database/schema'

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('Received form data:', body)
    
    await db.insert(appointments)
      .values({
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        purpose: body.purpose,
        notes: body.notes
      })
      .execute()

    return { message: 'Appointment created' }
  } catch (error) {
    console.error('Error creating appointment:', error)
    console.error('Error details:', error.stack || error.message)
    return event.node.res.status(500).send({ error: 'Error creating appointment' })
  }
})
