import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../StackFnc/Stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate("Details", { itemId: 0, title: "상세 화면 제목" });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>홈 화면</Text>
      <Button title="상세 화면으로 이동" onPress={goToDetails} />
    </View>
  );
};

export default HomeScreen;
