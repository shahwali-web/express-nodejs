import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { DiscordUser } from "../mangoose/schemas/discord-user.js";


passport.serializeUser((user, done)=>{
  console.log(`Inside serializerUser`)
  console.log(user)
  done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
  try {
    const findUser = await DiscordUser.findById(id);
    // findUser = await  DiscordUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null)
 } catch (error) {
   return done(error, null)

 };

})



// Discord OAuth2 Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: "1366713597824340062",
      clientSecret: "ktwhcUcz7Ix8MDt3xoW51Sxi2QNS3kxW",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      // scope: ["identify", "guilds","email"],
      scope: ["identify"],
    },


    async (accessToken, refreshToken, profile, done) =>{
      console.log("Discord profile:", profile);
      let findUser;
      try {
         findUser = await DiscordUser.findOne({discordId: profile.id});
      } catch (error) {
        return done(error, null)

      };
      try {
        if(!findUser){
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,});
            
          const newSaveUser = await newUser.save();
          return done(null, newSaveUser);

          }
          return done(null, findUser)
      } catch (error) {
        return done(error, null)

      
        

      }
    }
  )
);
