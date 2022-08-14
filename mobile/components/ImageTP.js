//https://docs.expo.dev/versions/latest/sdk/imagepicker/
//https://www.youtube.com/watch?v=o-LR-rR5HAM
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ justifyContent: 'center'}}>
      <View style={{ marginBottom: 10}}>
      <Button title="Choisir une image " onPress={pickImage} />
      </View>
      {image && 
      <View style={{  alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
        <Image source={{ uri: image }} style={{ width: 270, height: 200, alignItems: 'center', justifyContent: 'center'}} />
      </View>}
      </View>
  );
}
