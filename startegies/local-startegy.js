import passport from "passport";

import { Strategy } from "passport-local";
import { mockUser } from "../content.js";

passport.serializeUser((user, done)=>{
    console.log(`Inside serializerUser`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    console.log(`Inside Deserializer`)
    console.log(`Deserializing user ID ${id}`)
    try {
        const findUser = mockUser.find((user)=> user.id == id)
        done(null, findUser)
        
    } catch (error) {
        done(error, null)
    }

})

export default passport.use(
    new Strategy((username, password, done)=>{
        console.log(`UserName ${username}`)
        console.log(`UserName ${password}`)
        try{
        const findUser = mockUser.find((user)=> user.username === username);
        if (!findUser) throw new Error('User not Found');
        if(findUser.password != password) throw new Error("Invalid Credentials")
        
            done(null, findUser)

        }catch(err){
            done(err, null)

        }
        
    })
)