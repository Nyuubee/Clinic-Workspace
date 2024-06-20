export default eventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)

    })
    
    //const treatmentIdRaw = getRouterParam(event, 'id')
    //if (treatmentIdRaw === undefined) {
    //    throw createError({
    //        statusCode: 400,
    //        statusMessage: 'Missing id'
    //    })
    //}
    //const treatmentId = parseInt(treatmentIdRaw) || NaN
    //if (isNaN(treatmentId)) {
    //    throw createError({
    //        statusCode: 400,
    //        statusMessage: 'id must be a number'
    //    })
    //}
    //return getTreatmentPaymentStatus(treatmentId)
