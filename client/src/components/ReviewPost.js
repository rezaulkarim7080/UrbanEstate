import React from 'react'

const ReviewPost = () => {


    return (

        <div>
            <form >
                <textarea cols="2" rows="3" type="text"
                    placeholder="Comment" className="w-full px-3 py-2 border rounded-3xl text-black "></textarea>
                <button type='submit ' className='bg-orange-600 px-3 py-2 rounded-lg'> Post</button>
            </form>

            {/* <input type="text" /> */}
        </div>
    )
}


export default ReviewPost