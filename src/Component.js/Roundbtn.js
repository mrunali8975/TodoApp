import { View, Text } from 'react-native'
import React from 'react'
import css from '../styles/Styles'
import { IconButton } from 'react-native-paper'
import { ICON_SIZE } from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputIcon'
const Roundbtn = ({icon_name,icon_size,icon_color,style,onPress}) => {
  return (
   
   <IconButton
   icon={icon_name}
   size={icon_size}
   color={icon_color}
   style={[css.icon,{...style}]}
   onPress={onPress}
   />

  )
}

export default Roundbtn