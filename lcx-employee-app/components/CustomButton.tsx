import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({ handlePress, containerStyles = "", isLoading, textStyles = "", title }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-primary rounded-xl h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ''}`}
      disabled={isLoading}
    >
      <Text 
        className={`text-white font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
