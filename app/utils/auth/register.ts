import { arrayBufferToHex, sha256 } from "@clinic/crypto";
import { login } from "./login";
import { FetchError } from "ofetch"

/**
 * Registers the user then logs them in if successful
 */
export async function register(username: string, password: string): Promise<"UsernameTaken"|"Unhandled">{
    const hashedBuffer = await sha256(password)
    const hashedHex = arrayBufferToHex(hashedBuffer)
    const result = await $fetch('/api/users', {
        method: 'POST',
        body: {
            username,
            password: hashedHex
        }
    }).catch(e => {
        if (e instanceof FetchError) {
            if (e.status == 409 && e.statusText == 'Username is taken') {
                return "UsernameTaken"
            }
        }
        return "Unhandled"
    })
    if (typeof result == 'string') {
        return result
    }
    
    if (result.result) {
        await login(username, password)
    }

    return 'Unhandled'
}
