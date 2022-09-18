//https://docs.expo.dev/versions/latest/sdk/imagepicker/
//https://www.youtube.com/watch?v=o-LR-rR5HAM
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
const SERVER_URL = "http://192.168.1.5:7000";

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    let result = ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      },
      (response) => {
        console.log(response);
        if (!result.cancelled) {
          setPhoto(result);
        }
        // console.log(response);
      }
    );
  };

  console.log(photo);
  const handleUploadPhoto = () => {
    axios
      .post(
        `${SERVER_URL}/api/upload`,
        createFormData(photo, { userId: "123" })
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);

        console.log(error.toJSON());
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };
  console.log(photo);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={pickImage} />
    </View>
  );
}
//   return (
//     <View style={{ justifyContent: "center" }}>
//       <View style={{ marginBottom: 10 }}>
//         <Button title="Choisir une image " onPress={pickImage} />
//       </View>
//       {image && (
//         <View
//           style={{
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: 10,
//           }}
//         >
//           <Image
//             source={{ uri: image }}
//             style={{
//               width: 270,
//               height: 200,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           />
//         </View>
//       )}
//     </View>
//   );
// }
