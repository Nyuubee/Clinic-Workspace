import { arrayBufferToHex, derivePassword, randomSalt } from "@clinic/crypto"
import { db, tables } from "~/server/database"
import { onUniqueConstraintError } from "~/server/utils/drizzle"
async function register(username: string, salt: string, password: string) {
    // create a user record
    //TODO: Let user change these fields later
    const user = await db.insert(tables.user).values({
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        role: 'doctor',
        sex: 'male',
        suffix: '',
    }).returning({ id: tables.user.id })
        .then(takeUniqueOrThrow)

    // create an auth record
    const auth = await db.insert(tables.auth).values({
        userId: user.id,
        password,
        salt,
        username,
    })
    return true
}

export default eventHandler(async (ev) => {
    const body = await readBody<{
        username: string
        password: string
    }>(ev)
    const saltBuffer = randomSalt()
    const saltHex = arrayBufferToHex(saltBuffer)
    const hashedSaltedPassword = await derivePassword(body.password, saltHex)
    const result = await register(body.username, saltHex, hashedSaltedPassword)
        .catch(onUniqueConstraintError({
            statusMessage: "Username is taken"
        }))
    // TODO: Proper response
    return {
        result
    }
})
