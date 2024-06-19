import { sha256, arrayBufferToHex } from "@clinic/crypto"

export async function login(username: string, password: string) {
    const hashedBuffer = await sha256(password)
    const hashedHex = arrayBufferToHex(hashedBuffer)
    const { signIn } = useAuth()
    const result = await signIn('credentials', {
        username,
        password: hashedHex,
        redirect: false,
    })
    console.log(result)
    if (result.error == null) {
        const router = useRouter()
        router.push('/')
    }

    return result
}

