import React from "react";
import { StyleSheet, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import colors from "../theme/Colors";

const DropDown = ({ category, setCategory }) => {
  const categories = [
    { key: "BN", value: "Bangla" },
    { key: "EN", value: "English" },
    { key: "FR", value: "French" },
    { key: "UR", value: "Urdu" },
    { key: "AR", value: "Arabic" },
  ];
  let defaultOption = categories.find((item) => item.key === category) || {
    key: "BN",
    value: "Bangla",
  };

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
      defaultOption={defaultOption}
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
