import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import 'nativewind';

export default function AnimatedNavOne({ focused, name }: any) {

  const Focused: any = [
    {
      backgroundColor: '#fff',
      width: 50,
      height: 50,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#5bc0de',
      position: 'relative',
      top: -20,
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    {
      fgcolor: '#5bc0de',
    },
  ]

  const UnFocused: any = [
    {
      width: 55,
      height: 50,
      // borderRadius: 10,
      // borderWidth: 2,
      borderColor: '#fff',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    {
      fgcolor: '#fff',
    },
  ];

  return (
    <View
      style={focused ? Focused : UnFocused[0]} className="">
      <FontAwesome name={name} color={ focused ? Focused[1].fgcolor : UnFocused[1].fgcolor} size={30} style={{ marginBottom: 5 }} />
    </View>
  );
}
