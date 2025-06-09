"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import Graph from "../components/Graph"
import { getHourlyFavoriteStats } from "../utils/timestampTracker"

const StatsScreen: React.FC = () => {
  const [statsData, setStatsData] = useState<{ hour: number; count: number }[]>([])

  useFocusEffect(
    React.useCallback(() => {
      loadStats()
    }, []),
  )

  const loadStats = async () => {
    try {
      const data = await getHourlyFavoriteStats()
      setStatsData(data)
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const totalFavorites = statsData.reduce((sum, item) => sum + item.count, 0)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites Statistics</Text>
        <Text style={styles.subtitle}>Last 6 hours activity</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{totalFavorites}</Text>
          <Text style={styles.summaryLabel}>Total Favorites Added</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Favorites Added by Hour</Text>
        <Graph data={statsData} />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Hourly Breakdown</Text>
        {statsData.map((item, index) => (
          <View key={index} style={styles.dataRow}>
            <Text style={styles.dataHour}>
              {item.hour}:00 - {item.hour + 1}:00
            </Text>
            <Text style={styles.dataCount}>{item.count} favorites</Text>
          </View>
        ))}
        {statsData.length === 0 && <Text style={styles.noDataText}>No favorites added in the last 6 hours</Text>}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  dataContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dataHour: {
    fontSize: 16,
    color: "#333",
  },
  dataCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
})

export default StatsScreen
