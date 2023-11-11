import React from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import TabNavigator from "./src/navigation/ProductStack";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TabNavigator></TabNavigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
