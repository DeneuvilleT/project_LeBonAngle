import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../Edit/edit.module.css';

function Edit() {

   const { url } = useContext(GlobalContext);
   const [detailItem, setDetail] = useState({});

   useEffect(() => {
      dataItem()
   }, []);

   // Init **********************************************************
   const dataItem = async (id) => {
      try {
         const res = await fetch(`${url}/api/v1/product/${id}`);
         const resJson = await res.json();

         let date = resJson[0][0].post_date;
         date = new Date();

         setDetail({
            id: resJson[0][0].product.id,
            title: resJson[0][0].title,
            descritpion: resJson[0][0].description,
            category: resJson[0][0].name,
            quantity: resJson[0][0].quantity,
            post_date: date.toLocaleDateString(),
            nickName: `${resJson[0][0].lastname} ${resJson[0][0].firstname}`,
            price: resJson[0][0].price,
         });
      } catch (error) {
         console.log(error);
      };
   };

   // Update **********************************************************
   const title = useRef();
   const description = useRef();
   const quantity = useRef();
   const price = useRef();
   const inputFile = useRef();

   const update = async (id) => {
      try {
         const res = await axios.put(`${url}/api/v1/edit/update/${id}`);

      } catch (error) {
         console.log(error);
      };
   };



   return (
      <main role='main' className={styles.edit}>

         <section>
            <h1>Modification</h1>
            <hr />
            <Link to={'/admin'}>panneau d'administration</Link>
         </section>

         <section>       
               <form onSubmit={() => { update(detailItem.id) }} >

                  <label htmlFor="title">Titre de l'annonce</label>
                  <input type="text" ref={title} value={detailItem.title} />

                  <label htmlFor='description'>Description</label>
                  <textarea ref={description} cols="30" rows="10" value={detailItem.description} ></textarea>

                  <label htmlFor="quantity">Quantité</label>
                  <input min="1" type="number" value={detailItem.quantity} ref={quantity} />

                  <label htmlFor="price">Prix</label>
                  <input type="text" value={detailItem.price} ref={price} />

                  {/* <label htmlFor='sampleFile' >Image</label> */}
                  {/* <input ref={inputFile} onInput={() => {
                  console.log(inputFile.current.files[0])
                  }} type="file" /> */}

                  <input type="submit" value='Mettre à jour votre annonce.' />

               </form>
         </section>

      </main>
   )
}

export default Edit;