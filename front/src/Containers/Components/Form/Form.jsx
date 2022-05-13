import React, { Fragment, useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import { ReactComponent as Logo } from '../../../../src/svg/logo.svg';
import styles from '../Form/form.module.css';
import axios from 'axios';
import Msg from '../Msg/Msg';


function Form() {

  const { url } = useContext(GlobalContext);
  const { connected } = useContext(GlobalContext);
  const { setConnected } = useContext(GlobalContext);
  const { datasCat } = useContext(GlobalContext);

  const [imgFile, setImgFile] = useState('');
  const [idUser, setId] = useState(0);
  const [msg, setMsg] = useState('');


  // Ajout d'une image ***********************

  const pick = async () => {

    const formData = new FormData();
    formData.append("image", inputFile.current.files[0]);

    try {
      const res = await axios.post(`${url}/form/api/v1/picture`, formData)
        .then(res => {

          setImgFile(`${url}/public/images/${res.data.url}`);

        });
    } catch (error) {
      console.log(error);
    };
  };


  // Ajout d'un article **********************

  const title = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();
  const category = useRef();
  const inputFile = useRef();


  const newPost = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(`${url}/form/api/v1/product/add`, {

        user: idUser,
        title: title.current.value,
        description: description.current.value,
        quantity: quantity.current.value,
        category: category.current.value,
        price: price.current.value,
        img: imgFile !== '' ? imgFile : `${url}/public/images/no_photo.png`,

      });

      if (res.data.status === 200) {
        setMsg(res.data.msg);
        return

      } else {
        setMsg("Visiblement il y a eu une erreur lors de la publication de votre annonce, veuillez réésayer.");
        return

      };

    } catch (error) {
      console.log(error);
    };
  };


  // Ajout d'un utilisateur ********************

  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const adress = useRef();
  const city = useRef();
  const code_zip = useRef();

  const newUser = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(`${url}/form/api/v1/product/add_user`, {

        lastname: lastname.current.value,
        firstname: nickname.current.value,
        email: email.current.value,
        password: pass.current.value,
        adress: adress.current.value,
        city: city.current.value,
        code_zip: code_zip.current.value,

      });

      if (res.data.status === 200) {

        setMsg(res.data.msg);

        const response = await axios.post(`${url}/form/api/v1/sendMail`, {
          email: email.current.value
        });
        return

      } else {
        setMsg("Visiblement il y a eu une erreur lors de votre enregistrement, veuillez réésayer.");
        return

      };

    } catch (error) {
      console.log(error);
    };
  };


  // LogIn ***********************************

  const nickname = useRef();
  const pass = useRef();

  const logUser = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(`${url}/form/api/v1/login`, {

        firstname: firstname.current.value,
        password: password.current.value,

      });

      if (res.data.status === 200) {
        setMsg(res.data.msg);
        setId(res.data.id);
        setConnected(true);
        return

      } else {
        setMsg(res.data.msg);
        return

      };

    } catch (error) {
      console.log(error);
    };
  };


  return (
    <main role='main' className={styles.form}>

      <section>
        <h1>Formulaire</h1>
        <hr />

        {!connected ? (
          <>
            <h2>Nouvel utilisateur ?</h2>
            <form onSubmit={(e) => { newUser(e) }} >
              
              <input type="text" placeholder='nom' ref={lastname} />
              <input type="text" placeholder='prénom' ref={nickname} />
              <input type="email" placeholder='mail' ref={email} />
              <input type="password" placeholder='mot de passe' ref={pass} />
              <input type="text" placeholder='adresse' ref={adress} />
              <input type="text" placeholder='ville' ref={city} />
              <input type="text" placeholder='code postal' ref={code_zip} />
              <input type="submit" value='Envoyer' />

            </form>
          </>
        ) : (
          <><Logo /></>
        )}
      </section>


      <section>

        {!connected ? (
          <>
            <form onSubmit={(e) => { logUser(e) }} >

              <Msg msg={msg} />
              
              <h2>Pour poster une annonce, vous devez vous connecter.</h2>
              <input type="text" placeholder='prénom' ref={firstname} />
              <input type="password" ref={password} placeholder='mot de passe ' />
              <input type="submit" value='Envoyer' />

            </form>
          </>
        ) : (
          <>
            <form onSubmit={(e) => { newPost(e) }} >

                <Msg msg={msg} />

              <input placeholder="titre de l'annonce" type="text" ref={title} />
              <textarea placeholder='description' ref={description} ></textarea>
              <input min="1" max="500" type="number" placeholder='quantité' ref={quantity} />
              <input min="0" max="5000" placeholder='prix' type="number" ref={price} />
              <select ref={category}>
                {
                  datasCat?.length && datasCat.map((item) => {
                    return (
                      <Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                      </Fragment>
                    )
                  })
                }
              </select>
              <input onInput={() => { pick() }} ref={inputFile} type="file" />
              <input type="submit" value='Envoyer' />

            </form>
          </>
        )}
      </section>

    </main>
  );
};

export default Form;