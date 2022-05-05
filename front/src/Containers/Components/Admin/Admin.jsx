import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styles from '../Admin/admin.module.css';


function Admin() {

  const { url } = useContext(GlobalContext)
  const [data, setDatas] = useState([]);

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
    <main id='mainAdmin' role='main' className={styles.admin}>
      <h1>{console.log(data)}Panneau d'administration</h1>
    </main>
  );
};

export default Admin;