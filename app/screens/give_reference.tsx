import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import {EvilIcons} from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

const MyComponent: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const router = useRouter();

  return (
    
    <View style={styles.container}>
         <View style={styles.header2}>
        <TouchableOpacity onPress={() => router.navigate('/(tabs)/home')}  style={styles.iconButton}>
          <EvilIcons name="close" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/profile.jpg')} 
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.messageContainer, styles.destructiveBg]}>
        <Text style={styles.destructiveText}>No Records Found!</Text>
        <TouchableOpacity>
          <Text style={styles.closeButton}>&times;</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.cardContainer, styles.cardBg]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reference</Text>
          <View style={styles.buttonGroup}>
            <Button title="🔍 Search" color="#6200EE" onPress={() => {}} />
            <Button title="➕ Add" color="#B00020" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
              <Text>{fromDate ? fromDate.toDateString() : 'Select Date'}</Text>
              <Image
                source={{ uri: 'https://openui.fly.dev/openui/24x24.svg?text=📅' }}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowFromDatePicker(false);
                  if (date) setFromDate(date);
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
              <Text>{toDate ? toDate.toDateString() : 'Select Date'}</Text>
              <Image
                source={{ uri: 'https://openui.fly.dev/openui/24x24.svg?text=📅' }}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
            {showToDatePicker && (
              <DateTimePicker
                value={toDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowToDatePicker(false);
                  if (date) setToDate(date);
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Member</Text>
            <Picker
              selectedValue={selectedMember}
              onValueChange={(itemValue) => setSelectedMember(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Member" value="" />
              {/* Add Picker.Item components here for each member */}
            </Picker>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Button title="Clear" color="#03DAC6" onPress={() => {}} />
          <Button title="Search" color="#6200EE" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.references}>
        <Text style={styles.referencesHeader}>References Given</Text>
        <View style={[styles.referencesCard, styles.mutedBg]}>
          <Text>0-0 of 0</Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Previous" color="#03DAC6" onPress={() => {}} />
          <Button title="Next" color="#03DAC6" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  messageContainer: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destructiveBg: {
    backgroundColor: '#B00020',
  },
  destructiveText: {
    color: '#FFFFFF',
  },
  closeButton: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  header2: {
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
  cardContainer: {
    padding: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardBg: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
  },
  references: {
    marginTop: 32,
  },
  referencesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  referencesCard: {
    padding: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mutedBg: {
    backgroundColor: '#E0E0E0',
  },
});

export default MyComponent;
