import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  Notification,
  User,
  Home2,
  ClipboardText,
  Note,
  Logout,
  NotificationStatus,
} from "iconsax-react-native";
import { router } from "expo-router";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveBackgroundColor: "#f5f7e8",
          drawerInactiveBackgroundColor: "#fff",
        }}
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                Alert.alert("Sign Out", "Are you sure you want to sign out?", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Sign Out",
                    style: "destructive",
                  },
                ]);
              }}
            >
              <Logout size="24" color="white" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <Home2 size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Dashboard</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => router.push("/Notifications")}>
                  <View>
                    <Notification
                      size="24"
                      color="#000"
                      style={styles.iconSpacing}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("User clicked")}>
                  <User size="24" color="#000" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="AssetsInventory"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <ClipboardText size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Assets / Inventory</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={() => router.push("/(app)/Notifications")}
                >
                  <View>
                    <Notification
                      size="24"
                      color="#000"
                      style={styles.iconSpacing}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("User clicked")}>
                  <User size="24" color="#000" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="PendingApprovals"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <NotificationStatus size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Pending Approvals</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => router.push("/Notifications")}>
                  <View>
                    <Notification
                      size="24"
                      color="#000"
                      style={styles.iconSpacing}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="RequestAsset"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <Note size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Request Asset</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => router.push("/Notifications")}>
                  <View>
                    <Notification
                      size="24"
                      color="#000"
                      style={styles.iconSpacing}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("User clicked")}>
                  <User size="24" color="#000" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <User size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Profile</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => router.push("/Notifications")}>
                  <View>
                    <Notification
                      size="24"
                      color="#000"
                      style={styles.iconSpacing}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Notifications"
          options={{
            title: "",
            drawerLabel: () => (
              <View style={styles.drawerLabel}>
                <Notification size="24" color="#000" />
                <Text style={styles.drawerLabelText}>Notifications</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTintColor: "#000",
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => console.log("User clicked")}>
                  <User size="24" color="#000" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerLabelText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  iconSpacing: {
    marginRight: 15,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B", // Updated background color
    padding: 10,
    margin: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
