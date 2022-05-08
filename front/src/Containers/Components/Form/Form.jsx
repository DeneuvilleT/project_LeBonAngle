import React, { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Form/form.module.css';
import axios from 'axios';


function Form() {

  const { url } = useContext(GlobalContext);
  const [imgFile, setImgFile] = useState('');
  const inputFile = useRef();
  const title = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();


  // *****************************************
  // Ajout d'une image ***********************
  
  const pick = async () => {

    const formData = new FormData();
    formData.append("image", inputFile.current.files[0]);
  
    try {
      const res = await axios.post(`${url}/form/api/v1/picture`, formData)
        .then(res => {

          setImgFile(`${url}/public/images/${res.data.url}`);
  
        });
    } catch (error) {
      console.log(error);
    };
  };


  // *****************************************
  // Ajout d'un article **********************
  
  const post = async () => {

    const noPhoto = `${url}/public/images/no_photo.png`;

    try {
      const res = await axios.post(`${url}/form/api/v1/product/add`, {

        title: title.current.value,
        description: description.current.value,
        quantity: quantity.current.value,
        price: price.current.value,
        img: imgFile !== '' ? imgFile : noPhoto,
      });
    } catch (error) {
      console.log(error);
    };
  };


  return (
    <main role='main' className={styles.form}>

      <section>
        <h1>Formulaire</h1>
        <hr />
      </section>

      <section>
        <form onSubmit={() => { post() }} >

          <label htmlFor="title">Titre de l'annonce :</label>
          <input type="text" ref={title} />

          <label htmlFor='description'>Description :</label>
          <textarea ref={description} ></textarea>

          <label htmlFor="quantity">Quantité :</label>
          <input min="1" type="number" ref={quantity} />

          <label htmlFor="price">Prix : <span>(entre 0 et 5000)</span></label>
          <input min="0" max="5000" type="number" ref={price} />

          <label htmlFor='sampleFile' >Image</label>
          <input onInput={() => { pick() }} ref={inputFile} type="file" />

          <input type="submit" value='Envoyer' />

        </form>
      </section>
    </main>
  );
};

export default Form;