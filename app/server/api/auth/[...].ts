// file: ~/server/api/auth/[...].ts
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { db, tables } from '~/server/database'
import { DrizzleError, and, eq } from 'drizzle-orm'
import * as auth from '~/server/utils/auth'
import { derivePassword } from '@clinic/crypto'
import GoogleProvider from 'next-auth/providers/google'
async function getAuthWithUser(username: string) {
    return await db.query.auth.findFirst({
        where: eq(tables.auth.username, username),
        columns: {
            salt: true,
            username: true,
            password: true,
        },
        with: {
            user: {
                columns: {
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    email: true,
                },
            }
        }
    })
}

async function authenticate(credentials: auth.LoginProps, auth: Awaited<ReturnType<typeof getAuthWithUser>>) {
    if (auth == undefined) {
        return undefined
    }
    const hashedHex = await derivePassword(credentials.password, auth.salt)
    if (auth.password.localeCompare(hashedHex) == 0) {
        return auth.user.id
    }
    return undefined
}
export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    //secret: process.env.AUTH_SECRET, // TODO
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [

        // https://next-auth.js.org/providers/google#example
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID || 'enter-your-client-id-here',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'enter-your-client-secret-here',
            // Google only provides Refresh Token to an application the first time a user signs in.
            // To force Google to re-issue a Refresh Token, the user needs to remove the application from their account and sign 
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: '(hint: chani)' },
                password: { label: 'Hashed Password', type: 'text', placeholder: 'hashed password' }
            },

            async authorize(credentials: auth.LoginProps) {
                let auth: Awaited<ReturnType<typeof getAuthWithUser>> | undefined = undefined;
                try {
                    auth = await getAuthWithUser(credentials.username)
                } catch (error) {
                    if (error instanceof DrizzleError) {
                        if (error.message == 'Found non unique or inexistent value') {

                            throw createError({
                                statusCode: 401,
                                statusMessage: "Invalid username or password"
                            })
                        }
                        throw createError({
                            statusCode: 401,
                            statusMessage: JSON.stringify(error)
                        })
                    } else {
                        throw createError({
                            statusCode: 500, // Internal Server Error
                            statusMessage: JSON.stringify(error)
                        })
                    }
                }
                const userId = await authenticate(credentials, auth)
                console.log('userId', userId)
                // return null cause https://next-auth.js.org/configuration/pages#sign-in-page will trigger error=CredentialsSignin
                if (userId == undefined || auth == null) {
                    return null
                }

                return {
                    id: userId,
                    name: auth.username,
                    firstName: auth.user.firstName,
                    lastName: auth.user.lastName,
                    middleName: auth.user.middleName,
                    email: auth.user.email,
                }
            },
        }),

    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                return true;
            }
            // Do different verification for other providers that don't have `email_verified`
            return true
        },

        async jwt({ token, user, profile }) {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                // oauth
                if (profile && profile.email) {
                    console.log('PROFILE', profile)
                    // check if oauth email is bound to a user
                    let oauth = await db.query.oauth.findFirst({
                        where: eq(tables.oauth.email, profile.email),
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    firstName: true,
                                    middleName: true,
                                    lastName: true,
                                },
                                with: {
                                    auth: true
                                }
                            },
                        }
                    })
                    console.log('OAUTH', oauth)
                    if (oauth && oauth.user) {
                        user.name = oauth.user.auth.username
                        user.firstName = oauth.user.firstName
                        user.middleName = oauth.user.middleName
                        user.lastName = oauth.user.lastName
                        user.id = oauth.user.id
                        token.oauth = oauth.provider
                    }
                }
                if (typeof user.id == 'number') {
                    return Promise.resolve({
                        id: user.id,
                        name: user.name,
                        sub: token.sub,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        picture: token.picture,
                        email: token.email,
                        oauth: token.oauth,
                    })
                }
            }

            return token
        },

        async session({ session, token }) {
            console.log({ session, token })

            if (token) {
                session.user = {
                    id: token.id as number,
                    name: token.name as string,
                    email: token.email as string,
                    image: token.picture as string,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    middleName: token.middleName,
                    oauth: token.oauth,
                }
            }
            return session
        },
    },
    events: {
        linkAccount: async (message) => {
            console.log('EV: LINK ACCOUNT', message)
        }
    }
})
