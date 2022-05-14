import React, { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import styles from '../Header/header.module.css';



function Header() {

  const { connected, setConnected } = useContext(GlobalContext);


  const logout = () => {
    setConnected(false);
  };

  return (
    <div className={styles.header}>

      <h2>Lebonangle</h2>
      <Link to={'/'}>Home</Link>
      <Link to={'/form'}>Formulaire</Link>
      <Link to={'/admin'}>Admin</Link>

      {
        connected ? <Link to={'/form'} onClick={() => { logout() }}>Se déconnecter</Link> :
          <Link to={'/form'} >Se connecter</Link>
      }

    </div>
  )
}

export default Header;