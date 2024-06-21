import Arrow from '../../public/Arrow.jpg'
import { useRouter } from "next/router"
import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';


const Review = ({data_get}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let router = useRouter()
  const product_id = router.query
  const { sharedValues } = useContext(AppContext);

  async function send() {
    const data = document.getElementById('user_text').value
    var fulldata = [
      {
        "_id": product_id.id,
        "reviews": [
          { "key": sharedValues.value2, "value": data }
        ]
      }
    ]
    await fetch(`${API_URL}/api/addreviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fulldata),
    })
    window.location.reload()
  }
  let obj
  data_get.products.forEach(element => {
    if (element._id == product_id.id) {
      obj = element.reviews
    }
  });


  return (
    <div className=' max-h-screen px-4 bg-gray-100 overflow-auto'>
      <label className=' text-2xl font-bold p-2'>Reviews</label>
      <div className=' relative flex flex-col items-center p-2  h-auto md:m-10 '>
        <textarea id='user_text' type="url" className='w-full p-2 pr-9 border-2 border-black text-black overflow-y-hidden min-h-20 max-h-20 rounded-lg' placeholder='Enter your feeback of the product' />
        <img src={Arrow.src} className=' h-7  absolute right-4 md:right-5 top-8' alt="" onClick={send} />
      </div>
      {obj.toReversed().map((item) => {
      return <div key={item._id} className='self-start h-auto  max-w-96 md:max-w-fit border-2 shadow-xl p-2 my-4 rounded-md bg-white'>
        <label className=' font-medium p-2'>{item.key}</label>
        <p className='self-start p-2 py-2 '>{item.value}</p>
      </div>
      })}
    </div>
  )
}

export default Review

