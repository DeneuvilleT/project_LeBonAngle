import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

   const [admin, setAdmin] = useState(false);

   const [url, setUrl] = useState("http://localhost:9000");
   const [connected, setConnected] = useState(false);
   const [datasCat, setDatas] = useState([]);
   const [datasItems, setItems] = useState([]);
   const [msg, setMsg] = useState('');
   const [idUser, setId] = useState(0);


   // *****************************************
   // Récupératrion Categorie *****************

   useEffect(() => {
      recupDataCategory()
   }, []);

   const recupDataCategory = async () => {
      try {
         const res = await fetch(`${url}/api/v1/load_category`);
         const resJson = await res.json();
         setDatas(datasCat => [...datasCat, ...resJson[0]]);

      } catch (error) {
         console.log(error);
      };
   };

   useEffect(() => {
      recupProducts()
   }, [])


   // *****************************************
   // Récupératrion Objets ********************

   const recupProducts = async () => {

      setItems([]);

      try {
         const res = await fetch(`${url}/api/v1/load_products`);
         const resJson = await res.json();
         setItems(data => [...data, ...resJson[0]]);

      } catch (error) {
         console.log(error);
      };
   };


   // LogIn ***********************************
   // *****************************************

   const logUser = async (e, alias, pass) => {

      e.preventDefault();

      try {
         const res = await axios.post(`${url}/form/api/v1/login`, {
            firstname: alias.current.value,
            password: pass.current.value,
         });

         if (res.data.status === 200 && res.data.activate === 1) {
            setMsg(res.data.msg);
            setId(res.data.id);
            setConnected(true);
            return

         } else if (res.data.activate === 0) {
            setMsg("Votre email n'a pas encore été vérifié.");
            return

         } else if (res.data.status === 200 && res.data.email === "thomac.windows@hotmail.fr") {
            setConnected(true);
            console.log(admin);
            setAdmin(true);
            return

         } else {
            setMsg(res.data.msg);
            return 

         };
         
      } catch (error) {
         console.log(error);
      };
   };

 
   return (
      <GlobalContext.Provider value={{
         url, setUrl, connected, setConnected, datasCat, setDatas, admin,
         datasItems, setItems, recupProducts, msg, setMsg, idUser, logUser, setId
      }}>
         {props.children}
      </GlobalContext.Provider>
   );
};

export default GlobalContextProvider;