import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ScoreStackParamList } from "../../StackFnc/Stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  ScoreStackParamList,
  "ScoreHome"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Score: React.FC<Props> = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate("ScoreDetails", {
      itemId: 2,
      title: " 스코어 상세 화면 제목",
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>스코어 홈 화면</Text>
      <Button title="상세 화면으로 이동" onPress={goToDetails} />
    </View>
  );
};

export default Score;
