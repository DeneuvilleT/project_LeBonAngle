import React, { useContext, useEffect, useRef, useState, Fragment } from 'react';
import { ReactComponent as BinEmpty } from '../../../../src/svg/logo.svg';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../Edit/edit.module.css';

function Edit() {

   const { id } = useParams();
   const { url } = useContext(GlobalContext);
   const [detailItem, setDetail] = useState({});
   const [datas, setDatas] = useState([]);

   
   // *****************************************
   // Initialisation **************************

   useEffect(() => {
      dataItem()
   }, []);
   
   const dataItem = async () => {
      try {
         const res = await fetch(`${url}/api/v1/product/${id}`);
         const resJson = await res.json();

         setDetail({
            id: resJson[0][0].id,
            title: resJson[0][0].title,
            description: resJson[0][0].description,
            category: resJson[0][0].name,
            quantity: resJson[0][0].quantity,
            price: resJson[0][0].price,
         });
      } catch (error) {
         console.log(error);
      };
   };
   
   // *****************************************
   // Récupératrion Category ******************

   useEffect(() => {
      recupDataCategory()
   }, [])

   const recupDataCategory = async () => {
      try {
         const res = await fetch(`${url}/api/v1/load_category`);
         const resJson = await res.json();
         console.log(resJson[0]);
         setDatas(datas => [...datas, ...resJson[0]]);

      } catch (error) {
         console.log(error);
      };
   };

   
   // *****************************************
   // Mise à jour *****************************
   
   const title = useRef();
   const description = useRef();
   const quantity = useRef();
   const price = useRef();
   const category = useRef();
   const inputFile = useRef();

   const update = async () => {
      try {
         const res = await axios.put(`${url}/api/v1/edit/update/${id}`,{

            title: title.current.value,
            description: description.current.value,
            quantity: quantity.current.value,
            category: category.current.value,
            price: price.current.value,
         });

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
            <BinEmpty /> 
         </section>

         <section>
            <form onSubmit={() => { update() }} >

               <label htmlFor="title">Titre de l'annonce :</label>
               <input type="text" ref={title} placeholder={detailItem.title} />

               <label htmlFor='description'>Description :</label>
               <textarea ref={description} placeholder={detailItem.description} ></textarea>

               <label htmlFor="quantity">Quantité :</label>
               <input min="1" type="number" placeholder={detailItem.quantity} ref={quantity} />

               <label htmlFor="price">Prix : <span>(entre 0 et 5000)</span></label>
               <input min="0" max="5000" type="number" placeholder={detailItem.price} ref={price} />

               <label htmlFor="category">Catégorie :</label>
               <select ref={category}>
                  {
                     datas?.length && datas.map((item) => {
                        return (
                           <Fragment key={item.id}>
                              <option value={item.id}>{item.name}</option>
                           </Fragment>
                        )
                     })
                  }
               </select>
               
               <input type="submit" value="Mettre à jour l'annonce" />

            </form>
         </section>

      </main>
   )
}

export default Edit;