import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Tabs style={{}}>
        <Tabs.Screen name="test" options={{ title: "test" }}></Tabs.Screen>
      </Tabs> */}
    </View>
  );
}
