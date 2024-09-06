// import React, { useEffect, useRef } from "react";
// import { TextInput, Text } from "react-native";

// const Edit = ({ edit, toDos, key, theme }) => {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     // toDos[key]가 존재하고 isEdit가 true일 때 포커스 설정
//     if (toDos[key] && toDos[key].isEdit && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [toDos[key]]); // toDos[key]를 의존성 배열에 추가

//   return (
//     <>
//       {toDos[key].isEdit ? (
//         <TextInput
//           returnKeyType="done"
//           ref={inputRef} // ref 추가
//           style={{
//             borderWidth: 1, // 테두리 두께
//             borderColor: theme.toDoBg, // 테두리 색상
//             width: 100,
//             height: 40,
//             padding: 5,
//             color: "white",
//             fontSize: 16,
//             fontWeight: "500",
//             textAlign: "center",
//           }}
//           value={toDos[key].text}
//         />
//       ) : (
//         <Text
//           style={{
//             ...styles.toDoText,
//             textDecorationLine: toDos[key].finish ? "line-through" : "none",
//             color: toDos[key].finish ? theme.toDoBg : "white",
//           }}
//         >
//           {toDos[key].text}
//         </Text>
//       )}
//     </>
//   );
// };

// export default Edit;
