import { environment } from "@/config/environment";
import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";


export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: {label: "identifier", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(
                credentials: Record<"identifier" | "password", string> | undefined,
            ) : Promise<UserExtended | null> {
                const {identifier, password} = credentials as {
                    identifier: string;
                    password: string;
                }

                const result = await authServices.login({
                    identifier,
                    password,
                });

                // Mengambil akses token
                const accessToken = result.data.data;

                // Mengambil data user
                const me = await authServices.getProfileWithToken(accessToken);
                const user = me.data.data;

                // Jika berhasil
                if(accessToken && result.status === 200 && user._id && me.status === 200) {
                    user.accessToken = accessToken;
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    // Menggenerate JWT, menerima token dan user dan memasukkan user ke tokennya dan hanya menghasilkan tokennya
    callbacks: {
        async jwt({
            token, user} : {token: JWTExtended; user: UserExtended | null
        }) {
            if(user) {
                token.user = user;
            }
            return token;
        },
        async session({
            session, token
        }: {
            // Menggenereate Sessionnya
            session: SessionExtended,
            token: JWTExtended
        }) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session
        }
    }
})
