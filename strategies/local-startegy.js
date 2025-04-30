import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../content.js";
import { User } from "../mangoose/schemas/user.js";
import { comparePassword } from "../utils/hashing.js";

passport.serializeUser((user, done)=>{
    console.log(`Inside serializerUser`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
    console.log(`Inside Deserializer`)
    console.log(`Deserializing user ID ${id}`)
    try {
        const findUser = await User.findById(id)
        done(null, findUser)
        
    } catch (error) {
        done(error, null)
    }

})

export default passport.use(
    new Strategy( async(username, password, done)=>{
        try{
        const findUser = await User.findOne({username})
        if(!findUser) throw new Error("User not Found")
        // if(findUser.password !== password) throw new Error("Bab Credentials")
         if(!comparePassword(password, findUser.password))
             throw new Error("Bad Credentials Check Again")
        done(null, findUser)

        }catch(err){
            done(err, null)

        }
        
    })
)


// Client ID
// 1366713597824340062

// Client Secret
// ktwhcUcz7Ix8MDt3xoW51Sxi2QNS3kxW

// localhost:3000/api/auth/discord/redirect