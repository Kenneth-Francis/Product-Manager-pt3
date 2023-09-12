import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
    
const Detail = () => {

    const [product, setProduct] = useState({})
    const { id } = useParams();

    const navigate = useNavigate();
    
    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then( res => setProduct(res.data.product) )
            .catch( err => console.error(err) );
    }, []);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then( navigate('/products') )
            .catch( err => console.log(err) );
    };
    
    
    return (
        <div className='card shadow'>
            <div className='card-header'>
                <h3 className='text-center text-warning-emphasis'>{product.title}</h3>
            </div>

            <div className='card-body'>
                <ul className='list-group list-group-flush gap-3'>
                    <li className='list-group-item fs-5'>
                        <p className='text-center text-success'>Price: ${product.price}</p>
                        <p><span className='text-primary-emphasis'>Description:</span> {product.description}</p>
                        <p className='btn btn-danger w-25 float-end' onClick={ () => handleDelete(product._id) }>Delete</p>
                    </li>  
                </ul>
            </div>
        </div>
    )
}
    
export default Detail;

