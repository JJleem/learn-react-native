import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "efb55a11b04e486b105c2946886997df";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState({});
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // requestForegroundPermissionsAsync 앱이켜져있는동안 background는 안켜져있어도 허락을 맡는것 그 object중 허용을하게되면 granted가 true가 됨
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    const filteredData = {
      main: json.main,
      weather: json.weather,
    };

    setDays(filteredData);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal // 수평스크롤 활성화
        pagingEnabled // 한장씩 스크롤되게끔 한페이지씩
        showsHorizontalScrollIndicator={false} //옆으로 스크롤될때 밑의 스크롤바 없애기
        contentContainerStyle={styles.weather} // horizontal 일시 style은 적용이안되고 contentContainerStyle로 해야함
      >
        {Object.keys(days).length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          <>
            <View style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContentL: "center",

                  alignItems: "center",
                }}
              >
                <Text style={styles.temp}>
                  {days.main ? parseFloat(days.main.temp).toFixed(1) : null}
                </Text>
                <Fontisto
                  name={icons[days.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>

              <Text style={styles.desc}>
                {days.weather && days.weather.length > 0
                  ? days.weather[0].main
                  : null}
              </Text>
              <Text style={styles.desc2}>
                {days.weather && days.weather.length > 0
                  ? days.weather[0].description
                  : null}
              </Text>
            </View>

            <View style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContentL: "center",

                  alignItems: "center",
                }}
              >
                <Text style={styles.temp}>
                  {days.main ? parseFloat(days.main.temp_max).toFixed(1) : null}
                </Text>
                <Fontisto
                  name={icons[days.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>

              <Text style={styles.desc}>
                {days.main
                  ? Object.keys(days.main).find((key) => key === "temp_max")
                  : null}
              </Text>
            </View>
            <View style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContentL: "center",

                  alignItems: "center",
                }}
              >
                <Text style={styles.temp}>
                  {days.main ? parseFloat(days.main.temp_min).toFixed(1) : null}
                </Text>
                <Fontisto
                  name={icons[days.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>

              <Text style={styles.desc}>
                {days.main
                  ? Object.keys(days.main).find((key) => key === "temp_min")
                  : null}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 88,
  },
  desc: {
    marginTop: 0,
    fontSize: 30,
  },
  desc2: {
    fontSize: 20,
  },
});
