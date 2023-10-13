import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../actions/productAction.js";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../constants/productConstants.js";

const ServiceForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.createProduct);

    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState(5);
    // const [images, setImages] = useState("");
    // const [BedRooms, setBedRooms] = useState(4);
    // const [Baths, setBaths] = useState(7);
    // const [FlatSize, setFlatSize] = useState(5);
    // const [address, setAddress] = useState("");


    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 5,
        images: "",
        BedRooms: 4,
        Baths: 7,
        FlatSize: 5,
        address: "",
    });
    const { name,
        description,
        price,
        images,
        BedRooms,
        Baths,
        FlatSize,
        address } = productData;



    // const createProductSubmitHandler = (e) => {
    //     e.preventDefault();

    //     const myForm = new FormData();

    //     myForm.set("name", name);
    //     myForm.set("price", price);
    //     myForm.set("description", description);
    //     myForm.set("images", images);
    //     myForm.set("BedRooms", BedRooms);
    //     myForm.set("Baths", Baths);
    //     myForm.set("FlatSize", FlatSize);
    //     myForm.set("address", address);

    //     dispatch(createProduct(myForm));
    // };

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // for (let key in productData) {
        //     formData.append(key, productData[key]);
        // }
        // Form validation should also be handled on the client-side.
        if (!name || !description || !price || !images || !BedRooms || !Baths || !FlatSize || !address) {
            alert("Please fill in all the required fields.");
            return;
        }


        dispatch(createProduct(productData));
    };


    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (error) {
            alert("input data corectly");
            dispatch(clearErrors());
        }

        if (success) {
            alert("Product Created Successfully");
            navigate('/');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, navigate, success]);


    return (
        <div className="md:relative block">
            <div className="border shadow-2xl bg-white md:absolute md:left-10 block">
                <div className="flex flex-col w-full">
                    <form
                        className="flex flex-col px-5"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="name"
                                autoComplete=""
                                value={name}
                                onChange={handleChange}
                                placeholder="name"
                                className="input-style"
                            />
                            <input
                                type="text"
                                name="description"
                                autoComplete=""
                                value={description}
                                onChange={handleChange}
                                placeholder="description"
                                className="input-style"
                            />
                            <input
                                type="number"
                                name="price"
                                autoComplete=""
                                value={price}
                                onChange={handleChange}
                                placeholder="price"
                                className="input-style"
                            />
                            <input
                                type="text"
                                name="images"
                                autoComplete=""
                                value={images}
                                onChange={handleChange}
                                placeholder="images"
                                className="input-style"
                            />
                            <input
                                type="number"
                                name="BedRooms"
                                autoComplete=""
                                value={BedRooms}
                                onChange={handleChange}
                                placeholder="BedRooms"
                                className="input-style"
                            />
                            <input
                                type="number"
                                name="Baths"
                                autoComplete=""
                                value={Baths}
                                onChange={handleChange}
                                placeholder="Baths"
                                className="input-style"
                            />
                            <input
                                type="number"
                                name="FlatSize"
                                autoComplete=""
                                value={FlatSize}
                                onChange={handleChange}
                                placeholder="FlatSize"
                                className="input-style"
                            />
                            <input
                                type="text"
                                name="address"
                                autoComplete=""
                                value={address}
                                onChange={handleChange}
                                placeholder="address"
                                className="input-style"
                            />
                        </div>
                        <button type="submit" className="input-btn bg-orange-400">
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceForm;


// return (
//     <div className='md:relative block'>
//         <div className='border shadow-2xl bg-white md:absolute md:left-10 block'>
//             <div className="flex flex-col w-full  ">

//                 <form className="flex flex-col px-5"  // Fixed 'form' from 'forms'
//                     encType="multipart/form-data"
//                     onSubmit={createProductSubmitHandler}>
//                     <div className="flex flex-col">
//                         <input type="text"
//                             name='name'
//                             autoComplete=''
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="name" className="input-style" />
//                         <input type="text"
//                             name='description'
//                             autoComplete=''
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             placeholder="description" className="input-style" />
//                         <input type="number"
//                             name='price'
//                             autoComplete=''
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             placeholder="price" className="input-style" />
//                         <input type="text"
//                             name='images'
//                             autoComplete=''
//                             value={images}
//                             onChange={(e) => setImages(e.target.value)}
//                             placeholder="images" className="input-style" />
//                         <input type="number"
//                             name='BedRooms'
//                             autoComplete=''
//                             value={BedRooms}
//                             onChange={(e) => setBedRooms(e.target.value)}
//                             placeholder="BedRooms" className="input-style" />
//                         <input type="number"
//                             name='Baths'
//                             autoComplete=''
//                             value={Baths}
//                             onChange={(e) => setBaths(e.target.value)}
//                             placeholder="Baths" className="input-style" />
//                         <input type="number"
//                             name='FlatSize'
//                             autoComplete=''
//                             value={FlatSize}
//                             onChange={(e) => setFlatSize(e.target.value)}
//                             placeholder="FlatSize" className="input-style" />
//                         <input type="text"
//                             name='address'
//                             autoComplete=''
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             placeholder="address" className="input-style" />
//                     </div>
//                     <button type="submit" className="input-btn bg-orange-400" onClick={createProductSubmitHandler}>Add post</button>
//                 </form>
//             </div>
//         </div>
//     </div>
// )