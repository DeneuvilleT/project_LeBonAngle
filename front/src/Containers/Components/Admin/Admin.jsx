import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Admin/admin.module.css';


function Admin() {

  const { url } = useContext(GlobalContext)
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    recupUsers()
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


  return (
    <main role='main' className={styles.admin}>
      <h1>{console.log(datas)}Panneau d'administration</h1>
      <div>
        <table>

          <thead>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adress</th>
          </thead>

          <tbody>
            {
              datas?.length && datas.map((item, index) => {

                return (
                  <tr key={item.id} >
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.adress}</td>
                  </tr>
                )
              })
            }
          </tbody>
          
        </table>
      </div>
    </main>
  );
};

export default Admin;