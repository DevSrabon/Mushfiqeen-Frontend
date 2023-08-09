import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavStr from "../Nav/NavStr";
import { Loading, Row, SubContainer } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const UpdateProfile = ({ navigation }) => {
  const router = useRoute();
  const { setRefetch } = router?.params;

  const { userData, fetchUserData } = useAuth();
  const [selectedImage, setSelectedImage] = useState(
    `https://i.ibb.co/PzWs7jW/user.jpg`
  );
  // const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState(userData?.data?.fullName);
  const [email, setEmail] = useState(userData?.data?.email);
  const [address, setAddress] = useState(userData?.data?.address || "Dhaka");

  const [country, setCountry] = useState(
    userData?.data?.country || "Bangladesh"
  );
  const [bio, setBio] = useState(userData?.data?.bio || "");
  const [designation, setDesignation] = useState(
    userData?.data?.designation || ""
  );
  const [contactNumber, setContactNumber] = useState(
    userData?.data?.contactNumber || "1234567890"
  );

  const navigations = useNavigation();

  const handleInputChange = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    setContactNumber(cleanedValue);
  };
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState("");
  const dateOfBirth = selectDate;

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fullDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setSelectDate(fullDate);
  };

  const showDateMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      setRefetch((prev) => !prev);
      const body = {
        name,
        email,
        address,
        country,
        bio,
        designation,
        contactNumber,
        dateOfBirth,
      };
      const res = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/users/update-user/${userData?.data?._id}`,
        body
      );
      if (res.status === 200) {
        await fetchUserData();
        navigations.navigate(NavStr.PROFILE);
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
      setRefetch((prev) => !prev);
    }
  };
  if (loading) return <Loading />;
  return (
    <SubContainer>
      <Row style={{ marginTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(NavStr.PROFILE)}
        />

        <Header>Update</Header>
      </Row>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View
            style={{
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity>
              <Image
                source={{ uri: userData?.data?.imageURL || selectedImage }}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: colors.primary,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                {/* <MaterialIcons
                name="photo-camera"
                size={32}
                color={colors.primary}
              /> */}
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View>
              <InputField placeholder="Name" value={name} setValue={setName} />
            </View>

            <View>
              <InputField
                placeholder="Email"
                value={email}
                setValue={setEmail}
                editable={false}
                keyboardType="email-address"
              />
            </View>
            <View>
              <InputField
                placeholder="Mobile"
                value={contactNumber}
                setValue={handleInputChange}
                type="number"
              />
            </View>
            <View>
              <InputField
                placeholder="Occupation"
                value={designation}
                setValue={setDesignation}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            ></View>
          </View>

          <View>
            <InputField
              placeholder="About Yourself"
              value={bio}
              setValue={setBio}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <GooglePlacesAutocomplete
            placeholder="Your Address"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setAddress(data.description);
            }}
            query={{
              key: "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM",
              language: "en",
            }}
            textInputProps={{
              placeholderTextColor: colors.white,
              returnKeyType: "search",
            }}
            styles={{
              textInputContainer: {
                width: "90%",
                alignSelf: "center",
                marginTop: 10,
              },
              textInput: {
                backgroundColor: colors.lightBg,
                color: colors.white,
              },
            }}
          />

          {/* Date of Birth */}

          <CustomButton
            style={{ alignSelf: "center", marginTop: 20 }}
            bgColor={colors.lightBg}
            text={selectDate ? selectDate : `Date of Birth `}
            onPress={() => showDateMode("date")}
          />
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="spinner"
              onChange={onDateChange}
            />
          )}

          <CustomButton
            style={{ alignSelf: "center", marginTop: 30 }}
            text="Save Change"
            // loading={loading}
            // disabled={loading}
            onPress={handleSaveChanges}
            type="primary"
          />
        </View>
      </ScrollView>
    </SubContainer>
  );
};

export default UpdateProfile;
