'use client';
import { useQuery } from "@tanstack/react-query"
import { useState,useEffect } from "react";
import getCoinData from "../api/getCoinData/route"
import { PacmanLoader } from "react-spinners";
import Image from "next/image";


const PageHandler = ({children}:{children:React.ReactNode}) => {
    return <div className="flex flex-col items-center justify-center h-screen gap-8">
        {children}
    </div>
}


const CoinComponent = ({coin}:{coin:ICoinData}) => {
    //format to usd 
    const usdPrice = new Intl.NumberFormat("en-US", {
        style:"currency",
        currency: "USD"
    }).format(coin.current_price)

    return (
        <div className="flex flex-col items-center justify-center gap-4  p-4">
            <div className="object-contain flex items-center justify-center">
                <Image className="w-full max-w-3/4 h-auto" width={150} height={150} src={coin.image} alt={`image of cryptocurrency ${coin.name}`}/>
            </div>
            <div className="flex flex-col items-center justify-self-center gap-2">
                <h3 className="md:text-xl">{coin.name}</h3>
                <p className="text-xs md:text-base">{usdPrice}</p>
            </div>
        </div>
    )
}


const Hero = () => {
    const [search,setSearch] = useState<string>("")

    const coinData  = useQuery({
        queryKey:["coins"],
        queryFn: getCoinData,
        //refetch data every 5 minutes
        refetchInterval: 5 *60* 1e3,
        //cached for 10min if data is unused 
        gcTime: 10 * 60 * 1e3,
        //if component is rerendered data will be refreshed after this duration has passed
        staleTime: 2 * 60 * 1000
    })

    const filteredCoins = coinData.data?.filter((coin:ICoinData)=> {
        return search.toLowerCase().includes(coin.name.toLowerCase())
    })


    //LOADING
    if (coinData.isLoading) return (
        <PageHandler>
            <PacmanLoader size={80} color="#ff00ea"/>
            <p className="text-xl">Loading...</p>
        </PageHandler>)

    //ERROR HANDLING
    if (coinData.error) return (
        <PageHandler>
            <h1 className="text-xl text-center">Error fetching coin data.</h1>
        </PageHandler>)

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-12 text-sm md:text-base"> 
        <div className="flex flex-col items-center justify-center w-full gap-4">
            <p className="text-gray-500 opacity-70 text-center px-4 py-2">The five cryptocurrencies chosen were Bitcoin, Ethereum, Solana, Sui, and Polkadot.</p>
            <input
            className="rounded-2xl border-white border-2 p-2 w-3/4 md:w-1/2 text-center "
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for cryptos!" />  
        </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] w-full">
                {
                    filteredCoins?.map((coin:ICoinData,i:number) => {
                            return <CoinComponent key={i} coin={coin}/>
                    })
                }    
            </div>
            <button className="cursor-pointer bg-gradient-to-tr from-vibrant-blue to-vibrant-pink p-4 rounded-2xl " 
            onClick={()=> coinData.refetch()}>
                Refresh
            </button>
        </div>
    )
}

export default Hero