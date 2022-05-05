import Header from './Containers/Pages/Header/Header';
import Products from './Containers/Components/Products/Products';
import Form from './Containers/Components/Form/Form';
import Admin from './Containers/Components/Admin/Admin';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/form' element={<Form />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
