import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import sendM from '../lib/mailing.js';


export const users = async (req, res, next) => {
   try {
      const item = await User.getAllUsers();
      if (!item[0].length) {
         throw Error;
      } else {
         res.status(200).send(item)
      };
   } catch (error) {
      console.log(error);
   };
};

export const postUser = async (req, res, next) => {

   const hashed = await bcrypt.hash(req.body.password, 10);
   const datas = {

      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: hashed,
      adress: req.body.adress,
      city: req.body.city,
      code_zip: req.body.code_zip,
   }

   const query = "INSERT INTO `user`(`lastname`, `firstname`, `email` ,`password`, `adress`, `city`, `code_zip`) VALUES (?,?,?,?,?,?,?)";

   try {

      await User.addSaveItem(query, datas);

      res.json({
         status: 200,
         msg: "Un email de confirmation vous a été envoyé."
      });

   } catch (error) {
      console.log(error);
   };
};


export const sendMail = async (req, res, next) => {

   const mail = req.body.email

   try {

      sendM(mail, "Bienvenue", "Bonjour ... vous !",
         `<a href='http://localhost:9000/api/v1/validate_user'>Welcome to the "LeBonAngle"</a>`)

      res.json({
         status: 200,
      });

   } catch (error) {
      console.log(error);
   }
}




export const login = async (req, res, next) => {
   try {
      const userBeLogin = await User.login(req.body.firstname);

      if (!userBeLogin[0].length) {
         res.json({
            status: 404,
            msg: "Utilisateur inccorect.",
         });
      } else {

         // Check password ******************************************************************
         const compPass = await bcrypt.compare(req.body.password, userBeLogin[0][0].password);

         if (compPass) {
            res.json({
               status: 200,
               id: userBeLogin[0][0].id,
               msg: 'Authentification réussi !',
            })
         } else {
            res.json({
               status: 400,
               msg: 'Mot de passe incorrect.',
            })
         }
      };

   } catch (error) {
      console.log(error);
   };
}


export const validateUser = async (req, res, next) => {
   try {

      req.session.isLogged = true;
      console.log(req.session);
      res.redirect("http://localhost:3000/validate/");
      res.json({
         msg: "Votre email a été validé.",
         isLogged: true,
      })

   } catch (error) {
      console.log(error);
   };
}