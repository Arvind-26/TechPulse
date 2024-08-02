import Head from 'next/head'
import Image from 'next/image'
import img from '../../public/favicon.ico'
import Link from 'next/link'
import mongoose from "mongoose"
import product from '../models/product'
import offer from '../models/offer'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Techpulse({ products, offers }) {
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState("")
  const headingRef = useRef()

  function infocus() {
    document.getElementById('search').classList.remove('hidden')
  }

  function focusoff() {
    setTimeout(() => {
      try {
        document.getElementById('search').classList.add('hidden')
      } catch (error) {
      }
    }, 500);
  }

  useEffect(() => {
    document.getElementById("banner").src = offers[index].img
    const interval = setInterval(() => {
      document.getElementById("banner").src = offers[index].img
      setIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index])

  const tl = gsap.timeline()

  useGSAP(() => {
    gsap.from(".headingdiv .first", {
      x: -500,
      duration: 1,
      stagger: -0.3,
      opacity: 0,
      delay: 0.3
    })
    gsap.from(".headingdiv .second", {
      x: 500,
      duration: 1,
      stagger: 0.3,
      opacity: 0
    })
    tl.from("main",{
      opacity:0,
      duration:1
    })
  })


  return (
    <div>
      <Head>
        <title>TechPulse</title>
        <meta name="desc" content="company"></meta>
        <link rel="icon" href={img.src} sizes="any" />
      </Head>
      <main>
        <div ref={headingRef} className='headingdiv overflow-x-hidden overflow-y-hidden md:text-8xl text-5xl font-extrabold text-center m-4' >
          <span class='first inline-block'>T</span>
          <span class="first inline-block">e</span>
          <span class="first inline-block">c</span>
          <span class="first inline-block">h</span>
          <span class="second text-red-600 inline-block">P</span>
          <span class="second text-red-600 inline-block">u</span>
          <span class="second text-red-600 inline-block">l</span>
          <span class="second text-red-600 inline-block">s</span>
          <span class="second text-red-600 inline-block">e</span>
        </div>
        <div>
          <div className="flex flex-col p-2 pt-6 m-h-screen">
            <div className="bg-white items-center justify-between relative m-auto w-full md:w-2/3 flex rounded-full shadow-2xl p-2" style={{ top: "5px" }}>
              <div className="bg-gray-600 p-2 mx-2 rounded-full">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" placeholder="Search" autoComplete='off' onFocus={infocus} onBlur={focusoff} />
              <div id='search' className=' hidden left-0 rounded-lg max-h-48 top-20 justify-center shadow-2xl bg-white absolute w-full overflow-auto' style={{ "scrollbar-width": "none" }}>
                {products.filter((item) => {
                  return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                }).map((item) => {
                  return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}>
                    <li className=' h-9 list-none hover:bg-slate-200 shadow-2xl flex justify-center items-center'>{item.name}</li>
                  </Link>
                })}</div>
            </div>
          </div>
        </div>

        <div className="p-3 mt-3 flex flex-col items-center text-2xl md:text-3xl font-bold">
          <label className="">Offers Today</label>
          <Image id="banner" alt="Product" className="bannerslide h-96 w-full mt-2 mb-10 " src={"data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="} width={100} height={100} />
        </div>

        <div id="product" className="m-3">
          <label htmlFor="" className="flex justify-center text-2xl md:text-3xl font-bold">Explore More TechPulse Products</label>
          <div>
            <label className="my-6 font-bold text-xl md:text-2xl">Top Picks</label>
            <div className="products1 gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 9) {
                  return null;
                }
                return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="transition transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none flex flex-col items-center text-xl min-w-52 w-52 border-2" >
                  <Image alt="Product" className=" h-40 w-40" src={item.img} width={100} height={100} />
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
                </Link>
              })}
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="" className="my-6 font-bold text-xl md:text-2xl">New Added</label>
            <div className="gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 9 && index < 20) {
                  return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="transition transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none flex flex-col items-center text-xl min-w-52 w-52 border-2">
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
            <label htmlFor="" className="my-6 font-bold text-xl md:text-2xl">Keep Shoping for</label>
            <div className="gap-3 my-3 p-4 flex border-2 w-fill overflow-x-auto whitespace-nowrap">
              {products.map((item, index) => {
                if (index > 19 && index < 30) {
                  return <Link key={item._id} href={{ pathname: '/detail', query: { id: `${item._id}` } }}><div className="transition transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none flex flex-col items-center text-xl min-w-52 w-52 border-2">
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