import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Image from 'next/image'
import { useRouter } from "next/router"
import Head from 'next/head';
import React from 'react';

const Addtocart = ({ data }) => {
    let router = useRouter()
    const { sharedValues } = useContext(AppContext);
    let obj
    data.products.forEach(element => {
        if (element.username == sharedValues.value2) {
            obj = element.carts
        }
    });

    async function delete_item(index) {
        await fetch("https://innovate-tech-hmigrifqf-arvinds-projects-cbb943f6.vercel.app/api/addcart", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ "user": sharedValues.value2, "id": index }])
        })

        await router.push({
            pathname: '/addtocart',
        });
    }

    function cal() {
        var gt = 0;
        for (let i = 0; i < obj?.length; i++) {
            gt = parseInt(document.getElementById("total_price" + i).innerHTML) + gt
        }
        document.getElementById("grand_total").innerHTML = "Total: ₹" + gt
    }


    function calc(index) {
        let tp = 0
        let qt = document.getElementById("quantity" + index).value
        tp = obj[index].price * qt
        document.getElementById("total_price" + index).innerHTML = tp
        cal()
    }

    function buy() {
        setTimeout(() => {
            document.getElementById("order").classList.toggle("hidden")
        }, 5000);
        document.getElementById("order").classList.toggle("hidden")
    }

    return (<>
        <Head>
            <title>Cart</title>
        </Head>
        <div id='order' className=" hidden flex justify-center items-center text-5xl font-bold p-5">
            ORDER PLACED
        </div>
        <main className=" p-2 md:p-10 text-lg" onLoad={cal}>
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
                                <button className='font-bold' onClick={() => delete_item(index)}>Remove</button>
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
                    <label id="grand_total" htmlFor="" className=' pr-10'>Total: 0</label>
                    <button className=" text-white bg-black rounded-2xl py-1 px-5 text-xl mr-4" onClick={buy}>Buy</button>
                </div>
            </div>
        </main>
    </>)
}

export default Addtocart

export async function getServerSideProps(context) {
    const product = await fetch('https://innovate-tech-hmigrifqf-arvinds-projects-cbb943f6.vercel.app//addcart')
    const data = await product.json()


    return {
        props: { data }
    }

}