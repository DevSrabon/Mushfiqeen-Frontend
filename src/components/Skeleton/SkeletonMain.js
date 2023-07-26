import { StyleSheet, Text, View, Dimensions, } from 'react-native'
import React from 'react'
import Skeleton from './Skeleton';

const SkeletonMain = () => {
  const cardWidth = Dimensions.get('window').width * 0.8;
  const skeWidth = cardWidth - 32;
  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: cardWidth }]}>
        <Skeleton height={40} width={40} style={{ borderRadius: 20 }} />
        {/* aspect ratio 16/9 */}
        <Skeleton
          height={(skeWidth/16)*9}
          width={skeWidth}
          style={{borderRadius:8,marginTop:16}}
        />
        <Skeleton
          height={10}
          width={skeWidth}
          style={{borderRadius:8,marginTop:16}}
        />
        <Skeleton
          height={10}
          width={skeWidth}
          style={{borderRadius:8,marginTop:8}}
        />
        <Skeleton
          height={10}
          width={skeWidth}
          style={{borderRadius:8,marginTop:8}}
        />
      </View>
    </View>
  )
}

export default SkeletonMain;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    borderRadius: 8,
  }
})