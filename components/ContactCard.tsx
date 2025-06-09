import type React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import type { Contact } from "../App"

type Props = {
  contact: Contact
  onPress?: () => void
  showFavoriteIcon?: boolean
}

const ContactCard: React.FC<Props> = ({ contact, onPress, showFavoriteIcon = false }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!onPress}>
      <Image source={{ uri: contact.picture.thumbnail }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>
          {contact.name.first} {contact.name.last}
        </Text>
        <Text style={styles.email}>{contact.email}</Text>
      </View>

      {showFavoriteIcon && <Ionicons name="heart" size={20} color="#FF3B30" />}

      {onPress && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
})

export default ContactCard
