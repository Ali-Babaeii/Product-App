import { View,TouchableOpacity,StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../constants/Colors";

interface RatingProps {
    rating: number;
    maxRating: number;
    onPress: (rating: number) => void;
  }
  
  const RatingElement: React.FC<RatingProps> = ({ rating, maxRating, onPress }) => {
    const generateStars = () => {
      const stars = [];
      for (let i = 1; i <= maxRating; i++) {
        const starColor = i <= rating ? Colors.Primary : Colors.Gray;
        stars.push(
          <TouchableOpacity
            key={i}
            onPress={() => onPress(i)}
            activeOpacity={0.8}
            style={styles.starButton}
          >
            <Ionicons name="star" size={24} color={starColor} />
          </TouchableOpacity>
        );
      }
      return stars;
    };
  
    return <View style={styles.container}>{generateStars()}</View>;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    starButton: {
      marginRight: 5,
    },
  });

  export default RatingElement