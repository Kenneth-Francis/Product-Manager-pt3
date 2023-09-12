import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
    
    const [title,      setTitle]      = useState("");
    const [titleError, setTitleError] = useState("");

    const [price,      setPrice]      = useState(0);
    const [priceError, setPriceError] = useState("");

    const [description,      setDescription]      = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/products', { title, price, description })
            .then( res=> {

                navigate('/products');
                
                if (res.data.errors) {
                    setTitleError(res.data.errors.title.message);
                    setPriceError(res.data.errors.price.message);
                    setDescriptionError(res.data.errors.description.message);
                } else {
                    setTitle("");
                    setPrice(0);
                    setDescription("");
                }
            })
            .catch( err=> console.log(err) );
    }

    return(
        <div className="card-body">
            <div className="card shadow">


                <div className="card-header">
                    <h3 className="text-primary-emphasis text-center">Add A Product</h3>
                </div>


                <div className="card-body w-75 m-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fs-5">Title: </label>
                            <input className="form-control" name="title" type="text" value={title}
                                onChange={ (e)=> setTitle(e.target.value) }/>
                            { titleError && <p className="form-text text-warning">{titleError}</p> }
                        </div>

                        <div className="mb-3">
                            <label className="form-label fs-5">Price $: </label>
                            <input className="form-control text-center" name="price" type="number" value={price}
                                onChange={ (e)=> setPrice(e.target.value) }/>
                            { priceError && <p className="form-text text-warning">{priceError}</p> }
                        </div>

                        <div className="mb-4">
                            <label className="form-label fs-5">Description: </label>
                            <input className="form-control" name="description" type="text" value={description}
                                onChange={ (e)=> setDescription(e.target.value) }/>
                            { descriptionError && <p className="form-text text-warning">{descriptionError}</p> }
                        </div>

                        <input className="form-control btn btn-info w-50 float-end" type="submit" value="Create" />
                    </form>
                </div>


            </div>
        </div>
    )
};

export default ProductForm;
