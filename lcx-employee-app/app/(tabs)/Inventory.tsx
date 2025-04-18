import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { router } from "expo-router";
import { useAssets } from "@/context/AssetContext";
import { useAuth } from "@/context/AuthContext";

export default function AssetInventoryScreen() {
 
  const { assets } = useAssets();
  const [selectedFilter, setSelectedFilter] = useState<string>("All...");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedAssetId, setExpandedAssetId] = useState<number | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  // Filter options
  const filterOptions: string[] = [
    "All...",
    "Available",
    "Assigned",
    "Maintenance",
    "Reserved",
  ];

  const getStatusStyles = (
    status: string
  ): { backgroundColor: string; borderColor: string } => {
    switch (status) {
      case "Available":
        return { backgroundColor: "#d1f4e0", borderColor: "#17c964" };
      case "Assigned":
        return { backgroundColor: "#fdedd3", borderColor: "#f5a524" };
      case "Maintenance":
        return { backgroundColor: "#fdd0df", borderColor: "#f5426c" };
      case "Reserved":
        return { backgroundColor: "#f3f1260", borderColor: "#f3f1260" };
      default:
        return { backgroundColor: "#f0f0f0", borderColor: "#cccccc" };
    }
  };

  // Toggle expanded asset details
  const toggleAssetDetails = (assetId: number): void => {
    setExpandedAssetId(expandedAssetId === assetId ? null : assetId);
  };

  // Navigate to request asset screen
  const handleRequestNewAsset = (): void => {
    router.push("/RequestAsset");
  };

  // Handle asset review
  const handleAssetReview = (assetId: number): void => {
    router.push({
      pathname: "/AssetDetails",
      params: { assetId: assetId.toString() }
    });
  };

  // Handle asset request
  const handleAssetRequest = (assetId: number): void => {
    router.push({
      pathname: "/RequestAsset",
      params: { assetId: assetId.toString() }
    });
  };

  // Filter assets based on search query and selected filter
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.asset_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.asset_sn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "All..." || asset.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Assets Inventory section title with Request Asset button */}
      <View className="flex-row justify-between items-center mx-5 mt-4 mb-4">
        <Text className="text-2xl font-bold">
          <Feather name="database" size={20} color="#0d1a31" /> Inventory
        </Text>
        {/* <TouchableOpacity
          className="flex-row items-center bg-[#0d1a31] px-4 py-2.5 rounded-full"
          onPress={handleRequestNewAsset}
        >
          <Feather name="plus" size={18} color="#fff" />
          <Text className="text-white font-bold ml-1.5">Request Asset</Text>
        </TouchableOpacity> */}
      </View>

      {/* Search and Filter Bar */}
      <View className="flex-row mx-5 mb-4">
        <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-1 mr-2.5 border border-gray-200">
          <Feather name="search" size={20} color="#666" className="mr-2" />
          <TextInput
            className="flex-1 text-sm text-gray-800"
            placeholder="Search assets..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          className="flex-row items-center bg-white px-4 py-2.5 rounded-full border border-gray-200"
          onPress={() => setShowFilterDropdown(!showFilterDropdown)}
        >
          <Text className="text-sm text-gray-500 mr-1">{selectedFilter}</Text>
          <Feather name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Filter dropdown menu */}
      {showFilterDropdown && (
        <View className="absolute top-[185px] right-5 bg-white rounded-lg border border-gray-200 z-10 shadow-sm">
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              className="py-2.5 px-5 border-b border-gray-100"
              onPress={() => {
                setSelectedFilter(option);
                setShowFilterDropdown(false);
              }}
            >
              <Text className="text-sm text-gray-800">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Assets List */}
      <ScrollView className="mx-5 flex-1">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <View key={asset.asset_id} className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
              {/* Asset Card Header */}
              <View className="flex-row">
                <View className="flex-1 flex-row items-center justify-between">
                  <Text className="text-lg font-bold mb-1">{asset.asset_name}</Text>                  
                  <View
                    style={{
                      backgroundColor: getStatusStyles(asset.status).backgroundColor,
                      borderColor: getStatusStyles(asset.status).borderColor,
                      borderWidth: 1,
                    }}
                    className="px-2.5 py-0.5 rounded-full mb-2"
                  >
                    <Text
                      style={{
                        color: getStatusStyles(asset.status).borderColor,
                      }}
                      className="font-bold text-xs"
                    >
                      {asset.asset_category}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Summary Info Always Visible */}
              <View className="mt-1">
                
                <View className="flex-1 flex-row items-center justify-between">
                  <Text className="text-xs text-gray-400 mt-1">
                    {asset.asset_type}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleAssetDetails(asset.asset_id)}
                  >
                    <Feather
                      name={
                        expandedAssetId === asset.asset_id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expanded Details and Actions */}
              {expandedAssetId === asset.asset_id && (
                <View className="mt-2.5">
                  <View className="h-px bg-gray-100 my-2.5" />

                  {/* Additional Details */}
                  <View className="mb-2.5">
                    <View className="flex-row">
                      <View className="flex-1">
                        <Text className="text-sm text-gray-500 mb-0.5">Description:</Text>
                        <Text className="text-sm text-gray-800">
                          {asset.description || "No description"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm text-gray-500 mb-0.5">Condition:</Text>
                        <Text className="text-sm text-gray-800">
                          {asset.condition || "Not specified"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="h-px bg-gray-100 my-2.5" />

                  {/* Action Buttons */}
                  <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity
                      className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full mr-2 mb-2"
                      onPress={() => handleAssetReview(asset.asset_id)}
                    >
                      <Feather name="eye" size={16} color="#333" />
                      <Text className="text-sm text-gray-800 ml-1">
                        View Details
                      </Text>
                    </TouchableOpacity>

                    {asset.status === "Available" && (
                      <TouchableOpacity
                        className="flex-row items-center bg-[#0d1a31] px-3 py-2 rounded-full mr-2 mb-2"
                        onPress={() => handleAssetRequest(asset.asset_id)}
                      >
                        <MaterialIcons name="assignment" size={16} color="white" />
                        {/* <Feather name="assignment" size={16} color="#fff" /> */}
                        <Text className="text-sm text-white ml-1">
                          Request Asset
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-10">
            <Feather name="box" size={48} color="#ccc" />
            <Text className="text-base text-gray-500 mt-4 text-center">
              No assets match your search criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}