import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProductList from "../components/ProductList";
import Colors from "../../constants/Colors";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { UseGetAllProducts } from "../hooks/getProductQuery";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/ProductStack";

const basket = require("../../assets/shopping.png");

type ProductListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ProductList">;
};

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, refetch } = UseGetAllProducts();

  const filteredProducts = () => {
    const filteredProducts = data.filter((data: any) =>
      data.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts;
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const renderSearchIcon = () => {
    return isSearching ? (
      <TouchableOpacity onPress={clearSearchQuery}>
        <Icon name="close" size={20} color="gray" style={styles.searchIcon} />
      </TouchableOpacity>
    ) : (
      <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar backgroundColor={Colors.Primary} />

      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <View>
            <Text style={styles.headerText}>Discover</Text>
            <Text style={styles.subheaderText}>Your Products</Text>
          </View>
          <View>
            <Image
              resizeMode="cover"
              source={basket}
              style={styles.icon}
            ></Image>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="SearchProduct"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />
          {renderSearchIcon()}
        </View>
      </View>
      <View style={styles.listContainer}>
        <ProductList
          products={filteredProducts()}
          navigation={navigation}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
  headerContainer: {
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.Primary,
    paddingBottom: 34,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    marginHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: Colors.LightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.White,
  },
  subheaderText: {
    fontSize: 18,
    color: Colors.White,
    fontWeight: "500",
  },

  searchInput: {
    flex: 1,
    paddingVertical: 8,
    height: 40,
    color: Colors.Black,
  },
  searchIcon: {
    marginRight: 4,
    color: Colors.Primary,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ProductListScreen;
