import { SafeAreaView, StatusBar, View } from "react-native";

interface MyStatusBarProps {
  backgroundColor: string;
}

const CustomStatusBar: React.FC<MyStatusBarProps> = ({ backgroundColor }) => {
  return (
    <View style={{ backgroundColor, zIndex: 100 }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} />
      </SafeAreaView>
    </View>
  );
};

export default CustomStatusBar;
