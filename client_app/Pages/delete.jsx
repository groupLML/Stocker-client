import { View, Text } from 'react-native'
import React from 'react'

export default function delete() {
      //chaining med strings properties to create unique med names  
  const uniqueMedNames = meds.map((med) => ({id:med.medId, uniqueName:`${med.genName}${med.eaQty}${med.unit}${med.given}`}));
  const options = uniqueMedNames;

  const selectedMed = uniqueMedNames.find((med) => med.uniqueName === option);

  return (
    <View>
      <Text>delete</Text>
    </View>
  )
}