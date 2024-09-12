import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyAccountStackParamList } from "../../StackFnc/Stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  MyAccountStackParamList,
  "MyAccountHome"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const MyAccount: React.FC<Props> = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate("MyAccountDetails", {
      itemId: 4,
      title: "MyAccount 상세 화면 제목",
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> MyAccount 홈 화면</Text>
      <Button title="상세 화면으로 이동" onPress={goToDetails} />
    </View>
  );
};

export default MyAccount;
