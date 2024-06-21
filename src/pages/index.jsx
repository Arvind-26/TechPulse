import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import mongoose from "mongoose"
import product from '../models/product'
import offer from '../models/offer'
import React, { useEffect } from 'react'



export default function Innovatetech({ products, offers }) {
  useEffect(() => {
    
    let i = 0
    document.getElementById("banner").src = offers[i].img
    setInterval(() => {
      try {
        document.getElementById("banner").src = offers[i].img
        i = (i + 1) % 4
      } catch (error) {
      }
    }, 3000);

  }, []);
  return (
    <div>
      <Head>
        <title>InnovateTech</title>
        <meta name="desc" content="company"></meta>
      </Head>
      <main>
        <div className="p-3 mt-3 flex flex-col items-center text-2xl md:text-3xl font-bold">
          <label className="">Offers Today</label>
          <Image id="banner" alt="Product" className="h-96 w-full mt-2 mb-10 " src={"data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="} width={100} height={100} />
        </div>

        <div id="product" className="m-3">
          <label htmlFor="" className="flex justify-center text-2xl md:text-3xl font-bold">Explore More InnovateTech Products</label>
          <div>
            <label className="my-6 font-bold text-xl md:text-2xl">Speakers and Headphones</label>
            <div className="gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 9) {
                  return null;
                }
                return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="flex flex-col items-center text-xl min-w-52 w-52 border-2" >
                  <Image alt="Product" className=" h-40 w-40" src={item.img} width={100} height={100} />
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
                </Link>
              })}
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="my-6 font-bold text-xl md:text-2xl">Smartphones and Tabs</label>
            <div className="gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 9 && index < 20) {
                  return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="flex flex-col items-center text-xl min-w-52 w-52 border-2">
                    <Image alt="Product" className=" h-40 w-40" src={item.img} width={100} height={100} />
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                  </Link>
                }
                return null;
              })}
            </div>
          </div>
          <div className="mt-10">
            <label htmlFor="" className="my-6 font-bold text-xl md:text-2xl">Pc and Accessories</label>
            <div className="gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 19 && index < 30) {
                  return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="flex flex-col items-center text-xl min-w-52 w-52 border-2">
                    <Image alt="Product" className=" h-40 w-40" src={item.img} width={100} height={100} />
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                  </Link>
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Monogodb_uri)
  }
  let products = await product.find()
  let offers = await offer.find()
  return {
    props: { products: JSON.parse(JSON.stringify(products)), offers: JSON.parse(JSON.stringify(offers)) }

  }
}