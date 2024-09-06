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
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
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

const STORAGE_KEY = "@toDos";
const WORKING_KEY = "@working";
const FINISH_KEY = "@finish";
export default function App() {
  ////working
  const [working, setWorking] = useState(loadWorking);

  const saveWorking = async (toSave) => {
    await AsyncStorage.setItem(WORKING_KEY, JSON.stringify(toSave));
  };
  const loadWorking = async () => {
    try {
      const s = await AsyncStorage.getItem(WORKING_KEY);
      setWorking(JSON.parse(s));
    } catch {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    saveWorking(working);
  }, [working]);

  const travel = async () => {
    const newWorking = { ...working };
    setWorking(false);
    await saveWorking(newWorking);
  };
  const work = async () => {
    const newWorking = { ...working };
    setWorking(true);
    await saveWorking(newWorking);
  };
  /////finish
  const [finish, setFinish] = useState(false);

  const finishToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key] = {
      ...newToDos[key],
      finish: !newToDos[key].finish,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  ///////
  const onChangeText = (payload) => setText(payload);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if (s !== null) {
        setToDos(JSON.parse(s)); // 불러온 데이터가 null이 아닐 때만 파싱
      } else {
        console.log("저장된 데이터가 없습니다."); // null인 경우 처리
      }
    } catch {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    loadToDos();
    loadWorking();
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // save to do////
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, finish, isEdit },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  console.log(toDos);
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do?", " Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  const [isEdit, setIsEdit] = useState(false);
  const editTodo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key] = {
      ...newToDos[key],
      isEdit: !newToDos[key].isEdit,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const inputRef = useRef(null);
  // useEffect(() => {
  //   // isEdit가 true일 때 포커스 설정
  //   if (toDos[key].isEdit && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [toDos[key].isEdit]); // isEdit를 의존성 배열에 추가
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
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <TouchableOpacity onPress={() => finishToDo(key)}>
                <Fontisto
                  name={
                    toDos[key].finish ? "checkbox-active" : "checkbox-passive"
                  }
                  size={18}
                  color={theme.toDoBg}
                />
              </TouchableOpacity>

              {toDos[key].isEdit ? (
                <TextInput
                  returnKeyType="done"
                  ref={inputRef}
                  // onSubmitEditing={addToDo}
                  // onChangeText={onChangeText}
                  style={{
                    borderWidth: 1, // 테두리 두께
                    borderColor: theme.toDoBg, // 테두리 색상
                    width: 100,
                    height: 40,
                    padding: 5,
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                  value={toDos[key].text}
                />
              ) : (
                <Text
                  style={{
                    ...styles.toDoText,
                    textDecorationLine: toDos[key].finish
                      ? "line-through"
                      : "none",
                    color: toDos[key].finish ? theme.toDoBg : "white",
                  }}
                >
                  {toDos[key].text}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Text>
                    <Fontisto name="trash" size={18} color={theme.toDoBg} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTodo(key)}>
                  <Text>
                    <Entypo
                      name="dots-three-horizontal"
                      size={18}
                      color={theme.toDoBg}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
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
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.gray,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
