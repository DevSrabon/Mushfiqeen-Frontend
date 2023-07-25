import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import colors from "../theme/Colors";

const DropDown = () => {
  const [category, setCategory] = useState();

  const categories = [
    { key: "BAN", value: "Bangla" },
    { key: "ENG", value: "English" },
    { key: "FRN", value: "French" },
    { key: "URD", value: "Urdu" },
    { key: "ARB", value: "Arabic" },
  ];

  return (
    <SelectList
      search={false}
      arrowicon={<Text style={{ color: colors.white }}>Language</Text>}
      inputStyles={{ color: colors.white }}
      dropdownTextStyles={{ color: colors.white }}
      dropdownStyles={styles.dropdownStyles}
      boxStyles={styles.boxStyles}
      setSelected={setCategory}
      data={categories}
      placeholder="Select Your Role"
      defaultOption={{ key: "BAN", value: "Bangla" }}
    />
  );
};
const styles = StyleSheet.create({
  dropdownStyles: {
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 8,
    width: "92%",
    alignSelf: "center",
  },
  boxStyles: {
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 8,
    width: "92%",
    alignSelf: "center",
    marginTop: 10,
  },
  input: {
    paddingVertical: 5,
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 10,
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 8,
    width: "50%",
  },
});
export default DropDown;
