// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import Feather from "@expo/vector-icons/Feather";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
export function ShoppingIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Feather>["name"]>) {
  return (
    <Feather
      size={24}
      style={[
        {
          marginBottom: -3,
          flexDirection: "column",
          borderBottomColor: "#000",
        },
        style,
      ]}
      {...rest}
    />
  );
}
