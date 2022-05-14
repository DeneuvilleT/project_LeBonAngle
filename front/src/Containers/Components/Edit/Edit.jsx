import React, { useContext, useEffect, useRef, useState, Fragment } from 'react';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import { GlobalContext } from '../../../Context/GlobalContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import axios from 'axios';
import styles from '../Edit/edit.module.css';

function Edit() {

   const { id } = useParams();
   const { url, datasCat } = useContext(GlobalContext);

   const [detailItem, setDetail] = useState({});
   const [msg, setMsg] = useState('');

   useEffect(() => {
      dataItem()
   }, []);


   useEffect(() => {
      setMsg('');
   }, []);
   
   // *****************************************
   // Initialisation **************************

   
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
   // Mise à jour *****************************
   
   const title = useRef();
   const description = useRef();
   const quantity = useRef();
   const price = useRef();
   const category = useRef();

   const update = async (e) => {

      e.preventDefault();

      try {
         const res = await axios.put(`${url}/api/v1/edit/update/${id}`,{

            title: title.current.value ? title.current.value : title.current.placeholder,
            description: description.current.value ? description.current.value : description.current.placeholder,
            quantity: quantity.current.value ? quantity.current.value : quantity.current.placeholder,
            category: category.current.value ? category.current.value : category.current.placeholder,
            price: price.current.value ? price.current.value : price.current.placeholder,

         });
         
         if (res.data.status === 200) {
            setMsg(res.data.msg);
            return

         } else {
            setMsg('Probléme lors de la mise à jour de votre annonce.');
            return

         };
      } catch (error) {
         console.log(error);
      };
   };



   return (
      <main role='main' className={styles.edit}>

         <section>
            <h1>Modification</h1>
            <hr />

            <Msg msg={msg}/>
            <Link to={'/admin'}>panneau d'administration</Link>
            <Logo /> 

         </section>

         
         <section>
            <form onSubmit={(e) => { update(e) }} >

               <input type="text" ref={title} placeholder={detailItem.title} />

               <textarea ref={description} placeholder={detailItem.description} ></textarea>

               <input min="1" type="number" placeholder={detailItem.quantity} ref={quantity} />

               <span><input min="0" max="100000" type="number" placeholder={detailItem.price} ref={price} /><strong>&nbsp;&nbsp;€</strong></span>

               <select ref={category} >
                  {
                     datasCat?.length && datasCat.map((item) => {
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