// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import ProductListScreen from "./src/ProductListScreen";
// import ProductDetailsScreen from "./src/ProductDetailsScreen";

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           size = 34;
//           if (route.name === "Product List") {
//             iconName = focused ? "ios-list" : "ios-list-outline";
//           } else if (route.name === "Product Details") {
//             iconName = focused
//               ? "ios-information-circle-outline"
//               : "ios-information-circle-outline";
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#822b4c",
//         tabBarInactiveTintColor: "#403b3d",
//       })}
//     >
//       <Tab.Screen name="Product List" component={ProductListScreen} />
//       <Tab.Screen name="Product Details" component={ProductDetailsScreen} />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { Product } from "../../constants/types";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
};

const TabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "ProducList", headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "ProductDetails", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TabNavigator;
