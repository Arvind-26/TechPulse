import Image from "next/image"
import { useRouter } from "next/router"
import React from 'react'
import Review from "../components/Review"
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Link from 'next/link'
import Head from "next/head";


export default function detail({ data }) {
  let router = useRouter()
  const { sharedValues } = useContext(AppContext);
  let obj;
  const product_id = router.query
  data.products.forEach(element => {
    if (element._id == product_id.id) {
      obj = element
    }
  });

  async function senddata() {
    var fulldata = [
      {
        "user": sharedValues.value2,
        "carts": [
          { "name": obj.name, "photo": obj.img, "price": obj.price }
        ]
      }
    ]
    await fetch('http://localhost:3000/api/addcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fulldata),
    })
    await router.push({
      pathname: '/addtocart',
    });
  }

  function buy() {
    setTimeout(() => {
      document.getElementById("order").classList.toggle("hidden")
    }, 5000);
    document.getElementById("order").classList.toggle("hidden")
  }

  return (<>
  <Head>
        <title>Product</title>
      </Head>
    <div id='order' className=" hidden flex justify-center items-center text-5xl font-bold p-5">
      ORDER PLACED
    </div>
    <main className="flex flex-col md:flex-row md:py-10 p-10 md:px-10 w-auto m-8 md:my-14 md:mx-48 rounded-xl border-2 border-[#d30a03] gap-6">
      <div className="flex md:w-1/2">
        <Image alt="Product" priority="high" className=" md:h-96 md:w-96" src={obj.img} width={500} height={500} />
      </div>
      <div className="flex flex-col md:w-1/2 gap-5">
        <label htmlFor="" className=" font-bold text-3xl">{obj.name}</label>
        <label htmlFor="" className="">{obj.desc}</label>
        <label htmlFor="" className=" text-2xl">₹{obj.price}</label>
        <span>
          {sharedValues.value1 ?<>
          <button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mr-4" onClick={buy}>Buy Now</button>
            <button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mt-2 md:mt-0" onClick={senddata}>Add to cart</button></>
            : <Link href={"/login"}><button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mt-2 md:mt-0" onClick={senddata}>Add to cart</button></Link>}
        </span>
      </div>
    </main>
    <Review data_get={data} />
  </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/getproducts`);
  const data = await res.json();
  return {
    props: { data }
  }
}