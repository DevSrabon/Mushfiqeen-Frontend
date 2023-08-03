import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../../theme/Colors";
import Skeleton from "./Skeleton";

export default function SkeletonPage() {
    const cardWidth = Dimensions.get("window").width * 1;
    const skeWidth = cardWidth - 32;

    return (
        <View style={styles.container}>
            <View style={[styles.card, { width: cardWidth }]}>

                <View style={{ flexDirection: "row" }}>
                    <Skeleton
                        height={50}
                        width={50}
                        style={{ borderRadius: 25 }}
                    />

                    <View style={{ marginLeft: 5 }}>

                        <Skeleton
                            height={15}
                            width={cardWidth - 222}
                            style={{ borderRadius: 8, marginTop: 11 }}
                        />
                        <Skeleton
                            height={15}
                            width={cardWidth - 262}
                            style={{ borderRadius: 8, marginTop: 6 }}
                        />
                    </View>
                </View>

                {/* aspect ratio 16/9 */}
                {/* <Skeleton
          height={(skeWidth / 16) * 9}
          width={skeWidth}
          style={{ borderRadius: 8, marginTop: 16 }}
        /> */}

                <Skeleton
                    height={15}
                    width={skeWidth}
                    style={{ borderRadius: 8, marginTop: 16 }}
                />
                <Skeleton
                    height={15}
                    width={skeWidth}
                    style={{ borderRadius: 8, marginTop: 12 }}
                />
                <Skeleton
                    height={15}
                    width={skeWidth}
                    style={{ borderRadius: 8, marginTop: 12 }}
                />
                <Skeleton
                    height={15}
                    width={skeWidth}
                    style={{ borderRadius: 8, marginTop: 12 }}
                />

                <View style={{ flexDirection: "row" }}>

                    <Skeleton
                        height={22}
                        width={cardWidth - 298}
                        style={{ borderRadius: 8, marginTop: 12 }}
                    />
                    <Skeleton
                        height={22}
                        width={cardWidth - 298}
                        style={{ borderRadius: 8, marginTop: 12, marginLeft: 22 }}
                    />
                    <Skeleton
                        height={22}
                        width={cardWidth - 298}
                        style={{ borderRadius: 8, marginTop: 12, marginLeft: 22 }}
                    />
                    <Skeleton
                        height={22}
                        width={cardWidth - 298}
                        style={{ borderRadius: 8, marginTop: 12, marginLeft: 12 }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: colors.bg,
      padding: 16,
      elevation: 3,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.24,
      shadowRadius: 4,
    //   borderRadius: 8,
    },
  });