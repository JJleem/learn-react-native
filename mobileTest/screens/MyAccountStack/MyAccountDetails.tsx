import React from "react";
import { Button, Text, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import {
  MyAccountStackParamList,
  RootStackParamList,
} from "../../StackFnc/Stack";

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  MyAccountStackParamList,
  "MyAccountDetails"
>;
type DetailsScreenRouteProp = RouteProp<
  MyAccountStackParamList,
  "MyAccountDetails"
>;

interface Props {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

const MyAccountDetails: React.FC<Props> = ({ navigation, route }) => {
  const { itemId, title } = route.params; // 파라미터 추출

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>상세 화면</Text>
      <Text>아이템 ID: {itemId}</Text>
      <Text>제목: {title}</Text>
      <Button
        title="홈 화면으로 돌아가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default MyAccountDetails;
