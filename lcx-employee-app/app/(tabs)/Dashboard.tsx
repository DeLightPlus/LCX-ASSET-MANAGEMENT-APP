import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Clock, Danger, ArrowDown2, ArrowUp2, ArrowRight2 } from "iconsax-react-native";
import { useAssets } from "@/context/AssetContext";
import { router } from "expo-router";
import { images } from "@/constants";

export default function AssetManagementDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { assets } = useAssets();
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [expandedAssetId, setExpandedAssetId] = useState(null);

  const notifications = [
    {
      id: 1,
      title: "Request Approved",
      message: "Dell XPS 15 Laptop request approved",
      subtext: "Please wait patiently for dispatch",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Request Pending",
      message: "MacBook Pro request is pending approval",
      subtext: "Please check back later",
      time: "1 hour ago",
    },
  ];

  useEffect(() => {
    // Automatically show the modal when the user signs in
    setModalVisible(true);
  }, []);

  useEffect(() => {
    const availableAssets = assets.filter(asset => asset.status === 'Available');

    setFilteredAssets(availableAssets);
  }, [assets]);

  // Toggle asset details expanded/collapsed
  const toggleAssetDetails = (assetId) => {
    if (expandedAssetId === assetId) {
      setExpandedAssetId(null);
    } else {
      setExpandedAssetId(assetId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#e8eac6" barStyle="dark-content" />

      {/* <View className="flex-row justify-center items-center pt-4 pb-6">
        <Image source={images.Logo} resizeMode="contain" className="w-[170px] h-[100px]" />
      </View> */}


      {/* Dashboard Title */}
      <Text style={styles.dashboardTitle}>Dashboard</Text>
      <ScrollView        
        showsHorizontalScrollIndicator={false}
        style={styles.statsScrollContainer}
        contentContainerStyle={styles.statsContentContainer}
      >

        <Text style={styles.sectionTitle}>Stats</Text>
        {/* Enhanced Stats Cards - Now with gradients */}     
        <TouchableOpacity activeOpacity={0.9}>
        <LinearGradient
          colors={["#b8ca41", "#a6b83d"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statCardGradient}
        >
          <View style={styles.statIconContainer}>
            <Box size={24} color="white" variant="Bold" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{assets.length}</Text>
            <Text style={styles.statLabel}>Borrowed Assets</Text>
          </View>
        </LinearGradient>
        </TouchableOpacity>
        {/* Enhanced Stats Cards - Now with gradients */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsScrollContainer}
          contentContainerStyle={styles.statsContentContainer}
        >        
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={["#4a90e2", "#357dcb"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statCardGradient}
            >
              <View style={styles.statIconContainer}>
                <Clock size={24} color="white" variant="Bold" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={["#FF6B6B", "#ee5a5a"]} //"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statCardGradient}
            >
              <View style={styles.statIconContainer}>
                <Danger size={24} color="white" variant="Bold" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>Overdue</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>       
   

        <View style={styles.actionsContainer}>

          {/* Asset Categories */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {/* Asset List */}
          <ScrollView style={styles.assetListContainer}>
            <View style={styles.assetCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View>
                  <Text style={styles.assetName}>Inventory</Text>             
                </View>

                <View>
                  {/* <Text style={styles.assetStatus}>{asset.status}</Text> */}
                  {/* Toggle button for expanding/collapsing */}
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => console.log("Asset expanded")}
                  >
                    {expandedAssetId === 0 ? (
                      <ArrowUp2 size={20} color="#666" />
                    ) : (
                      <ArrowRight2 size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>         
            </View>

            <View style={styles.assetCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View>
                  <Text style={styles.assetName}>Request Asset</Text>             
                </View>

                <View>
                  {/* <Text style={styles.assetStatus}>{asset.status}</Text> */}
                  {/* Toggle button for expanding/collapsing */}
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => console.log("Asset expanded")}
                  >
                    {expandedAssetId === 0 ? (
                      <ArrowUp2 size={20} color="#666" />
                    ) : (
                      <ArrowRight2 size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>         
            </View>

            <View style={styles.assetCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View>
                  <Text style={styles.assetName}>View Assets History</Text>             
                </View>

                <View>
                  {/* <Text style={styles.assetStatus}>{asset.status}</Text> */}
                  {/* Toggle button for expanding/collapsing */}
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => console.log("Asset expanded")}
                  >
                    {expandedAssetId === 0 ? (
                      <ArrowUp2 size={20} color="#666" />
                    ) : (
                      <ArrowRight2 size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>         
            </View>        
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    alignItems: "center",
  },
  logoImage: {
    width: 180,
    height: 80,
    resizeMode: "contain",
  },
  notificationIcon: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#d13838",
    borderRadius: 12,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  dashboardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 4,
  },
  statsScrollContainer: {
    marginTop: 8,
    paddingVertical: 0,
  },
  statsContentContainer: {
    paddingHorizontal: 16,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    paddingBottom: 25,
    width: 150,
    height: 86,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: "#fff",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  statCardGradient: {
    borderRadius: 10,
    padding: 12,
    width: 150,
    height: 86,
    marginRight: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 8,
    alignSelf: "flex-start",
  },
  statContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 8, // Reduced marginBottom to decrease spacing
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginTop: 0, // Optional: Adjust marginTop to fine-tune spacing
  },
  categoryButton: {
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#0d1a31",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#666",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  assetListContainer: {
    marginHorizontal: 20,
    marginTop: 4,
    height: 400,
    // backgroundColor:'#000',
  },
  assetCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  assetId: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  assetStatus: {
    color: "#5eb354",
    fontWeight: "500",
  },
  expandButton: {
    alignSelf: "center",
    marginTop: 8,
    padding: 4,
  },
  expandedContent: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  actionsContainer: {
    marginHorizontal: 8,
    marginTop: 4,
    // backgroundColor: "#f0f0f0",
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 5,
  },
  requestButton: {
    backgroundColor: '#0d1a31',
  },
  requestButtonText: {
    color: '#fff',
  },
  showMoreButton: {
    padding: 8,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  showMoreText: {
    fontSize: 16,
    color: "#333",
  },

});
