import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";

const CryptoList = () => {
  const [isLoading, setLoading] = useState(true);
  const [coinArray, setCoinArray] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [info, setInfo] = useState([]);
  // const [query, setQuery] = useState("bitcoin");
  const [curr, setCurr] = useState("usd");
  // console.log(data);
  // // console.log(Object.values(data));
  // console.log(data[query]);
  // console.log(info);
  console.log(coinArray);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins")
      .then((response) => response.json())
      .then((json) => setCoinArray(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // console.log(coinArray);
  // console.log(coinArray[0].symbol);
  // console.log(coinArray[0].image.thumb);

  function decimal(x) {
    const deci = Number.parseFloat(x).toFixed(4);
    return deci;
  }
  function decimal2(x) {
    const deci2 = Number.parseFloat(x).toFixed(2);
    return deci2;
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
            Text
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Articles:
          </Text>
          <FlatList
            data={coinArray}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <Text>{item?.symbol.toUpperCase()}</Text>
                <Text>{item?.id.toUpperCase()}</Text>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{ uri: item?.image.small }}
                />
                <Text>Market Cap Rank: {item.market_data.market_cap_rank}</Text>
                <Text>Price: {item.market_data.current_price[curr]}</Text>
                <Text>
                  24hr Change:{" "}
                  {decimal2(item.market_data.price_change_percentage_24h) + "%"}
                </Text>
                <Text>
                  Market Cap:{" "}
                  {decimal(item.market_data.market_cap[curr] / 1000000000)} Bil{" "}
                  {curr.toUpperCase()}
                </Text>
                <Text>
                  Cir Supply:{" "}
                  {decimal(item.market_data.circulating_supply / 1000000000)}{" "}
                  Bil {item.symbol.toUpperCase()}
                  {"\n"}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  logo: {
    width: "100%",
    height: 10,
  },
});

export default CryptoList;
