import NextAuth from "next-auth";
import Providers from "next-auth/providers";




export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true
  },
  callbacks: {
    async session(session, user) {
      console.log('session', session)
      try {
        session.jwt = user.jwt;
        session.id = user.id;
        return Promise.resolve(session);
      } catch (err) {
        console.error("err", err);
        return {
          ...session
        }
      }
    },
    async jwt(token, user, account) {
      try {
        const isSignIn = user ? true : false;
        console.log('account', account)

        console.log('isSignIn', isSignIn)
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        console.log('apiUrl;', apiUrl)
        if (isSignIn) {
          const response = await fetch(apiUrl)
            .then((resp) => resp.json())
            .then(function (data) {
              token.jwt = data.jwt;
              token.id = data.user.id;
            })
        }
        return {
          ...token,

        }
      }
      catch (err) {
        console.error("err", err);
        return {
          ...token
        }
      }
    },
  },
})