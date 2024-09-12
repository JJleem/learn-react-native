import React from "react";
import { Button, Text, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ReservationStackParamList } from "../../StackFnc/Stack";

type ReservationScreenNavigationProp = NativeStackNavigationProp<
  ReservationStackParamList,
  "ReservationHome"
>;

interface Props {
  navigation: ReservationScreenNavigationProp;
}

const Reservation: React.FC<Props> = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate("ReservationDetails", {
      itemId: 1,
      title: "예약 상세 화면",
    });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>예약 홈 화면</Text>
      <Button title="상세 화면으로 이동" onPress={goToDetails} />
    </View>
  );
};

export default Reservation;
