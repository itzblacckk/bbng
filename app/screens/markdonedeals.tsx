import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const DoneDeals = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [chapter, setChapter] = useState('');
  const [member, setMember] = useState('');

  const onChangeFromDate = (event: any, selectedDate?: Date) => {
    setShowFromDatePicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onChangeToDate = (event: any, selectedDate?: Date) => {
    setShowToDatePicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const deals = [
    { no: 1, date: '26-Sep-23', chapter: 'Kalyan', from: 'Milind Navathe', amount: '₹ 500.00' },
    { no: 2, date: '10-Sep-23', chapter: 'Kalyan', from: 'Nayana Vaze (SARA eats n crafts)', amount: '₹ 550.00' },
    { no: 3, date: '9-Sep-23', chapter: 'Kalyan', from: 'Neha Karve', amount: '₹ 400.00' },
    { no: 4, date: '29-Aug-23', chapter: 'Kalyan', from: 'Vasudha', amount: '₹ 5000.00' },
    { no: 5, date: '25-Aug-23', chapter: 'Kalyan', from: 'Milind Navathe', amount: '₹ 500.00' },
    { no: 6, date: '22-Aug-23', chapter: 'Kalyan', from: 'Deepak Joshi', amount: '₹ 1200.00' },
    { no: 7, date: '15-Jul-23', chapter: 'Kalyan', from: 'Milind Navathe', amount: '₹ 500.00' },
    { no: 8, date: '29-Jun-23', chapter: 'Kalyan', from: 'Nachiket Karanne', amount: '₹ 128.00' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Done Deals</Text>
      <View style={styles.filters}>
        <View style={styles.filter}>
          <Text style={styles.label}>From Date</Text>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={fromDate.toLocaleDateString()}
              editable={false}
              placeholderTextColor="#999"
            />
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={onChangeFromDate}
            />
          )}
        </View>
        <View style={styles.filter}>
          <Text style={styles.label}>To Date</Text>
          <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={toDate.toLocaleDateString()}
              editable={false}
              placeholderTextColor="#999"
            />
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={onChangeToDate}
            />
          )}
        </View>
        <View style={styles.filter}>
          <Text style={styles.label}>Chapter</Text>
          <RNPickerSelect
            onValueChange={(value) => setChapter(value || '')}
            value={chapter}
            items={[
              { label: 'Select Chapter', value: '' },
              { label: 'Kalyan', value: 'Kalyan' },
              // Add more chapters as needed
            ]}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.filter}>
          <Text style={styles.label}>Member</Text>
          <RNPickerSelect
            onValueChange={(value) => setMember(value || '')}
            value={member}
            items={[
              { label: 'Select Member', value: '' },
              { label: 'Milind Navathe', value: 'Milind Navathe' },
              // Add more members as needed
            ]}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.clearButton]}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.searchButton]}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.no.toString()}
        renderItem={({ item }) => (
          <View style={styles.dealRow}>
            <Text style={styles.dealCell}>{item.no}</Text>
            <Text style={styles.dealCell}>{item.date}</Text>
            <Text style={styles.dealCell}>{item.chapter}</Text>
            <Text style={styles.dealCell}>{item.from}</Text>
            <Text style={styles.dealCell}>{item.amount}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.footerText}>1-8 of 8</Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  filter: {
    width: width * 0.45,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    height: 40,
    backgroundColor: '#fff',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  clearButton: {
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dealRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  dealCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerButtons: {
    flexDirection: 'row',
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginLeft: 8,
  },
  footerButtonText: {
    color: '#333',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
};

export default DoneDeals;
