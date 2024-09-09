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

interface Todo {
  text: string;
  isEdit: boolean;
  working: boolean;
  finish: boolean;
}

interface Todos {
  [key: string]: Todo;
}
export default function App() {
  ////working

  const saveWorking = async (toSave: any) => {
    await AsyncStorage.setItem(WORKING_KEY, JSON.stringify(toSave));
  };
  const loadWorking = async () => {
    try {
      const s = await AsyncStorage.getItem(WORKING_KEY);
      setWorking(s !== null ? JSON.parse(s) : null);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const [working, setWorking] = useState({});

  useEffect(() => {
    saveWorking(working);
  }, [working]);

  useEffect(() => {
    loadWorking(); // 컴포넌트가 마운트될 때 데이터 로드
  }, []);

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

  const finishToDo = async (key: any) => {
    const newToDos: any = { ...toDos };
    newToDos[key] = {
      ...newToDos[key],
      finish: !newToDos[key].finish,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  ///////
  const onChangeText = (payload: string) => setText(payload);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<Todos>({});
  const saveToDos = async (toSave: string) => {
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
    } catch (err) {
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

    const newToDos: any = {
      ...toDos,
      [Date.now()]: { text, working, finish, isEdit },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  console.log(toDos);

  const deleteToDo = (key: any) => {
    Alert.alert("Delete To Do?", " Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos: any = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  ////////////// edit
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState<{ [key: string]: string }>({});
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    // isEdit이 true인 경우에만 focus를 줌
    const activeTodo = Object.keys(toDos).find((k) => toDos[k].isEdit);
    if (activeTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toDos]); // toDos가 변경될 때마다 실행

  const editTodo = (key: string) => {
    const newToDos: any = { ...toDos };
    // 현재 toDo의 isEdit 상태를 반전
    newToDos[key].isEdit = !newToDos[key].isEdit;
    // 편집 모드로 들어갈 때 수정 텍스트 상태를 설정
    if (newToDos[key].isEdit) {
      setEditText({ ...editText, [key]: newToDos[key].text });
    } else {
      handleSubmitEditing(key);
    }
    setToDos(newToDos);
  };

  const handleBlur = (key: any) => {
    const newToDos: any = { ...toDos };
    newToDos[key].isEdit = false; // 포커스가 벗어날 때 isEdit을 false로 설정
    setToDos(newToDos);
    handleSubmitEditing(key);
  };

  const handleSubmitEditing = async (key: any) => {
    const newToDos: any = { ...toDos };
    newToDos[key].text = editText[key]; // 수정된 텍스트로 업데이트
    newToDos[key].isEdit = false; // 편집 모드 종료

    setToDos(newToDos);
    await saveToDos(newToDos); // 저장
    setEditText({ ...editText, [key]: "" }); // 수정 텍스트 초기화
  };
  ////////////// edit
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
                  size={24}
                  color={theme.toDoBg}
                />
              </TouchableOpacity>

              {toDos[key].isEdit ? (
                <TextInput
                  returnKeyType="done"
                  ref={inputRef}
                  onSubmitEditing={() => handleSubmitEditing(key)}
                  onChangeText={(input) =>
                    setEditText({ ...editText, [key]: input })
                  }
                  style={{
                    borderWidth: 1, // 테두리 두께
                    borderColor: theme.toDoBg, // 테두리 색상
                    width: 100,
                    paddingVertical: 10,
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                  value={editText[key] || ""}
                  onBlur={() => handleBlur(key)}
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
                  onPress={() => editTodo(key)}
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
                    <Fontisto name="trash" size={24} color={theme.toDoBg} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTodo(key)}>
                  <Text>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
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
