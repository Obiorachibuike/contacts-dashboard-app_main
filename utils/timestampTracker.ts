import AsyncStorage from "@react-native-async-storage/async-storage"

const TIMESTAMP_KEY = "favorite_timestamps"

export const trackFavoriteAction = async (): Promise<void> => {
  try {
    const now = new Date()
    const currentHour = now.getHours()

    const timestampsJson = await AsyncStorage.getItem(TIMESTAMP_KEY)
    const timestamps = timestampsJson ? JSON.parse(timestampsJson) : []

    timestamps.push({
      hour: currentHour,
      timestamp: now.toISOString(),
    })

    await AsyncStorage.setItem(TIMESTAMP_KEY, JSON.stringify(timestamps))
  } catch (error) {
    console.error("Error tracking favorite action:", error)
  }
}

export const getHourlyFavoriteStats = async (): Promise<{ hour: number; count: number }[]> => {
  try {
    const timestampsJson = await AsyncStorage.getItem(TIMESTAMP_KEY)
    const timestamps = timestampsJson ? JSON.parse(timestampsJson) : []

    const now = new Date()
    const currentHour = now.getHours()
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000)

    // Filter timestamps from the last 6 hours
    const recentTimestamps = timestamps.filter((item: any) => {
      const timestamp = new Date(item.timestamp)
      return timestamp >= sixHoursAgo
    })

    // Create hourly stats for the last 6 hours
    const hourlyStats: { [key: number]: number } = {}

    // Initialize all hours in the last 6 hours with 0
    for (let i = 0; i < 6; i++) {
      const hour = (currentHour - i + 24) % 24
      hourlyStats[hour] = 0
    }

    // Count favorites for each hour
    recentTimestamps.forEach((item: any) => {
      if (hourlyStats.hasOwnProperty(item.hour)) {
        hourlyStats[item.hour]++
      }
    })

    // Convert to array format and sort by hour
    const result = Object.entries(hourlyStats)
      .map(([hour, count]) => ({
        hour: Number.parseInt(hour),
        count,
      }))
      .sort((a, b) => {
        // Sort to show hours in chronological order (oldest to newest)
        const aDistance = (currentHour - a.hour + 24) % 24
        const bDistance = (currentHour - b.hour + 24) % 24
        return bDistance - aDistance
      })

    return result
  } catch (error) {
    console.error("Error getting hourly stats:", error)
    return []
  }
}
