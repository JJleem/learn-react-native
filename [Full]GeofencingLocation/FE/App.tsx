import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import styled from "styled-components/native";
import { getDistance } from "geolib";
import { useEffect, useState } from "react";
import MapView, { Callout, Marker, Polygon } from "react-native-maps";
import { Image } from "react-native";
import * as Notifications from "expo-notifications";
import axios from "axios";
import GetLocationData from "./components/GetLocationData";

const sendLocationData = async (
  latitude: number,
  longitude: number,
  timeStamps: number | undefined,
  isCheck: boolean
) => {
  try {
    const response = await axios.post("http://192.168.0.68:5000/locationdata", {
      latitude,
      longitude,
      timeStamps,
      isCheck,
    });
    console.log("데이터 전송", response.data);
  } catch (err) {
    console.log("err location data", err);
  }
};

interface LocationObject {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number;
    accuracy?: number;
    altitudeAccuracy?: number;
    heading?: number;
    speed?: number;
  };
  timestamp?: number;
  mocked?: boolean;
}

interface GeoFenceRegion {
  latitude: number;
  longitude: number;
  radius: number;
}

const GEOFENCE_REGION = {
  latitude: 37.4864194,
  longitude: 126.893593,
  radius: 20,
};
const GEOFENCE_REGIONTWO = {
  latitude: 37.4855194,
  longitude: 126.8934893,
  radius: 20,
};

const createSquare = (region: GeoFenceRegion) => {
  const { latitude, longitude, radius } = region;

  const halfSide = radius / 111320; // 위도/경도로 변환 (미터를 위도로 변환)

  return [
    { latitude: latitude + halfSide, longitude: longitude - halfSide }, // NW
    { latitude: latitude + halfSide, longitude: longitude + halfSide }, // NE
    { latitude: latitude - halfSide, longitude: longitude + halfSide }, // SE
    { latitude: latitude - halfSide, longitude: longitude - halfSide }, // SW
  ];
};

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  ); // 위치
  const [timestampString, setTimestampString] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false); // 사용자 인증 수락여부
  const [isInsideGeofence, setIsInsideGeofence] = useState(false); // 범위안에들어왔는지 아닌지

  /// 앱 시작하자마자 Permission을 받아오고 수락한다면 현재위치를 location에 저장하는 함수
  useEffect(() => {
    const askForLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치권한이 필요합니다.");
        return;
      }
      setPermissionGranted(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    askForLocationPermission();
  }, []);
  /// 앱 시작하자마자 Permission을 받아오고 수락한다면 현재위치를 location에 저장하는 함수
  useEffect(() => {
    if (permissionGranted) {
      const locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
          timeInterval: 1000,
        },
        (newLocation) => {
          const currentlyInsideGeofence = checkInGeofence(newLocation);
          if (currentlyInsideGeofence && !isInsideGeofence) {
            setIsInsideGeofence(true);
            Alert.alert("체크인 완료! Geofence 안에 있습니다.");
            console.log("체크인 완료! Geofence 안에 있습니다");
          } else if (!currentlyInsideGeofence && isInsideGeofence) {
            setIsInsideGeofence(false);
            Alert.alert("체크아웃 완료! Geofence 밖에 있습니다.");
            console.log("체크아웃 완료! Geofence 밖에 있습니다.");
          }
          sendLocationData(
            location?.coords.latitude ?? 0,
            location?.coords.longitude ?? 0,
            location?.timestamp, // 또는 다른 적절한 값으로 변경
            isInsideGeofence
          );
        }
      );

      return () => {
        locationSubscription.then((sub) => sub.remove());
      };
    }
  }, [permissionGranted, isInsideGeofence, location]);

  const checkInGeofence = (location: Location.LocationObject) => {
    const distance = getDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      {
        latitude: GEOFENCE_REGION.latitude,
        longitude: GEOFENCE_REGION.longitude,
      }
    );
    return distance <= GEOFENCE_REGION.radius;
  };

  useEffect(() => {
    if (location?.timestamp) {
      const timeStamp = location.timestamp;
      const date = new Date(timeStamp);
      setTimestampString(date.toLocaleString()); // 타임스탬프를 문자열로 변환하여 상태 업데이트
    }
  }, [location, permissionGranted, isInsideGeofence]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    const askForLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 권한이 필요합니다!");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    askForLocationPermission();
  }, []);

  const polygonCoords = createSquare(GEOFENCE_REGION);
  const polygonCoordsTWO = createSquare(GEOFENCE_REGIONTWO);
  const sendNotification = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Geofence 알림",
        body: message,
        sound: "default",
      },
      trigger: null, // 즉시 알림
    });
  };

  return (
    <MainView>
      <LocationText>Geofencing Test</LocationText>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <>
          <LocationText>타임스탬프: {timestampString}</LocationText>
          <LocationText>위도: {location.coords.latitude}</LocationText>
          <LocationText>경도: {location.coords.longitude}</LocationText>
          <MapView
            style={{ width: "100%", height: "50%" }} // 지도 크기 설정
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="현재 위치"
              description="여기에 있습니다."
            />
            <Marker
              coordinate={{
                latitude: GEOFENCE_REGION.latitude,
                longitude: GEOFENCE_REGION.longitude,
              }}
              title="지정위치"
              description="여기에 있습니다."
              icon={require("./assets/flag-01.png")}
            >
              <Callout>
                <View>
                  <Text>여기는 지정위치입니다.</Text>
                  <Image
                    source={require("./assets/flag-01.png")}
                    style={{ width: 50, height: 50 }} // 이미지 크기 조정
                  />
                </View>
              </Callout>
            </Marker>
            <Marker
              coordinate={{
                latitude: GEOFENCE_REGIONTWO.latitude,
                longitude: GEOFENCE_REGIONTWO.longitude,
              }}
              title="지정위치"
              description="여기에 있습니다."
              icon={require("./assets/flag-01.png")}
            >
              <Callout>
                <View>
                  <Text>여기는 지정위치입니다.</Text>
                  <Image
                    source={require("./assets/flag-01.png")}
                    style={{ width: 50, height: 50 }} // 이미지 크기 조정
                  />
                </View>
              </Callout>
            </Marker>
            <Polygon
              coordinates={polygonCoords}
              fillColor="rgba(255, 0, 0, 0.5)" // 사각형 내부 색상
              strokeColor="rgba(255, 0, 0, 1)" // 사각형 경계 색상
              strokeWidth={2} // 경계 두께
            />
            <Polygon
              coordinates={polygonCoordsTWO}
              fillColor="rgba(255, 0, 0, 0.5)" // 사각형 내부 색상
              strokeColor="rgba(255, 0, 0, 1)" // 사각형 경계 색상
              strokeWidth={2} // 경계 두께
            />
          </MapView>
        </>
      ) : (
        <>
          <LocationText>위도: Test</LocationText>
          <LocationText>경도: Test</LocationText>
        </>
      )}
      <GetLocationData />
    </MainView>
  );
}

export const MainView = styled.View`
  background: aliceblue;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const LocationText = styled.Text`
  font-weight: 700;
  font-size: 15px;
`;
