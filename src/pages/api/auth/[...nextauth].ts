import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../database/connection';
import '../database/connect';
//import User from '../database/schema/user';

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: "923920710129-j5vfag9aejb07ip7af05o31r9gbd174f.apps.googleusercontent.com",
            clientSecret: "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",
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