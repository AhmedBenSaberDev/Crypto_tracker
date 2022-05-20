import { createContext , useState , useEffect} from 'react';

import axios from 'axios';

const CryptoContext = createContext();

const ContextProvider = ({ children }) => {

    const [trendingCoins , setTrendingCoins] = useState([]);
    const [coins,setCoins] = useState([]);
    const [coin,setCoin] = useState({});
    const [loading,setLoading] = useState(false);
    const [historicalData, setHistoricalData] = useState([]);
    const [days,setDays] = useState(1);

    useEffect(() => {
        const fetchTrendingCoins = async() => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
                setTrendingCoins(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTrendingCoins();
    },[])

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true)
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
                setCoins(response.data)
            } catch (error) {
                console.log(error?.response);
            }
            setLoading(false);
        }
        fetchCoins();
    },[])

    const getCoinsDetails = async (id) => {
        
        setLoading(true);
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            setCoin(response.data)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const HistoricalChart = async(id, days = 365) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
            setHistoricalData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
  

    return(
        <CryptoContext.Provider value={{
            trendingCoins,
            coins,
            coin,
            loading,
            setLoading,
            getCoinsDetails,
            HistoricalChart,
            historicalData,
            days,
            setDays
        }}>
            { children }
        </CryptoContext.Provider>
    )
};

export {CryptoContext};
export default ContextProvider;
