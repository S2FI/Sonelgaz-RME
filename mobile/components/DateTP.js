
import { Platform, StyleSheet, Button, Text, View } from 'react-native';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateTP() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('');
  const [textTime, setTextTime] = useState('');

  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || 'date';
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let ftime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setTextDate(fDate);
    setTextTime(ftime);


    console.log(fDate + '\n' + ftime);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }


  return (
    <View>
    <View style={{margintop: 10}}>
    <Button title='Choisir une date' onPress={() => showMode('date')}/>
    <Text style={{fontWeight: 'bold', fontSize: 16}}>{textDate}</Text>
   </View>
   <View style={{marginBottom: 0}}>
    <Button title='Choisir heure' onPress={() => showMode('time')}/>
    <Text style={{fontWeight: 'bold', fontSize: 16}}>{textTime}</Text>
   </View>
   

   { show && (
    <DateTimePicker
    testID='Choisir une date'
    value={date}
    mode={mode}
    is24Hour={true}
    display='default'
    onChange={onChange}
    />
   )}
   </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
