import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [check, setcheck] = useState("아직모름");

  useEffect(() => {
    //BackgroundGeolocation 설정하기
    BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[DEBUG] Location", location);
        setCurrentLocation(location);
      },
      (error) => {
        console.log("[ERROR] Location", error);
      }
    );
    BackgroundGeolocation.onGeofence((geofence) => {
      console.log("[DEBUG] Geofence", geofence);
      if (geofence.transition === BackgroundGeolocation.TRANSITION_ENTER) {
        setcheck("체크인 성공");
      } else if (
        geofence.transition === BackgroundGeolocation.TRANSITION_EXIT
      ) {
        setcheck("체크아웃성공");
      }
    });

    BackgroundGeolocation.ready(
      {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH, // 위치정확도
        distanceFilter: 10, // 위치 업데이트 받을 최소 거리 (미터)
        stopOnTerminate: false, // 앱이 종료되었을 때 위치 서비스를 중지할지 여부
        startOnBoot: true, // 기기가 부팅될때 위치서비스를 자동으로 시작할지 여부
        debug: true, // 디버그 모드 활성화 개발중 로그 출력
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      },
      (state) => {
        console.log("[INFO] BackgroundGeolocation is Ready : ", state);

        if (currentLocation) {
          BackgroundGeolocation.addGeofence([
            {
              id: "geofenceTest1",
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              radius: 100,
              transitionType:
                BackgroundGeolocation.TRANSITION_ENTER |
                BackgroundGeolocation.TRANSITION_EXIT,
            },
            console.log(
              currentLocation.coords.latitude,
              currentLocation.coords.longitude
            ),
          ]);
        }

        //BackgroundGeolocation 시작
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      }
    );

    return () => {
      BackgroundGeolocation.stop();
      BackgroundGeolocation.removeGeofences();
    };
  }, [currentLocation]);
  return (
    <View style={styles.container}>
      <Text>Geofencing Example</Text>
      {currentLocation && (
        <Text>
          현재 위치: {currentLocation.coords.latitude},
          {currentLocation.coords.longitude}
        </Text>
      )}
      <Text>{check}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
