import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

//TouchableOpacity 누르는 이벤트를 listen할 준비가된 View 라고할수있음. opacity 는 애니메이션 효과가있어서임 activeOpacity={0} Props를줘서 opacity를 설정할수 있음 onPress ㅖ개ㅔㄴfh
//TouchableHighlight 는 더많은 속성을 가지고있음. 배경색을 바꾸게해줄수있음
//TouchableWithoutFeedback 는 아무런 애니메이션이없음
//Pressable 는 더미래적이고 제일 새로운문법 더 많은 props를 넣을수있음 공홈 보길바람
//props 중 hitSlop 은 터치가되는 영역을 설정함
// onPress : (in&out 전부다) 에는 {
// onPressIn : 손가락이 영역안에 들어갈때
// onPressOut: 손가락이 영역에서 벗어날때
// onLongPress : 손가락이 영역에 들어가서 오랫동안 머무를 때
// }
export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const addToDo = () => {
    if (text === "") {
      return;
    }
    // save to do////
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, work: working },
    });
    setToDos(newToDos);
    setText("");
  };

  console.log(toDos);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0} onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.gray,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableHighlight activeOpacity={0} onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.gray,
            }}
          >
            Travel
          </Text>
        </TouchableHighlight>
      </View>

      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        style={styles.input}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
});
