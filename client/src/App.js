import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Detail from './views/Detail';
import ProductForm from './components/ProductForm';
import UpdateForm from './views/UpdateForm';

function App() {
    return (
        <div className="App container col mt-5 mx-auto w-25">
            <h1 className='text-center'>Product Manager 2</h1>
            <ul>
                <li className='fs-5'>
                    <Link to="/products">Main</Link>
                </li>
                {/* <li>
                    <Link to="/products/new">Add Product</Link>
                </li> */}
            </ul>
            <Routes>
                <Route path="/products" element={<Main />} />
                {/* <Route path="/products/new" element={<ProductForm/>} /> */}
                <Route path="/products/:id" element={<Detail />} />
                <Route path="/products/edit/:id" element={<UpdateForm />} />
            </Routes>
        </div>
    );
}

export default App;
