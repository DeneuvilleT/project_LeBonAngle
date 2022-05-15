import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../PageValidate/pagevalidate.module.css';

function PageValidate() {

   const { email } = useParams();
   const { url, setConnected, setId } = useContext(GlobalContext);

   useEffect(() => {
      dataUser()
   }, []);


   const dataUser = async () => {

      try {
         const res = await fetch(`${url}/api/v1/validate_user/${email}`);
         const resJson = await res.json();

         setConnected(true);
         setId(resJson[0][0].id);
         return

      } catch (error) {
         console.log(error);
      };
   };

   return (

      <> <main role='main' className={styles.pagevalidate}>

         <section>

            <h1>Formulaire</h1>
            <hr />

            <article>
               <Logo />
            </article>

         </section>

         <section>

            <article>
               <h2>Vous voilà maintenant inscrit à LeBonAngle, félicitations !</h2>

               <h3>Vous pouvez dés à présent cliquer sur le lien ci-dessous pour être redirigé vers LeBonAngle, vous serez automatiquement connecté.</h3>

               <Link to={`/`}>Redirection vers l'écran d'accueil de LeBonAngle</Link>
            </article>

         </section>

      </main>
      </>
   )
};

export default PageValidate;