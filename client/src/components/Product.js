import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Rating from './Rating';



const Product = ({ product }) => {


    return (
        <div className=''>

            <Link to={`products/${product._id}`} className=''  >


                <img src={product.images} alt={product.name} className='rounded-2xl ' />
                <div className='px-2 p-5'>
                    <h1 className='text-xl font-semibold hover:text-[#ffb30d]'>{product.name}</h1>
                    <div className='flex items-center gap-2'>

                        <h1>Bed:{product.BedRooms}</h1>
                        <h1>Bath: {product.Baths}</h1>
                        <h1>size:{product.FlatSize}</h1>
                    </div>
                    <p className='font-bold text-cyan-800'>Price ${product.price}</p>
                </div>


            </Link>
        </div>
    )
}

export default Product