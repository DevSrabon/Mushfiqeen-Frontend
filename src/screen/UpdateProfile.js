import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import colors from "../theme/Colors";
import InputField from "../components/inpuField";
import CustomButton from "../components/customButton";

const UpdateProfile = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(`https://i.ibb.co/PzWs7jW/user.jpg`);
    // const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
    const [name, setName] = useState("Mahbub Morshed");
    const [email, setEmail] = useState("tester@gmail.com");
    const [district, setDistrict] = useState("Dhaka");
    const [country, setCountry] = useState("Bangladesh");
    const [bio, setBio] = useState("");
    const [occupation, setOccupation] = useState("Teacher");

    const [mobile, setMobile] = useState("1234567890");
    const handleInputChange = (value) => {
        const cleanedValue = value.replace(/[^0-9]/g, "");
        setMobile(cleanedValue);
      };

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
    const [startedDate, setStartedDate] = useState("12/12/2023");


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
                            onSelectedChange={(date) => setSelectedStartDate(date)}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
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


    const handleSaveChanges = () => {
        // Perform actions with the form data, e.g., send it to a server
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("District:", district);
        console.log("Country:", country);
        console.log("Bio:", bio);
        console.log("Occupation:", occupation);
        console.log("Mobile:", mobile);
        console.log("openStartDatePicker:", openStartDatePicker);
        console.log("selectedStartDate:", selectedStartDate);
        console.log("startedDate:", startedDate);
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
                <Text>Update Profile</Text>
            </View>

            <View>
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 22,
                    }}
                >
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={{ uri: selectedImage }}
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
                            <MaterialIcons
                                name="photo-camera"
                                size={32}
                                color={colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <View>
                        <InputField
                            placeholder="Name"
                            value={name}
                            setValue={setName}
                        />
                    </View>

                    <View>
                        <InputField
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View>
                        <InputField
                            placeholder="Mobile"
                            value={mobile}
                            setValue={handleInputChange}
                            type="number"
                        />
                    </View>
                    <View>
                        <InputField
                            placeholder="Occupation"
                            value={occupation}
                            setValue={setOccupation}
                            
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                    </View>
                </View>
                <View>
                    <InputField
                        placeholder="District"
                        value={district}
                        setValue={setDistrict}
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
                        <Text style={{ color: "white" }}>{selectedStartDate}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <InputField
                        placeholder="Date of Birth"
                        onPress={handleOnPressStartDate}
                        value={selectedStartDate}
                        setValue={setSelectedStartDate}
                    />
                </View>
                <View

                >
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
