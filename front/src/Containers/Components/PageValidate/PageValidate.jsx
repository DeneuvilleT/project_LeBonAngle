import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../PageValidate/pagevalidate.module.css';
import Msg from '../Msg/Msg';

function PageValidate() {

   const { email } = useParams();
   const { msg, setMsg, url, setConnected, connected, setId } = useContext(GlobalContext);

   useEffect(() => {
      dataUser()
   }, []);


   const dataUser = async () => {

      try {
         const res = await fetch(`${url}/api/v1/validate_user/${email}`);
         const resJson = await res.json();

         if (res.status === 200) {
            setMsg('Email vérifié et compte activé !');
            setConnected(true);
            setId(resJson[0][0].id);
            return

         } else {
            setMsg('Erreur lors de la verification de votre email.');
            return

         }

      } catch (error) {
         console.log(error);
      };
   };

   return (

       <main role='main' className={styles.pagevalidate}>

         <section>

            <h1>LeBonAngle</h1>
            <hr />

            <Msg msg={msg} />
            <Logo />

         </section>

         <section>

            {connected ?
               <article>
                  <h2>Vous voilà maintenant inscrit à LeBonAngle, félicitations !</h2>

                  <h3>Vous pouvez dés à présent cliquer sur le lien ci-dessous pour être redirigé vers LeBonAngle, vous serez automatiquement connecté.</h3>

                  <Link to={`/`}>Redirection vers l'écran d'accueil de LeBonAngle</Link>
               </article>
               :
               // <article>
               //    <h3>Votre compte est déjà activé.</h3>

               //    <Link to={`/`}>Redirection vers l'écran d'accueil de LeBonAngle</Link>
               // </article>
               <></>
            }

         </section>

      </main>
      
   )
};

export default PageValidate;