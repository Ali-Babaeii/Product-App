import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Product } from "../../constants/types";
import Colors from "../../constants/Colors";

const cart = require("../../assets/cart.png");

interface ProductListProps {
  products: Product[];
  navigation: any;
  refreshing: boolean;
  onRefresh: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  navigation,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("ProductDetails", { product: item })}
      >
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={{ width: "100%", height: 160 }}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.priceText}>$ {item.price}</Text>
            <Image source={cart} style={styles.icon}></Image>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={<View style={{ height: 250 }} />}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          title="Pull to refresh"
          tintColor={Colors.Primary}
          titleColor={Colors.Primary}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    flex: 0.5,
    margin: 6,
    padding: 4,
    borderRadius: 14,
  },
  textWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: { width: 35, height: 35 },

  titleText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  priceText: {
    marginVertical: 6,
    color: Colors.Primary,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default ProductList;
