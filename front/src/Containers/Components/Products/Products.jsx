import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import css from '../Products/products.module.css';

function Products() {

  const { url } = useContext(GlobalContext)

  const [datas, setDatas] = useState([]);
  const [detailItem, setDetail] = useState({});


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

  const detail = async (id) => {

    try {

      const res = await fetch(`${url}/api/v1/product/${id}`);
      const resJson = await res.json();

      let date = resJson[0][0].post_date;
      date = new Date();

      setDetail({
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

  return (

    <main className={css.products} role='main'>

      {/* Details Items */}
      <section >
        <h1>Home page</h1>
        <hr />

        <article>

          {!detailItem.title ? (
            <>
            </>
          ) : (
            <>
              <aside>
                <h2>{detailItem.title}</h2>
                <p><strong>Description : </strong><br />{detailItem.descritpion}</p>
                <p><strong>Quantité : </strong>{detailItem.quantity}</p>
                <p><strong>Postée le : </strong>{detailItem.post_date} par : {detailItem.nickName}</p>
                <p><strong>Catégorie : </strong>{detailItem.category}</p>
                <p><strong>Prix : <em style={{ color: 'red' }}>{detailItem.price} €</em></strong></p>
              </aside>
            </>
          )}

        </article>

      </section>

      {/* List Items */}
      <section >
        {
          datas?.length && datas.map((item) => {

            return (
              <article key={item.id} >

                <h2>{item.title}</h2>
                <img src={item.img} alt={item.title} />
                <p><strong>Prix : </strong><em>{item.price} €</em></p>

                <a onClick={() => { detail(item.id) }} > +  de détails</a>

              </article>
            )
          })
        }
      </section>
    </main>
  );
};

export default Products;