import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const clientId = '802413454918-lb2hv5g0imlr66tocavemgaj8pbo6bn1.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//045o0qUBXmEMsCgYIARAAGAQSNwF-L9IrSIDZmQEqj__YFn5Tk84CAEZMyLOmGiLmYXEn4Jyc1S940yvyLOtYWDk861OsOzHykAg';
const acessToken = 'ya29.A0ARrdaM8hVtB2D3TjSB9rfU9vhiPbrfkgtEi0fcom6FLTS44faHKBqATub00fTk7faun2mXXPc7ujHrZhQYCoDpRmvAxPs3qry2-9IqLE8fV-o-MnACu-C47xsGJJQK-xdcD406C2Q6u5gKsv0VfCil02kD1F';

const sendM = (mailTo, subject, title, text) => {

   const oauth2Client = new OAuth2(
      clientId, clientSecret, "https://developers.google.com/oauthplayground",
   );

   oauth2Client.setCredentials({
      refresh_token: refreshToken,
   });

   console.log(mailTo, subject, title, text);

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: "thomas.deneuville@3wa.io",
         clientId: clientId,
         clientSecret: clientSecret,
         refreshToken: refreshToken,
         accessToken: acessToken,
      }
   })

   const mailOptions = {
      from: 'LeBonAngle',
      to: mailTo,
      subject: subject,
      text: '',
      html: "<b>" + title + "</b><p>" + text + "<p>",
   }

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("raté");
         return console.log(error);
      } else {
         console.log("Réussi");

      }
   })
}

export default sendM