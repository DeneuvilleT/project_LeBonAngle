import React from 'react';


function Msg({ msg }) {

   return (
      <>
         {
            msg === "" && <></>
         }
         {
            msg === "Votre annonce a bien été posté !" && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Compte validé" && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Votre email a été validé." && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Email vérifié et compte activé !" && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Authentification réussi !" && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Les informations ont bien été mis à jour." && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Un email de confirmation vous a été envoyé." && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "L'article a bien été supprimé." && <p className='goodMsg' >{msg}</p>
         }
         {
            msg === "Visiblement il y a eu une erreur lors de la publication de votre annonce, veuillez réésayer." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Visiblement il y a eu une erreur lors de votre enregistrement, veuillez réésayer." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Probléme lors de la mise à jour de votre annonce." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Utilisateur inccorect." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Mot de passe incorrect." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "En cours de validation" && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Votre email n'a pas encore été vérifié." && <p className='badMsg' >{msg}</p>
         }
         {
            msg === "Erreur lors de la verification de votre email." && <p className='badMsg' >{msg}</p>
         }
      </>

   );
};

export default Msg;