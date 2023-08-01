import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import { Title } from "../components";
import CustomButton from "../components/customButton";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const UpdateProfile = ({ navigation }) => {
  const { userData } = useAuth();
  const [selectedImage, setSelectedImage] = useState(
    `https://i.ibb.co/PzWs7jW/user.jpg`
  );
  // const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState(userData?.data?.fullName);
  const [email, setEmail] = useState(userData?.data?.email);
  const [address, setAddress] = useState("Dhaka");
  const [country, setCountry] = useState("Bangladesh");
  const [bio, setBio] = useState("");
  const [designation, setDesignation] = useState(userData?.data?.designation);
  const [contactNumber, setContactNumber] = useState("1234567890");

  const navigations = useNavigation();

  const handleInputChange = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    setContactNumber(cleanedValue);
  };

  // const handleImageSelection = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.All,
  //         allowsEditing: true,
  //         aspect: [4, 4],
  //         quality: 1,
  //     });

  //     console.log(result);

  //     if (!result.canceled) {
  //         setSelectedImage(result.assets[0].uri);
  //     }
  // };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState("");
  const dateOfBirth = new Date(selectDate);
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
    try {
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
        navigations.navigate("home");
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Title style={{ color: "white", fontWeight: "500" }}>
          Update Profile
        </Title>
      </View>

      <View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
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
            placeholder="District"
            value={address}
            setValue={setAddress}
          />
        </View>
        <View>
          <InputField
            placeholder="Country"
            value={country}
            setValue={setCountry}
          />
        </View>

        {/* Date of Birth */}
        <View>
          <CustomButton
            style={{ alignItems: "left" }}
            bgColor={colors.lightGray}
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

        <View style={{ flex: 1, width: "100%" }}>
          <CustomButton
            text="Save Change"
            // loading={loading}
            // disabled={loading}
            onPress={handleSaveChanges}
            type="primary"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
