import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from "expo-file-system"
import type { Contact } from "../App"

const FAVORITES_KEY = "favorites"

export const getFavorites = async (): Promise<Contact[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY)
    return favoritesJson ? JSON.parse(favoritesJson) : []
  } catch (error) {
    console.error("Error getting favorites:", error)
    return []
  }
}

export const saveFavorites = async (favorites: Contact[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error("Error saving favorites:", error)
    throw error
  }
}

export const isFavorite = async (contactId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites()
    return favorites.some((contact) => contact.id === contactId)
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return false
  }
}

export const toggleFavorite = async (contact: Contact): Promise<boolean> => {
  try {
    const favorites = await getFavorites()
    const existingIndex = favorites.findIndex((fav) => fav.id === contact.id)

    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1)
      await saveFavorites(favorites)
      return false
    } else {
      // Add to favorites
      favorites.push(contact)
      await saveFavorites(favorites)
      return true
    }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    throw error
  }
}

export const exportFavoritesToFile = async (favorites: Contact[]): Promise<boolean> => {
  try {
    const fileName = `favorites_${new Date().toISOString().split("T")[0]}.json`
    const fileUri = `${FileSystem.documentDirectory}${fileName}`

    const exportData = {
      exportDate: new Date().toISOString(),
      totalFavorites: favorites.length,
      favorites: favorites.map((contact) => ({
        id: contact.id,
        name: `${contact.name.first} ${contact.name.last}`,
        email: contact.email,
        phone: contact.phone,
      })),
    }

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(exportData, null, 2))

    console.log("Favorites exported to:", fileUri)
    return true
  } catch (error) {
    console.error("Error exporting favorites:", error)
    return false
  }
}
