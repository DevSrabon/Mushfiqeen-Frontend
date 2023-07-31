import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
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

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date().toLocaleDateString()
  );

  const [startedDate, setStartedDate] = useState(
    new Date().toLocaleDateString()
  );

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              // margin: 20,
              backgroundColor: colors.bg,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 10,
              width: "90%",
              shadowColor: "#000",
              color: colors.lightBg,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setDateOfBirth(date)}
              options={{
                backgroundColor: "#090C08",
                textHeaderColor: "#FFA25B",
                textDefaultColor: "#F6E7C1",
                selectedTextColor: "#fff",
                mainColor: "#F4722B",
                textSecondaryColor: "#D6C7A1",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ color: colors.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
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
        `https://musfiqeen-backend.vercel.app//api/v1/users/update-user/${userData?.data?._id}`,
        body
      );
      if (res.status === 200) {
        navigations.navigate("home");
      }
    } catch (error) {
      console.log(error.response.data.message);
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
        <Text style={{ color: "white", fontWeight: "500" }}>
          Update Profile
        </Text>
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
                height: 170,
                width: 170,
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

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "white" }}>Date or Birth</Text>
          <TouchableOpacity
            onPress={handleOnPressStartDate}
            style={{
              height: 44,
              width: "90%",
              borderColor: colors.white,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <Text style={{ color: "white" }}>{dateOfBirth}</Text>
          </TouchableOpacity>
        </View>

        {/* <View>
                    <InputField
                        placeholder="Date of Birth"
                        onPress={handleOnPressStartDate}
                        value={selectedStartDate}
                        setValue={setSelectedStartDate}
                    />
                </View> */}
        <View>
          <InputField
            placeholder="About Yourself"
            value={bio}
            setValue={setBio}
            multiline={true}
            numberOfLines={10}
          />
        </View>

        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Save Change"
            // loading={loading}
            // disabled={loading}
            onPress={handleSaveChanges}
            type="primary"
          />
        </View>
        {renderDatePicker()}
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
