import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import css from '../Products/Products.module.css';

function Products() {

  const { url } = useContext(GlobalContext)
  const [datas, setDatas] = useState([]);

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

    <main className={css.products} role='main'>

      <section >
        <h1>Home page</h1>
        <article>
          <p>/* Détails */</p>
        </article>
      </section>

      <section >
      {
        datas?.length && datas.map((item, index) => {

          return (
            <article key={item.id} >
              <h2>{item.title}</h2>
              <img src={item.img} alt={item.title} />
              <p>Quantité : {item.quantity}</p>
              <p>Postée le : {item.post_date}</p>
              <p>Prix : <em>{item.price} €</em></p>
              <button>Details</button>
            </article>
          )
        })
        }
      </section>
    </main>
  );
};

export default Products;