import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { Middleware } from '../../../middleware';

// https://next-auth.js.org/configuration/providers

const options = {

  providers: [

    // Providers.GitHub({
    //   clientId: process.env.NEXTAUTH_GITHUB_ID,
    //   clientSecret: process.env.NEXTAUTH_GITHUB_SECRET
    // }),

    // Providers.Apple({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),

    Providers.Email({
      server: process.env.NEXTAUTH_SMTP,
      from: '<no-reply@urgeproducts.com>'
    }),

    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET
    })

  ],
  
  // SQL or MongoDB database (or leave empty)
  database: process.env.NEXTAUTH_DATABASE_CONNECTION,

  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_JWT_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens 
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/api/auth/signin',  // Displays signin buttons
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // https://next-auth.js.org/configuration/callbacks 
  callbacks: {
    // signIn: async (user, account, profile) => { return Promise.resolve(true) },
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    // session: async (session, user) => { return Promise.resolve(session) },
    // jwt: async (token, user, account, profile, isNewUser) => { return Promise.resolve(token) }
  },

  // https://next-auth.js.org/configuration/events
  events: {},

  debug: false

}

const handler: Middleware<void> = (req, res) => NextAuth(req, res, options);

export default handler;