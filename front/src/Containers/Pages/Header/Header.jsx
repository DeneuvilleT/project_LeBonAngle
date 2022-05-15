import React, { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import styles from '../Header/header.module.css';



function Header() {

  const { connected, setConnected, admin } = useContext(GlobalContext);


  const logout = () => {
    setConnected(false);
  };

  return (
    <header className={styles.header}>

      <h2>Lebonangle</h2>
      <Link to={'/'}>Accueil</Link>

      {
        connected ? <Link to={'/form'}>Publier une annonce</Link> : <></>
      }
      
      {
        admin ? <Link to={'/admin'}>Administration</Link> : <Link to={'/admin'}>Mon profil</Link>
      }
      
      {
        connected ? <Link to={'/form'} onClick={() => { logout() }}>Se déconnecter</Link> :
          <Link to={'/form'} >Se connecter</Link>
      }

    </header>
  )
}

export default Header;