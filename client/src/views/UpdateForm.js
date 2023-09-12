import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = () => {
    
    const [title,      setTitle]      = useState("");
    const [titleError, setTitleError] = useState("");

    const [price,      setPrice]      = useState(0);
    const [priceError, setPriceError] = useState("");

    const [description,      setDescription]      = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then( res => {
                const oneProduct = res.data.product;
                setTitle(oneProduct.title);
                setPrice(oneProduct.price);
                setDescription(oneProduct.description);
            })
            .catch( err => console.error(err) );
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/products/${id}`, { title, price, description })
            .then( res => {
                const id = res.data.product._id;
                navigate(`/products/${id}`);
                
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
            .catch( err => console.log(err) );
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then( navigate('/products') )
            .catch( err => console.log(err) );
    };


    return(
        <div className="card-body">
            <div className="card shadow">


                <div className="card-header">
                    <h3 className="text-primary-emphasis text-center">Edit A Product</h3>
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

                        <div class="mb-2">
                            <button className="btn btn-danger w-25" onClick={handleDelete}>Delete</button>
                            <input className="form-control btn btn-info w-25 float-end" type="submit" value="Confirm" />
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
};

export default UpdateForm