import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listFiles, uploadToFirebase } from "../firebase/firebaseConfig";

const useImagePicker = () => {
  const [files, setFiles] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });

      setFiles(files);
    });
  }, []);

  const takePhoto = async () => {
    setLoading(true);
    try {
      const cameraResp = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log(v)
        );

        listFiles().then((listResp) => {
          const files = listResp.map((value) => {
            return { name: value.fullPath };
          });
          setImageURL((prevUrls) => [...prevUrls, uploadResp.downloadUrl]);
          setFiles(files);
        });
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return { files, imageURL, loading, takePhoto };
};

export default useImagePicker;
