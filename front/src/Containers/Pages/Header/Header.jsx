import React from 'react';
import styles from '../Header/header.module.css';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className={styles.header}>
      <h2 style={{marginRight : '25%'}}>Lebonangle</h2>
      <Link to={'/'}>Home</Link>
      <Link to={'/form'}>Formulaire</Link>
      <Link to={'/admin'}>Admin</Link>
    </div>
  )
}

export default Header;