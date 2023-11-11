import React from "react";
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
