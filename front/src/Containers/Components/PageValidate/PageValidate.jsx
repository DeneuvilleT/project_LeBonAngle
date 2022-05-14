import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../PageValidate/pagevalidate.module.css';

function PageValidate() {

   const { setConnected } = useContext(GlobalContext);

   useEffect(() => {
      setConnected(true)
   }, []);

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
}

export default PageValidate;