import { View, Text } from "react-native"
import App from "../App"

const Page = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contacts Dashboard App</Text>
      <App />
    </View>
  )
}

export default Page
