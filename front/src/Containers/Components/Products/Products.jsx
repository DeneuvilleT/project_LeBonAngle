import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import dayjs from 'dayjs';
import css from '../Products/products.module.css';

function Products() {

  const { url } = useContext(GlobalContext)
  const { datasItems } = useContext(GlobalContext)
  const [details, setDetail] = useState({});


  const detailItem = async (id) => {
    try {
      const res = await fetch(`${url}/api/v1/product/${id}`);
      const resJson = await res.json();

      setDetail({
        
        title: resJson[0][0].title,
        descritpion: resJson[0][0].description,
        category: resJson[0][0].name,
        quantity: resJson[0][0].quantity,
        post_date: resJson[0][0].post_date,
        nickName: `${resJson[0][0].lastname} ${resJson[0][0].firstname}`,
        price: resJson[0][0].price,

      });
    } catch (error) {
      console.log(error);
    };
  };


  return (

    <main className={css.products} role='main'>

      <section >
        <h1>Home page</h1>
        <hr />
        <article>
          {!details.title ? (
            <><Logo /></>
          ) : (
            <>
              <aside>
                <h2>{details.title}</h2>
                <p><strong>Description : </strong><br />{details.descritpion}</p>
                <p><strong>Quantité : </strong>{details.quantity}</p>
                  
                <p><strong>Postée le : </strong>{dayjs(details.post_date).format('DD MMM YYYY à HH : mm')}
                <span><br />par : <strong style={{ color: 'green' }}>{details.nickName}</strong></span></p>
                  
                <p><strong>Catégorie : </strong>{details.category}</p>
                <p><strong>Prix : <em style={{ color: 'red' }}>{details.price} €</em></strong></p>
              </aside>
            </>
          )}
        </article>
      </section>




      <section >
        {
          datasItems?.length && datasItems.map((item) => {

            return (
              <article key={item.id} >

                {item.title.length > 20 ? <h2>{item.title.substring(0, 25)}...</h2> : <h2>{item.title}</h2>}
                <img src={item.img} alt={item.title} />
                <p><strong>Prix : </strong><em>{item.price} €</em></p>

                <a onClick={() => { detailItem(item.id) }} > +  de détails</a>

              </article>
            )
          })
        }
      </section>
    </main>
  );
};

export default Products;