import {getServerSession, getToken} from "#auth"
import { eq } from "drizzle-orm"
import { navigateTo } from "nuxt/app"
import { db, tables } from "~/server/database"
export default eventHandler(async(event)=> {
    const userId = getRouteParamInt(event, 'id')
    const session = await getServerSession(event)
    if (session == null) {
        throw createError({
            statusMessage: 'Unauthorized',
            status: 401,
        })
    }
    console.log("LINK START", session)
    const oauthExists = await db.query.oauth.findFirst({
        where: eq(tables.oauth.email, session.user?.email!),
    })
    if (oauthExists) {
        throw createError({
            // redirect to /
            statusMessage: 'Already linked',
            status: 301,
        })
    }
    const user = await db.query.user.findFirst({
        where: eq(tables.user.id, userId),
    })
    console.log("USER EXISTS", user)
    if (user == undefined) {
        throw createError({
            statusMessage: 'User not found',
            status: 404,
        })
    }

    // insert oauth's email
    await db.insert(tables.oauth).values({
        userId,
        provider: 'google',
        email: session.user?.email!,
    });

    //return nothing, means HTTP 200 ok
    return {
        google:true
    }
})
