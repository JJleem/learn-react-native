import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeStack/HomeScreen";
import DetailsScreen from "../screens/HomeStack/DetailsScreen";
import Reservation from "../screens/ReservationStack/Reservation";
import ReservationDetails from "../screens/ReservationStack/ReservationDetail";
import Score from "../screens/ScoreStack/Score";
import ScoreDetails from "../screens/ScoreStack/ScoreDetail";
import GiftDetails from "../screens/GiftStack/GiftDetails";
import Gift from "../screens/GiftStack/Gift";
import MyAccount from "../screens/MyAccountStack/MyAccount";
import MyAccountDetails from "../screens/MyAccountStack/MyAccountDetails";

///// Home Stack
export type RootStackParamList = {
  Home: undefined; // Home 화면은 파라미터가 필요 없음
  Details: { itemId: number; title: string }; // 파라미터 정의
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
/////

/////예약 창 Stack
export type ReservationStackParamList = {
  ReservationHome: undefined; // Home 화면은 파라미터가 필요 없음
  ReservationDetails: { itemId: number; title: string }; // 파라미터 정의
};

export const ReservationStack =
  createNativeStackNavigator<ReservationStackParamList>();

export function ReservationStackFnc() {
  return (
    <ReservationStack.Navigator screenOptions={{ headerShown: false }}>
      <ReservationStack.Screen name="ReservationHome" component={Reservation} />
      <ReservationStack.Screen
        name="ReservationDetails"
        component={ReservationDetails}
      />
    </ReservationStack.Navigator>
  );
}
/////

///// 스코어 Stack
export type ScoreStackParamList = {
  ScoreHome: undefined; // Home 화면은 파라미터가 필요 없음
  ScoreDetails: { itemId: number; title: string }; // 파라미터 정의
};

export const ScoreStack = createNativeStackNavigator<ScoreStackParamList>();

export function ScoreStackFnc() {
  return (
    <ScoreStack.Navigator screenOptions={{ headerShown: false }}>
      <ScoreStack.Screen name="ScoreHome" component={Score} />
      <ScoreStack.Screen name="ScoreDetails" component={ScoreDetails} />
    </ScoreStack.Navigator>
  );
}
/////

///// 헤택 Stack
export type GiftStackParamList = {
  GiftHome: undefined; // Home 화면은 파라미터가 필요 없음
  GiftDetails: { itemId: number; title: string }; // 파라미터 정의
};

export const GiftStack = createNativeStackNavigator<GiftStackParamList>();

export function GiftStackFnc() {
  return (
    <GiftStack.Navigator screenOptions={{ headerShown: false }}>
      <GiftStack.Screen name="GiftHome" component={Gift} />
      <GiftStack.Screen name="GiftDetails" component={GiftDetails} />
    </GiftStack.Navigator>
  );
}
/////

///// 헤택 Stack
export type MyAccountStackParamList = {
  MyAccountHome: undefined; // Home 화면은 파라미터가 필요 없음
  MyAccountDetails: { itemId: number; title: string }; // 파라미터 정의
};

export const MyAccountStack =
  createNativeStackNavigator<MyAccountStackParamList>();

export function MyAccountStackFnc() {
  return (
    <MyAccountStack.Navigator screenOptions={{ headerShown: false }}>
      <MyAccountStack.Screen name="MyAccountHome" component={MyAccount} />
      <MyAccountStack.Screen
        name="MyAccountDetails"
        component={MyAccountDetails}
      />
    </MyAccountStack.Navigator>
  );
}
/////
