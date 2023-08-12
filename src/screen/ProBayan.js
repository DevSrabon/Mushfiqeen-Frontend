import { EvilIcons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, View, ScrollView } from "react-native";
import { HorizantalBar, SubContainer, SubRow, SubTitle, TextSmall } from "../components";
import Row from "../components/row";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProBayan = ({ navigation }) => {
  const { bayan } = useAuth();
  // console.log("🚀 ~ file: ProBayan.js:12 ~ ProBayan ~ bayan:", bayan);
  return (
    <>
      <SubContainer>
        <Row style={{ marginTop: StatusBar.currentHeight }}>
          <EvilIcons
            name="close"
            size={30}
            color={colors.secondary}
            onPress={() => navigation.goBack()}
          />

          <Title>All Bayan</Title>
        </Row>
        <ScrollView>
          {bayan
            ?.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}
                >

                  <SubRow
                    style={{
                      gap: 3,
                      alignSelf: "flex-between",
                      paddingVertical: 5,
                      paddingRight: 10,
                    }}
                  >
                    <Row>
                      <MaterialIcons
                        name="location-on"
                        size={24}
                        color={colors.primary}
                      />
                      <TextSmall style={{ color: colors.primaryLight }}>
                        {item?.place}
                      </TextSmall>
                    </Row>

                    <Row>
                      <AntDesign name="clockcircleo" size={16} color={colors.primary} />
                      <Title style={{ color: colors.primaryLight }}> {item?.date}</Title>
                    </Row>
                  </SubRow>
                  <SubTitle style={{ paddingVertical: 5, paddingLeft: 10 }}>
                    {item?.description}
                  </SubTitle>

                  <HorizantalBar />
                </View>
              </View>
            ))}
        </ScrollView>

      </SubContainer>
    </>
  );
};

export default ProBayan;