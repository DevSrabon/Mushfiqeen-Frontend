import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavStr from "../Nav/NavStr";
import {
  HorizantalBar,
  SubContainer,
  SubRow,
  SubTitle,
  TextSmall,
} from "../components";
import Row from "../components/row";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProBayan = ({ navigation }) => {
  const { bayan } = useAuth();
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
          {bayan?.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(NavStr.BAYAN)}
              key={index}
            >
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
                    <AntDesign
                      name="clockcircleo"
                      size={16}
                      color={colors.primary}
                    />
                    <Title style={{ color: colors.primaryLight }}>
                      {" "}
                      {item?.date}
                    </Title>
                  </Row>
                </SubRow>
                <SubTitle style={{ paddingVertical: 5, paddingLeft: 10 }}>
                  {item?.description?.length > 100
                    ? item?.description?.slice(0, 100) + " ...See More"
                    : item?.description}
                </SubTitle>

                <HorizantalBar />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SubContainer>
    </>
  );
};

export default ProBayan;
