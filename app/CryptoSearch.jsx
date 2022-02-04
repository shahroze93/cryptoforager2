import { Text, View } from "react-native";
import React from "react";

const CryptoList = () => {
  const [data2, setData2] = useState([]);
  const [info, setInfo] = useState([]);
  const [query, setQuery] = useState("bitcoin");
  const [curr, setCurr] = useState("usd");

  async function fetchData(name, curr) {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${curr}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;
      const url2 = `https://api.coingecko.com/api/v3/coins/${name}`;
      const response = await axios.get(url);
      const data = await axios.request(url2);

      const info = data.data;
      showCrypto(response.data[name], info);
      return response;
    } catch (error) {
      console.error(error);
      let errorMsg = document.createElement("h1");
      errorMsg.textContent = `ERROR. --- PLEASE CHECK SPELLING & TRY AGAIN`;
      dataContainer.append(errorMsg);
    }
  }

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default CryptoSearch;
