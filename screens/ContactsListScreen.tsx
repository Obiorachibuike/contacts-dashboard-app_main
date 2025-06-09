"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TextInput } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"

import ContactCard from "../components/ContactCard"
import type { Contact, RootStackParamList } from "../App"

type ContactsListScreenNavigationProp = StackNavigationProp<RootStackParamList, "ContactsList">

type Props = {
  navigation: ContactsListScreenNavigationProp
}

const ContactsListScreen: React.FC<Props> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [searchQuery, contacts])

  const fetchContacts = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10")
      const data = await response.json()

      const formattedContacts: Contact[] = data.results.map((user: any) => ({
        id: user.login.uuid,
        name: {
          first: user.name.first,
          last: user.name.last,
        },
        email: user.email,
        phone: user.phone,
        picture: {
          thumbnail: user.picture.thumbnail,
          large: user.picture.large,
        },
      }))

      setContacts(formattedContacts)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching contacts:", error)
      Alert.alert("Error", "Failed to fetch contacts")
      setLoading(false)
    }
  }

  const filterContacts = () => {
    if (searchQuery.trim() === "") {
      setFilteredContacts(contacts)
    } else {
      const filtered = contacts.filter((contact) =>
        `${contact.name.first} ${contact.name.last}`.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredContacts(filtered)
    }
  }

  const handleContactPress = (contact: Contact) => {
    navigation.navigate("ContactDetail", { contact })
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactCard contact={item} onPress={() => handleContactPress(item)} />}
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
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
})

export default ContactsListScreen
