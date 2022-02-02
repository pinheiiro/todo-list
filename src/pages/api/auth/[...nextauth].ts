import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
//import clientPromise from '../database/connection';
import { clientPromise, db } from '../database/client';
import { signIn } from 'next-auth/react';
//import '../database/connect';
//import User from '../database/schema/user';

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    /*
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                const { name, email } = user;
                //console.log(name + '\n' + email);
                try {
                const findUser = User.findOne({email: email});
                const userExists = await findUser.exec();
                if(!userExists) {
                    const newUser = new User({name: name, email: email});
                    await newUser.save();
                }
                } catch(err) {
                    console.log(err)
                }
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        }
        /*
        async signIn({user}) {
            const { name, email } = user;
            console.log(user);
            try {
                //const userExists = await User.findOne({email}).exec();
                //if (!userExists) {
                    const newUser = new User({name: name, email: email});
                    await newUser.save();
                //}
                return true
            } catch(err) {
                console.log(err)
                return false
            }
        }
        
    }
    */
})