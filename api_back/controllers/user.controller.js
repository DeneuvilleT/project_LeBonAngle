import User from "../models/user.model.js";


export const users = async (req, res, next) => {
   try {
      const item = await User.getAllUsers();
      if (!item[0].length) {
         throw Error;
      } else {
         res.set('Access-Control-Allow-Origin', '*')
         res.status(200).send(item)
      };
   } catch (error) {
      console.log(error);
   };
};