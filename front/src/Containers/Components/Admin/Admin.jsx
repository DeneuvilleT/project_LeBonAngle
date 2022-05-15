import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from '../Admin/admin.module.css';
import Msg from '../Msg/Msg';

function Admin() {

  const { url, msg, setMsg, setItems,
  datasItems, recupProducts } = useContext(GlobalContext);

  const [datasUsers, setDatas] = useState([]);


  // *****************************************
  // Récupératrion Utilisateurs **************

  useEffect(() => {
    setMsg('');
  }, []);
  
  useEffect(() => {
    recupUsers()
  }, []);

  const recupUsers = async () => {

    try {
      const res = await fetch(`${url}/api/v1/load_users`);
      const resJson = await res.json();

      setDatas(data => [...data, ...resJson[0]]);
      return

    } catch (error) {
      console.log(error);
    };
  };

  // *****************************************
  // Suppression Item ************************

  const pokeItem = async (e, id) => {

    e.preventDefault();

    try {
      const res = await fetch(`${url}/api/v1/admin/delete/${id}`);
      const resJson = await res.json();

      setMsg(resJson.msg);

      const elemToDeleted = datasItems.findIndex(item => item.id === id);
      setItems(item => item.splice(elemToDeleted));

      recupProducts();

    } catch (error) {
      console.log(error);
    };
  };


  return (
    <main role='main' className={styles.admin}>

      <section>
        <h1>Panneau d'administration</h1>
        <hr />
        <Msg msg={msg} />
        
        <article>
          {
            datasUsers?.length && datasUsers.map((item) => {
              return (  
                <aside key={item.id} >
                  <p><strong>{item.email}</strong></p>
                  <p><strong>{item.lastname}</strong></p>
                  <p>{item.firstname}</p>
                  <p>{item.adress}</p>
                  <p>{item.city} {item.code_zip}</p>

                  {
                    item.activate === 0 ? <Msg msg={"En cours de validation"}/> : <Msg msg={"Compte validé"} />
                  } 

                </aside>
              )
            })
          }
        </article>
      </section>


 
      <section>
        <article>
          {
            datasItems?.length && datasItems.map((item) => {
              return (
                <aside key={item.id} >

                  <p><strong>{item.title}</strong></p>

                  <p>{item.lastname}</p>

                  <p>{dayjs(item.post_date).format('DD MMM YYYY à HH : mm')}</p>

                  <p><strong>Prix de vente : </strong><strong style={{ color: 'red' }}>{item.price} €</strong></p>

                  <Link to={`/edit/${item.id}`}>mettre à jour l'annonce</Link>

                  <button onClick={(e) => { pokeItem(e, item.id) }}>supprimer</button>

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