import React, { useState } from "react";
import {
  Animated,
  Button,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../StackFnc/Stack";
import styled from "styled-components/native";
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
  const [isClicked, setIsClicked] = useState({
    golf: true,
    reservation: false,
  });
  const handleHeader = (key: "golf" | "reservation") => {
    setIsClicked((prev) => ({
      ...prev,
      golf: key === "golf" ? !prev.golf : false,
      reservation: key === "reservation" ? !prev.reservation : false,
    }));
  };
  const [visible, setVisible] = useState(false);
  const [translateY] = useState(new Animated.Value(400));

  const toggleSearch = () => {
    Keyboard.dismiss();

    setVisible(!visible);
    Animated.timing(translateY, {
      toValue: visible ? 300 : 0, // 위로 올라오거나 내려감
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <HeaderView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            alignContent: "center",
          }}
        >
          <HeaderTouch
            isClick={isClicked.golf}
            onPress={() => handleHeader("golf")}
          >
            <HeaderText isClick={isClicked.golf}>골프예약</HeaderText>
          </HeaderTouch>
          <HeaderTouch
            isClick={isClicked.reservation}
            onPress={() => handleHeader("reservation")}
          >
            <HeaderText isClick={isClicked.reservation}>예약+</HeaderText>
          </HeaderTouch>
        </View>
      </HeaderView>
      <TextInputView>
        <HeaderTextInput
          placeholder="지역,골프장명,키워드 검색"
          onChangeText={(text) => console.log(text)}
          secureTextEntry={false}
          keyboardType="default"
          maxLength={100}
          multiline={false}
          onFocus={toggleSearch}
        />
        <SearchImg
          source={require("../../assets/icon/search.png")}
          resizeMode="contain"
        />
      </TextInputView>

      <MainView>
        {/* <Text>홈 화면dd</Text>
        <Button title="상세 화면으로 이동" onPress={goToDetails} /> */}
      </MainView>
      {visible && (
        <ToggleModalView
          style={{ elevation: 5 }}
          onPress={() => setVisible(!visible)}
        >
          <ToggleView style={[{ transform: [{ translateY }] }]}>
            <TextInputView>
              <HeaderTextInput
                placeholder="지역,골프장명,키워드 검색"
                onChangeText={(text) => console.log(text)}
                secureTextEntry={false}
                keyboardType="default"
                maxLength={100}
                multiline={false}
                onFocus={toggleSearch}
              />
              <SearchImg
                source={require("../../assets/icon/search.png")}
                resizeMode="contain"
              />
            </TextInputView>
            <TextInputView></TextInputView>
          </ToggleView>
        </ToggleModalView>
      )}
    </>
  );
};

export default HomeScreen;

type isClick = {
  isClick: boolean;
};

const MainView = styled.View`
  flex: 10;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
const HeaderView = styled.View`
  flex: 1;
  align-items: start;
  background: #eee;
  flex-direction: column;
  justify-content: center;
  padding: 25px 25px;
  gap: 27px;
  padding-top: 80px;
`;
const TextInputView = styled.View`
  flex: 1;
  background: #eee;
  justify-content: center;
  padding: 25px 25px;
  padding-top: 0px;
  gap: 27px;
  position: relative;
`;
const HeaderText = styled.Text<isClick>`
  color: ${(props) => (props.isClick ? "#141414" : "#aaa")};
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -1.5px;
`;
const HeaderTouch = styled.TouchableOpacity<{ isClick: boolean }>`
  padding-bottom: ${(props) => (props.isClick ? "10px" : "0")};
  border-bottom-width: ${(props) => (props.isClick ? "3px" : "0")};
  border-bottom-color: ${(props) =>
    props.isClick ? "#141414" : "transparent"};
`;
const HeaderTextInput = styled.TextInput`
  padding: 10px;
  padding-left: 48px;
  flex: 1;
  border-radius: 5px;
  background-color: #fafafa;
`;
const SearchImg = styled.Image`
  position: absolute;
  left: 35px;
  transform: translateY(-10px);
  top: 50%;
  width: 24px;
  height: 24px;
`;
const ToggleModalView = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  z-index: 1000;
`;

const ToggleView = styled(Animated.View)`
  background-color: white;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 80%;
`;
