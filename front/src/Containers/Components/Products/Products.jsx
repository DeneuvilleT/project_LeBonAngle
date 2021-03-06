import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import { GlobalContext } from '../../../Context/GlobalContext';
import Msg from '../Msg/Msg';
import dayjs from 'dayjs';
import styles from '../Products/products.module.css';

function Products() {

  const { url, msg, setMsg } = useContext(GlobalContext);

  const [datasItems, setItems] = useState([]);
  const [details, setDetail] = useState({});


  useEffect(() => {
    recupProducts();
  }, []);

  useEffect(() => {
    setMsg('');
  }, []);


// *******************************************
  // Initialisation **************************

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

  
// *******************************************
  // Details *********************************

  const detailItem = async (e, id) => {

    if (!details.title) {
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

        e.target.text = "- de détails";

      } catch (error) {
        console.log(error);

      };
    } else {
      setDetail({});
      e.target.text = "+ de détails";

    };
  };




  return (

    <main className={styles.products} role='main'>

      <section >

        <h1>LeBonAngle</h1>
        <hr />
        <Msg msg={msg} />

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

                <a onClick={(e) => { detailItem(e, item.id) }} >+ de détails</a>

              </article>
            )
          })
        }
      </section>
    </main>
  );
};

export default Products;