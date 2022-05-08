import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import styles from '../Admin/admin.module.css';

function Admin() {

  const { url } = useContext(GlobalContext);
  const [datasUsers, setDatas] = useState([]);
  const [listItems, setList] = useState([]);


  useEffect(() => {
    recupUsers()
  }, []);

  useEffect(() => {
    detailAdmin()
  }, []);


  // *****************************************
  // Récupératrion Utilisateurs **************

  const recupUsers = async () => {
    try {
      const res = await fetch(`${url}/api/v1/load_users`);
      const resJson = await res.json();

      setDatas(data => [...data, ...resJson[0]]);

    } catch (error) {
      console.log(error);
    };
  };

  // *****************************************
  // Récupératrion Objets ********************

  const detailAdmin = async () => {
    try {
      const res = await fetch(`${url}/api/v1/admin/`);
      const resJson = await res.json();

      setList(listItems => [...listItems, ...resJson[0]]);

    } catch (error) {
      console.log(error);
    };
  };

  // *****************************************
  // Suppression Item ************************
  
  const poke = async (id) => {
    try {
      const res = await fetch(`${url}/api/v1/admin/delete/${id}`);
      const resJson = await res.json();

    } catch (error) {
      console.log(error);
    };
  };



  return (
    <main role='main' className={styles.admin}>

      {/* Block Users */}
      <section>
        <h1>Panneau d'administration</h1>
        <hr />
        <article>
          {
            datasUsers?.length && datasUsers.map((item) => {
              return (
                <aside key={item.id} >
                  <p><strong>{item.lastname}</strong></p>
                  <p>{item.firstname}</p>
                  <p>{item.adress}</p>
                  <p>{item.city}</p>
                  <p><strong>{item.code_zip}</strong></p>
                </aside>
              )
            })
          }
        </article>
      </section>


      {/* Block List */}
      <section>
        <article>
          {
            listItems?.length && listItems.map((item) => {
              return (
                <aside key={item.id} >

                  <p><strong>{item.title}</strong></p>
                  <hr />
                  <p>Vendeur : {item.lastname}</p>
                  <hr />
                  <p>Date de publication : {item.post_date}</p>
                  <hr />
                  <p><strong>Prix de vente : </strong><strong style={{ color: 'red' }}>{item.price} €</strong></p>
                  <hr />

                  <Link to={`/edit/${item.id}`}>mettre à jour l'annonce</Link>

                  <form onSubmit={() => { poke(item.id) }}>
                    <button type='submit' >supprimer</button>
                  </form>

                </aside>
              )
            })
          }
        </article>
      </section>
    </main>
  );
};

export default Admin;