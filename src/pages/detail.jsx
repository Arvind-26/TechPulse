import Image from "next/image"
import { useRouter } from "next/router"
import React from 'react'
import Review from "../components/review"


export default function detail({ data }) {
  let router = useRouter()
  let obj;
  const product_id = router.query
  data.products.forEach(element => {
    if (element._id == product_id.id) {
      obj = element
    }
  });

  return (<>
    <main className="flex flex-col md:flex-row md:py-10 p-10 md:px-10 w-auto m-8 md:my-14 md:mx-48 rounded-xl border-2 border-[#d30a03] gap-6">
      <div className="flex md:w-1/2">
        <Image alt="Product" priority="high" className=" md:h-96 md:w-96" src={obj.img} width={500} height={500} />
      </div>
      <div className="flex flex-col md:w-1/2 gap-5">
        <label htmlFor="" className=" font-bold text-3xl">{obj.name}</label>
        <label htmlFor="" className="">{obj.desc}</label>
        <label htmlFor="" className=" text-2xl">₹{obj.price}</label>
        <span>
          <button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mr-4">By Naw</button>
          <button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mt-2 md:mt-0">Add to cart</button>
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