import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {EvilIcons} from '@expo/vector-icons'; // Assuming you have this imported
import { useRouter } from 'expo-router';
interface Props {
  toggleSidebar: () => void;
  openExternalLink: (url: string) => void;
  sidebarAnim: Animated.Value;
  showDropdown: boolean;
  toggleDropdown: () => void;
  router: {
    navigate: (route: string) => void;
  };
}

const Widget: React.FC<Props> = ({ toggleSidebar, openExternalLink, sidebarAnim, showDropdown, toggleDropdown}) => {
  const [date, setDate] = useState('2024-10-07');
  const [noOfReferences, setNoOfReferences] = useState('1');
  const router = useRouter();
  const [chapter, setChapter] = useState('');
  const [member, setMember] = useState('');
  const [urgency, setUrgency] = useState('--');
  const [nameOfReferral, setNameOfReferral] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [email, setEmail] = useState('');
  const [remarks, setRemarks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [location, setLocation] = useState('--');
  const [pincode, setPincode] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
      position:'relative',
      top:25,
    },
    card: {
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    iconButton: {
      padding: 8,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 250,
      backgroundColor: '#5bc0de',
      zIndex: 100,
    },
    sidebarImage: {
      width: '100%',
      height: 150,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    sidebarItem: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      padding: 10,
    },
    closeButton: {
      alignItems: 'flex-end',
      padding: 8,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    dropdown: {
      marginLeft: 10,
    },
    dropdownToggle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownItem: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    destructiveText: {
      color: 'red',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 20,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: 'grey',
    },
    saveButton: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 4,
    },
    borderBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    subHeader: {
      fontSize: 18,
      marginBottom: 12,
      fontWeight: 'bold',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingTop: 16,
      marginTop: 16,
    },
    inputContainerFull: {
      width: '100%',
      marginBottom: 16,
    },
    destructive: {
      color: 'red',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/(tabs)/home')}  style={styles.iconButton}>
          <EvilIcons name="close" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openExternalLink('https://github.com/itzblacckk')}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/profile.jpg')} 
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.header}>Reference</Text>
          <View style={styles.borderBox}>
            <Text style={styles.subHeader}>Reference Details</Text>
            <View style={styles.grid}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date <Text style={styles.destructive}>*</Text></Text>
                <TextInput style={styles.input} value={date} onChangeText={setDate} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>No Of References</Text>
                <TextInput style={styles.input} value={noOfReferences} onChangeText={setNoOfReferences} keyboardType="numeric" />
              </View>
            </View>
            <View style={styles.borderTop}>
              <Text style={styles.subHeader}>Referral Details 1</Text>
              <View style={styles.grid}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Chapter <Text style={styles.destructive}>*</Text></Text>
                  <TextInput style={styles.input} value={chapter} onChangeText={setChapter} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Member <Text style={styles.destructive}>*</Text></Text>
                  <TextInput style={styles.input} value={member} onChangeText={setMember} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Urgency</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setUrgency(value)}
                    items={[{ label: '--', value: '--' }]}
                    value={urgency}
                    style={pickerSelectStyles}
                  />
                </View>
                <View style={styles.inputContainerFull}>
                  <Text style={styles.label}>Name of Referral <Text style={styles.destructive}>*</Text></Text>
                  <TextInput style={styles.input} value={nameOfReferral} onChangeText={setNameOfReferral} />
                </View>
              </View>
              <View style={styles.grid}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mobile 1 <Text style={styles.destructive}>*</Text></Text>
                  <TextInput style={styles.input} value={mobile1} onChangeText={setMobile1} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mobile 2</Text>
                  <TextInput style={styles.input} value={mobile2} onChangeText={setMobile2} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View style={styles.inputContainerFull}>
                  <Text style={styles.label}>Remarks</Text>
                  <TextInput style={styles.input} value={remarks} onChangeText={setRemarks} multiline />
                </View>
                <View style={styles.inputContainerFull}>
                  <Text style={styles.label}>Address Line 1</Text>
                  <TextInput style={styles.input} value={addressLine1} onChangeText={setAddressLine1} />
                </View>
                <View style={styles.inputContainerFull}>
                  <Text style={styles.label}>Address Line 2</Text>
                  <TextInput style={styles.input} value={addressLine2} onChangeText={setAddressLine2} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Location</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setLocation(value)}
                    items={[{ label: '--', value: '--' }]}
                    value={location}
                    style={pickerSelectStyles}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Pincode</Text>
                  <TextInput style={styles.input} value={pincode} onChangeText={setPincode} keyboardType="numeric" />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
     
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30,
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30,
    marginBottom: 16,
  },
});

export default Widget;
