import { db } from '~/server/database'
import { appointments } from '~/server/database/schema'

export default eventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const body = await readBody(event);
    console.log('Received update data:', body);
    
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
      .where('id', '=', id)
      .execute();

    return { message: 'Appointment updated' }
  } catch (error) {
    console.error('Error updating appointment:', error);
    return event.node.res.status(500).send({ error: 'Error updating appointment' })
  }
});
