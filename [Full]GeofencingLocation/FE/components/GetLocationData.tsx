import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocationText, MainView } from "../App";
import { ObjectId } from "mongodb";
import { View } from "react-native";

interface locationdata {
  _id: ObjectId;
  latitude: number;
  longitude: number;
  timeStamps: number | undefined;
  isCheck: boolean;
}

const GetLocationData = () => {
  const [locationData, setLocationData] = useState<locationdata[]>([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.0.68:5000/locationdata");
      setLocationData(response.data);
      console.log("get", response.data);
    } catch (err) {
      console.log("err get", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData(); // 주기적으로 데이터 가져오기
    }, 5000); // 5초마다 데이터 요청

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, []);
  console.log("받아온데이터", locationData);

  const renderLocationData = () => {
    return locationData.map((data) => (
      <View key={data._id.toString()} style={{ paddingVertical: 10 }}>
        <LocationText>Latitude: {data.latitude}</LocationText>
        <LocationText>Longitude: {data.longitude}</LocationText>
        <LocationText>timestamps: {data.timeStamps}</LocationText>
        <LocationText>isCheck: {data.isCheck ? "true" : "false"}</LocationText>
      </View>
    ));
  };
  return (
    <>
      {locationData.length > 0 ? (
        renderLocationData() // 위치 데이터를 표현하는 함수 호출
      ) : (
        <LocationText>Loading....</LocationText>
      )}
    </>
  );
};

export default GetLocationData;
