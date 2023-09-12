import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = (props) => {
    let setProducts = props.setProducts;

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
            .then( removeFromDom(deleteId) )
            .catch( err => console.log(err) );
    };

    const removeFromDom = deleteId => {
        const filteredList = props.products.filter(
            (eachProduct, idx) => eachProduct._id !== deleteId);

        setProducts = filteredList;
    }

    return (
        
        <div className='card shadow'>
            <div className='card-header'>
                <h3 className='text-center text-warning-emphasis'>All Products</h3>
            </div>

            <div className='card-body'>
                <ul className='list-group list-group-flush gap-3'>
                    {
                        props.products.map( (eachProduct, idx) => {
                            return (
                                <li key={idx} className='list-group-item fs-6'>
                                    <p className="fs-5 text-center"><Link to={ `/products/${eachProduct._id}` }>{eachProduct.title}</Link></p>
                                    <p className='text-center text-success'>Price: ${eachProduct.price}</p>
                                    <p><span className='text-warning-emphasis'>Description:</span> {eachProduct.description}</p>

                                    <p className='btn btn-danger w-25 float-start' onClick={ () => handleDelete(eachProduct._id) }>Delete</p>

                                    <p className='btn btn-info w-25 float-end'>
                                        <Link to={`/products/edit/${eachProduct._id}`} className="text-black text-decoration-none">Edit</Link></p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default ProductList;