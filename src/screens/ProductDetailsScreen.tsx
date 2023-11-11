import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import RatingElement from "../components/RatingElement";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { RootStackParamList } from "../navigation/ProductStack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import CustomStatusBar from "../components/CustomStatusBar";
import Ionicons from "react-native-vector-icons/Ionicons";

type ProductDetailsScreenProps = {
  route: RouteProp<RootStackParamList, "ProductDetails">;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
}) => {
  const { product } = route.params;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [rating, setRating] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const pan = React.useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const toggleHeart = () => {
    setIsHeartFilled((submited) => !submited);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar backgroundColor={Colors.Primary} />
      <View
        style={{
          backgroundColor: Colors.Primary,
          paddingVertical: 12,
          paddingLeft: 12,
          zIndex: 100,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="arrow-back" size={34} color="white" />

            <Text
              style={{
                marginLeft: 6,
                color: Colors.White,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Animated.Image
          resizeMode="contain"
          source={{ uri: product.image }}
          style={{
            width: 300,
            height: 300,
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-1000, 0],
                  outputRange: [-100, 0],
                  extrapolate: "clamp",
                }),
              },
              {
                scale: pan.y.interpolate({
                  inputRange: [-3000, 0],
                  outputRange: [20, 1],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        ></Animated.Image>

        <TouchableOpacity style={styles.heartContainer} onPress={toggleHeart}>
          <AntDesign
            name={isHeartFilled ? "heart" : "hearto"}
            size={28}
            color={Colors.Primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.line}></View>
        <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: pan.y } } }],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{product.title}</Text>
            <Text style={styles.priceText}>$ {product.price}</Text>
          </View>
          <RatingElement
            rating={rating}
            maxRating={5}
            onPress={handleRatingPress}
          />
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    backgroundColor: Colors.LightGray,
    flex: 1,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 22,
  },
  heartContainer: {
    alignSelf: "flex-end",
    right: 18,
    position: "absolute",
    bottom: 18,
  },
  line: {
    borderColor: "red",
    borderWidth: 2.2,
    width: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 4,
    top: -6,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    color: Colors.Black,
    flex: 1,
    marginRight: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.Primary,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 14,
    color: Colors.DarkGray,
  },
  descriptionText: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetailsScreen;
