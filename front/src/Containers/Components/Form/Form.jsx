import React from 'react';
import styles from '../Form/form.module.css';

function Form() {
  return (
    <main id='mainForm' role='main' className={styles.form}>
      <h1>Formulaire</h1>

      <form action="/api/v1/product/add" method='post'>

        <label htmlFor="title">Titre de l'annonce</label>
        <input type="text" name='title'/>
        
        <label htmlFor='description'>Description</label>
        <textarea name="description" cols="30" rows="10"></textarea>

        <input htmlFor="img" type="file" />

        <input type="submit" value='Envoyer' />
        
      </form>
    </main>
  );
};

export default Form;