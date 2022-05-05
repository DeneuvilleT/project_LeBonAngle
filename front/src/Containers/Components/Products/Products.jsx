import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Products/products.module.css';

function Products() {

  const {url} = useContext(GlobalContext)
  const [data, setDatas] = useState([]);

  useEffect(() => {
    recupProducts()
  }, [])
  

  const recupProducts = async () => {
    try {
      const res = await fetch(`${url}/api/v1/load_products`);
      const resJson = await res.json();

      setDatas(data => [...data, ...resJson[0]]);

    } catch (error) {
      console.log(error);
    };
  };


  return (
    
    <main className={styles.products} id='mainProducts' role='main'>
      <h1>{console.log(data)}Home page</h1>
    </main>
  );
};

export default Products;