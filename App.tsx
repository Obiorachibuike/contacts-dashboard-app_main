import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"

import ContactsListScreen from "./screens/ContactsListScreen"
import ContactDetailScreen from "./screens/ContactDetailScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import StatsScreen from "./screens/StatsScreen"

export type RootStackParamList = {
  ContactsList: undefined
  ContactDetail: { contact: Contact }
}

export type Contact = {
  id: string
  name: {
    first: string
    last: string
  }
  email: string
  phone: string
  picture: {
    thumbnail: string
    large: string
  }
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator<RootStackParamList>()

function ContactsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ContactsList" component={ContactsListScreen} options={{ title: "Contacts" }} />
      <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: "Contact Details" }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap

            if (route.name === "Contacts") {
              iconName = focused ? "people" : "people-outline"
            } else if (route.name === "Favorites") {
              iconName = focused ? "heart" : "heart-outline"
            } else if (route.name === "Stats") {
              iconName = focused ? "bar-chart" : "bar-chart-outline"
            } else {
              iconName = "circle"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Contacts" component={ContactsStack} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
