import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Form/form.module.css';
import axios from 'axios';

function Form() {
  
  const { url } = useContext(GlobalContext);

  // Ajout d'une image *********************
  const [picture, setPicture] = useState(null);
  
  
  const pick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", inputFile.current.files[0]);
  
    try {
      const res = await axios.post(`${url}/form/api/v1/picture`, formData) 
      .then((response) => {
        console.log(response);
        })
      .catch((error) => {
          console.log(error);
      });
  
    } catch (error) {
      console.log(error);
    };
  };
  
  
  // Ajout d'un article ********************
  const title = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();
  const inputFile = useRef();


  const post = async (e) => {
    e.preventDefault()
    const noPhoto = 'api_back/public/images/no_photo.png';
    try {
      const res = await axios.post(`${url}/form/api/v1/product/add`, {

        title: title.current.value,
        description: description.current.value,
        quantity: quantity.current.value,
        price: price.current.value,
        img: 'imgURL.current.value',

      });

      } catch (error) {
      console.log(error);
    };
  };






  return (
    <main role='main' className={styles.form}>

      <h1>Formulaire</h1>

      <form onSubmit={(e) => { post(e) }} >

        <label htmlFor="title">Titre de l'annonce</label>
        <input type="text" ref={title} />

        <label htmlFor='description'>Description</label>
        <textarea ref={description} cols="30" rows="10"></textarea>

        <label htmlFor="quantity">Quantité</label>
        <input min="1" type="number" ref={quantity} />

        <label htmlFor="price">Prix</label>
        <input type="text" ref={price} />

        <label htmlFor='sampleFile' >Image</label>



        <input ref={inputFile} onInput={() => {
          console.log(inputFile.current.files[0])
        }} type="file" />



        <input type="submit" value='Envoyer' />

      </form>


    </main>
  );
};

export default Form;