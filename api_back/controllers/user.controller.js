import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import sendM from '../lib/mailing.js';


export const loadUsers = async (req, res, next) => {

   try {
      const item = await User.getAllUsers();
      if (!item[0].length) {
         throw Error;

      } else {
         res.status(200).send(item);

      };
   } catch (error) {
      console.log(error);
   };
};



export const loadOneUser = async (req, res, next) => {

   const id = req.params.id;

   try {
      const item = await User.getOneUser(id);
      if (!item[0].length) {
         throw Error;

      } else {
         res.status(200).send(item);

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
   };

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



export const loginUser = async (req, res, next) => {

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
            return res.json({
               status: 200,
               id: userBeLogin[0][0].id,
               activate: userBeLogin[0][0].activate,
               email: userBeLogin[0][0].email,
               msg: 'Authentification réussi !',
            });

         } else {
            return res.json({
               status: 400,
               msg: 'Mot de passe incorrect.',
            });

         };
      };

   } catch (error) {
      console.log(error);
   };
};



export const sendMail = async (req, res, next) => {

   const email = req.body.email

   try {

      sendM(email, "Bienvenue", "Bonjour ... vous !",
      `<a href="http://localhost:3000/validate/${email}" >Lien</a>`);

      res.json({
         status: 200,
      });

   } catch (error) {
      console.log(error);
   };
};



export const validateUser = async (req, res, next) => {

   const email = req.params.email;

   try {
      const recupDatauser = await User.logMail(email);
      if (!recupDatauser[0].length) {
         throw Error;

      } else {
         req.session.isLogged = true;
         res.status(200).send(recupDatauser);

      };

   } catch (error) {
      console.log(error);
   };
};
