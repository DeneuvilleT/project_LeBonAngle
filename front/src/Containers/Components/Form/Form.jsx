import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Form/form.module.css';
import axios from 'axios';

function Form() {

  const { url } = useContext(GlobalContext);
  
  // Ajout d'un article ********************
  const title = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();
  const imgURL = useRef();

  const post = async () => {

    try {
      const res = await axios.post(`${url}/form/api/v1/product/add`, {

        title: title.current.value,
        description: description.current.value,
        quantity: quantity.current.value,
        price: price.current.value,
        img: imgURL.current.value,

      })
      .then( (response) => {
          console.log(response);
        })
      .catch( (error) => {
          console.log(error);
      });

      } catch (error) {
      console.log(error);
    };

  };

  // Ajout d'une image *********************
  const [picture, setPicture] = useState(null);
  const inputFile = useRef();
  

  const pick = async () => {

    const formData = new FormData();
    formData.append("image", inputFile.current.files[0]);

    try {
      const res = await axios.post(`${url}/form/api/v1/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
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





  return (
    <main role='main' className={styles.form}>

      <h1>Formulaire</h1>

      <form onSubmit={() => { post(); pick() }} encType="multipart/form-data" >

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