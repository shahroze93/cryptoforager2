import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  RefreshControl,
} from "react-native";

const CryptoList = () => {
  const [isLoading, setLoading] = useState(true);
  const [coinArray, setCoinArray] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [curr, setCurr] = useState("usd");
  // console.log(data);
  // console.log(Object.values(data));
  // console.log(data[query]);
  // console.log(info);
  // console.log(coinArray);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    fetch("https://api.coingecko.com/api/v3/coins")
      .then((response) => response.json())
      .then((json) => setCoinArray(json))
      .then(() => setRefreshing(false))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log("refreshed");
  };
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
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 40 : 10,
      }}
    >
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
          <Text
            style={{
              fontSize: 18,
              color: "orange",
              textAlign: "center",
              backgroundColor: "blue",
              fontWeight: "bold",
            }}
          >
            CRYPTOFORAGER
          </Text>
          <Text
            style={{
              color: "blue",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            CRYPTOCURRENCY PRICES BY MARKET CAP:
          </Text>
          <FlatList
            numColumns={2}
            columnWrapperStyle={styles.row}
            enabled="true"
            data={coinArray}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getApiData} />
            }
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <View style={[styles.coinContainer]}>
                  <Text>{item?.symbol.toUpperCase()}</Text>
                  <Text>{item?.id.toUpperCase()}</Text>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={{ uri: item?.image.small }}
                  />
                  <Text>
                    Market Cap Rank: {item.market_data.market_cap_rank}
                  </Text>
                  <Text
                    style={{
                      color: "blue",
                    }}
                  >
                    Price: {curr.toUpperCase()}{" "}
                    {item.market_data.current_price[curr]}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      item.market_data.price_change_percentage_24h < 0
                        ? styles.textinvalid
                        : styles.textvalid,
                    ]}
                  >
                    24hr Change:{" "}
                    {decimal2(item.market_data.price_change_percentage_24h) +
                      "%"}
                  </Text>
                  <Text>
                    Market Cap:{" "}
                    {decimal(item.market_data.market_cap[curr] / 1000000000)}{" "}
                    Bil {curr.toUpperCase()}
                  </Text>
                  <Text>
                    Cir Supply:{" "}
                    {decimal(item.market_data.circulating_supply / 1000000000)}{" "}
                    Bil {item.symbol.toUpperCase()}
                  </Text>
                </View>
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
    paddingHorizontal: 20,
  },
  text: {
    backgroundColor: "white",
  },
  textvalid: {
    color: "green",
  },
  textinvalid: {
    color: "red",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  coinContainer: {
    borderWidth: 2,
    borderRadius: 45,
    borderColor: "blue",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 170,
    margin: 5,
  },
  coinText: {
    // textAlign: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});

export default CryptoList;
