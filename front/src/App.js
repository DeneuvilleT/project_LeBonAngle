import Header from './Containers/Pages/Header/Header';
import Products from './Containers/Components/Products/Products';
import Form from './Containers/Components/Form/Form';
import Admin from './Containers/Components/Admin/Admin';
import Edit from './Containers/Components/Edit/Edit';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './Context/GlobalContext';


function App() {
  return (
    <>
      <GlobalContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/form' element={<Form />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </GlobalContextProvider>
    </>
  );
}

export default App;
