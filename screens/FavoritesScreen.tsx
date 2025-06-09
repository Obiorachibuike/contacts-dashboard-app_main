"use client"

import React, { useState } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

import ContactCard from "../components/ContactCard"
import type { Contact } from "../App"
import { getFavorites, exportFavoritesToFile } from "../utils/storage"

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites()
    }, []),
  )

  const loadFavorites = async () => {
    try {
      setLoading(true)
      const favoriteContacts = await getFavorites()
      setFavorites(favoriteContacts)
    } catch (error) {
      console.error("Error loading favorites:", error)
      Alert.alert("Error", "Failed to load favorites")
    } finally {
      setLoading(false)
    }
  }

  const handleExportFavorites = async () => {
    try {
      const success = await exportFavoritesToFile(favorites)
      if (success) {
        Alert.alert("Success", "Favorites exported successfully!")
      } else {
        Alert.alert("Error", "Failed to export favorites")
      }
    } catch (error) {
      console.error("Error exporting favorites:", error)
      Alert.alert("Error", "Failed to export favorites")
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    )
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>Mark contacts as favorites to see them here</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Contacts</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExportFavorites}>
          <Ionicons name="download" size={20} color="white" />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactCard contact={item} showFavoriteIcon />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  exportButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
})

export default FavoritesScreen
