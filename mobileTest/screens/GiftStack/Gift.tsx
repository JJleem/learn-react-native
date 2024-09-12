import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GiftStackParamList, RootStackParamList } from "../../StackFnc/Stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  GiftStackParamList,
  "GiftHome"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Gift: React.FC<Props> = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate("GiftDetails", {
      itemId: 3,
      title: "Gift 상세 화면 제목",
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Gift 홈 화면</Text>
      <Button title="상세 화면으로 이동" onPress={goToDetails} />
    </View>
  );
};

export default Gift;
