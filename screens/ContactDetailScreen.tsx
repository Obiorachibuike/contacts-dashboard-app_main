"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import type { RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

import type { RootStackParamList } from "../App"
import { toggleFavorite, isFavorite } from "../utils/storage"
import { trackFavoriteAction } from "../utils/timestampTracker"

type ContactDetailScreenRouteProp = RouteProp<RootStackParamList, "ContactDetail">

type Props = {
  route: ContactDetailScreenRouteProp
}

const ContactDetailScreen: React.FC<Props> = ({ route }) => {
  const { contact } = route.params
  const [isContactFavorite, setIsContactFavorite] = useState(false)

  useEffect(() => {
    checkFavoriteStatus()
  }, [])

  const checkFavoriteStatus = async () => {
    const favoriteStatus = await isFavorite(contact.id)
    setIsContactFavorite(favoriteStatus)
  }

  const handleToggleFavorite = async () => {
    try {
      const newStatus = await toggleFavorite(contact)
      setIsContactFavorite(newStatus)

      if (newStatus) {
        await trackFavoriteAction()
        Alert.alert("Success", "Contact added to favorites!")
      } else {
        Alert.alert("Success", "Contact removed from favorites!")
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      Alert.alert("Error", "Failed to update favorite status")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: contact.picture.large }} style={styles.profileImage} />
        <Text style={styles.name}>
          {contact.name.first} {contact.name.last}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={24} color="#007AFF" />
          <Text style={styles.detailText}>{contact.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="call" size={24} color="#007AFF" />
          <Text style={styles.detailText}>{contact.phone}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.favoriteButton, isContactFavorite ? styles.favoriteButtonActive : styles.favoriteButtonInactive]}
        onPress={handleToggleFavorite}
      >
        <Ionicons name={isContactFavorite ? "heart" : "heart-outline"} size={24} color="white" />
        <Text style={styles.favoriteButtonText}>
          {isContactFavorite ? "Remove from Favorites" : "Mark as Favorite"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
    flex: 1,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  favoriteButtonActive: {
    backgroundColor: "#FF3B30",
  },
  favoriteButtonInactive: {
    backgroundColor: "#007AFF",
  },
  favoriteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default ContactDetailScreen
