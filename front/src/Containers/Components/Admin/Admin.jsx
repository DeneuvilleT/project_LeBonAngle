import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Admin/admin.module.css';


function Admin() {

  const { url } = useContext(GlobalContext)
  const [datas, setDatas] = useState([]);
  const [listItems, setList] = useState([]);

  useEffect(() => {
    recupUsers()
  }, []);
  useEffect(() => {
    detailAdmin()
  }, []);


  const recupUsers = async () => {
    try {
      const res = await fetch(`${url}/api/v1/load_users`);
      const resJson = await res.json();

      setDatas(data => [...data, ...resJson[0]]);

    } catch (error) {
      console.log(error);
    };
  };



  const detailAdmin = async () => {

    try {

      const res = await fetch(`${url}/api/v1/admin/`);
      const resJson = await res.json();
      console.log(resJson);
      // let date = resJson[0][0].post_date;
      // date = new Date();

      setList(listItems => [...listItems, ...resJson[0]]);

    } catch (error) {
      console.log(error);
    };
  };



  return (
    <main role='main' className={styles.admin}>
      <section>
        <h1>Panneau d'administration</h1>
        <hr />
        <article>
          {
            datas?.length && datas.map((item) => {
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

      <section>
        <article>
          {/* {
              listItems?.length && listItems.map((item) => {
                return (
                  <article key={item.id} >
                    <p>{item.lastname}</p>
                    <p>{item.firstname}</p>
                    <p>{item.adress}</p>
                  </article>
                )
              })
            } */}
        </article>
      </section>
    </main>
  );
};

export default Admin;