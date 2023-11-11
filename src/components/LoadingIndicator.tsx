import * as React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export function LoadingIndicator() {
  return (
    <View style={styles.fill}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})