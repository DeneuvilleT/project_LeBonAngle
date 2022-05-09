import React, { createContext, useState, useEffect } from 'react';


export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

   const [url, setUrl] = useState("http://localhost:9000");
   const [connected, setConnected] = useState(false);
   const [datasCat, setDatas] = useState([]);
   const [datasItems, setItems] = useState([]);


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
      try {
         const res = await fetch(`${url}/api/v1/load_products`);
         const resJson = await res.json();

         setItems(data => [...data, ...resJson[0]]);

      } catch (error) {
         console.log(error);
      };
   };
   
  
   return (
      <GlobalContext.Provider value={{ url, setUrl, connected, setConnected, datasCat, setDatas, datasItems, setItems}}>
         {props.children}
      </GlobalContext.Provider>
   );
};

export default GlobalContextProvider;