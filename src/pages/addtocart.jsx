import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import Image from 'next/image'
import up from "../models/up";
import { useRouter } from "next/router"
import img from '../../public/favicon.ico'
import mongoose from "mongoose"
import Head from 'next/head';
import React from 'react';
import Script from 'next/script';


const Addtocart = ({ data }) => {
    const [Amount, setAmount] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    const { sharedValues } = useContext(AppContext);
    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            var user = await fetch(`${API_URL}/api/addup`, {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: sharedValues.value2 })
            });
            const user_data = await user.json();

            const response = await fetch(`${API_URL}/api/createOrder`, {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: Amount * 100 })
            });
            if (!response.ok) {
                throw new Error("Failed to create order");
            }
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: Amount * 100,
                currency: "INR",
                name: "Tech Pulse",
                description: "Product Purchase",
                order_id: data.orderId,
                handler: function (response) {
                    console.log("Payment Successful", response);
                },
                prefill: {
                    name: user_data.firstname + " " + user_data.lastname,
                    email: user_data.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in Payment:", error);
        } finally {
            setIsProcessing(false);
        }
    };


    const [loading, setLoading] = useState()
    let router = useRouter()
    let obj
    data.forEach(element => {
        if (element.username == sharedValues.value2) {
            obj = element.carts
        }
    });

    async function delete_item(index) {
        await fetch(`${API_URL}/api/addcart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ "user": sharedValues.value2, "id": index }])
        })
        cal()
        await router.push({
            pathname: '/addtocart',
        });
    }

    function cal() {
        var gt = 0;
        for (let i = 0; i < obj?.length; i++) {
            gt = parseInt(document.getElementById("total_price" + i).innerHTML) + gt
        }
        setAmount(gt)
    }


    function calc(index) {
        let tp = 0
        let qt = document.getElementById("quantity" + index).value
        tp = obj[index].price * qt
        document.getElementById("total_price" + index).innerHTML = tp
        cal()
    }

    return (<>
        <Head>
            <title>Cart</title>
            <link rel="icon" href={img.src} sizes="any" />
        </Head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <main className=" p-2 md:p-10 text-lg relative" onLoad={cal}>
            <div id='order' className="hidden absolute w-5/6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <p className="font-bold">Placed</p>
                        <p className="text-sm">Your order is sucessfully placed.</p>
                    </div>
                </div>
            </div>
            <label htmlFor="" className=' text-4xl md:m-2'>Your Shopping Cart</label>
            <div className=' h-auto bg-[#00000014]'>
                <div className=" h-20  flex justify-between border-b-2 border-black">
                    <div className=" h-full flex items-center md:w-1/2 w-2/5 pl-4">Items</div>
                    <div className=" h-full md:w-1/2 w-3/5 flex justify-evenly items-center">
                        <div className=" h-full flex items-center w-1/3">Price</div>
                        <div className=" h-full flex items-center w-1/3">Quantity</div>
                        <div className=" h-full flex items-center w-1/3">Total</div>
                    </div>
                </div>
                {obj?.map((item, index) => {
                    return <div key={item._id} className="md:h-32 h-auto flex justify-between border-b-2 border-black">
                        <div className=" h-full md:w-1/2 w-2/5 p-4 flex md:flex-row flex-col items-center">
                            <Image alt="Product" className=" h-28 w-28" src={item.photo} width={100} height={100} />
                            <div onMouseOver={cal} className=' flex flex-col items-start md:m-2'>
                                <label htmlFor="">{item.name}</label>
                                <span id={'load_remove' + index}>
                                    <button className='font-bold' onClick={() => delete_item(index)}>Remove</button>

                                </span>
                            </div>
                        </div>
                        <div className=" h-full md:w-1/2 w-3/5 my-auto flex justify-evenly">
                            <div className=" h-full w-1/3 flex items-center">₹{item.price}</div>
                            <div className=" h-full w-1/3 flex items-center">
                                <input id={"quantity" + index} className='w-14' defaultValue={1} max={5} min={1} type="number" name="" onInput={() => calc(index)} />
                            </div>
                            <div id={"total_price" + index} className=" h-full w-1/3 flex items-center">{item.price}</div>
                        </div>
                    </div>
                })}
                <div className=' flex justify-end mt-2'>
                    <label id="grand_total" htmlFor="" className=' pr-10'>Total: ₹{Amount}</label>
                    <button className=" text-white bg-black rounded-2xl py-1 px-5 text-xl mr-4" onClick={handlePayment} disabled={isProcessing}>Buy</button>
                </div>
            </div>
        </main>
    </>)
}

export default Addtocart

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.Monogodb_uri)
    }
    let data = await up.find()
    return {
        props: { data: JSON.parse(JSON.stringify(data)) }

    }

}