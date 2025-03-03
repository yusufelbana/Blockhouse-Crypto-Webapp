import axios from "axios"



//"simple" api call doesn't get images, see https://docs.coingecko.com/v3.0.1/reference/simple-price
//btc,eth,solana,polkadot,sui
const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Csolana%2Cpolkadot%2Csui"
const API_KEY = process.env.COINGECKO_API_KEY

const getCoinData = async() => {
    const data = (await axios.get(URL,{
        headers: {
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': API_KEY
        }
    })).data
    //remove all extra information
    const filteredData = data.map(({name,image,current_price}:ICoinData)=> ({name,image,current_price}))
    return filteredData
}
export default getCoinData