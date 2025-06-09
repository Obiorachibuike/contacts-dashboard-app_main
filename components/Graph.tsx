import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"

type Props = {
  data: { hour: number; count: number }[]
}

const Graph: React.FC<Props> = ({ data }) => {
  const screenWidth = Dimensions.get("window").width
  const chartWidth = screenWidth - 64 // Account for padding
  const chartHeight = 200
  const maxCount = Math.max(...data.map((item) => item.count), 1)

  if (data.length === 0) {
    return (
      <View style={[styles.container, { height: chartHeight }]}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    )
  }

  const barWidth = chartWidth / data.length - 8

  return (
    <View style={styles.container}>
      <View style={[styles.chart, { height: chartHeight }]}>
        {data.map((item, index) => {
          const barHeight = (item.count / maxCount) * (chartHeight - 40)

          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <Text style={styles.countLabel}>{item.count}</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      width: barWidth,
                      height: Math.max(barHeight, 2),
                    },
                  ]}
                />
              </View>
              <Text style={styles.hourLabel}>{item.hour}:00</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  barWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    paddingBottom: 20,
  },
  bar: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    marginTop: 4,
  },
  countLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  hourLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 80,
  },
})

export default Graph
