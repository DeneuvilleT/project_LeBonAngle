import React, { createContext, useState } from 'react';


export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

   const [url, setUrl] = useState("http://localhost:9000");

  
   return (
      <GlobalContext.Provider value={{ url, setUrl }}>
         {props.children}
      </GlobalContext.Provider>
   );
};

export default GlobalContextProvider;