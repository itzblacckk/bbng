import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Button, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

interface ReferenceData {
  to_whom: string;
  name_of_referral: string;
  date: string;
  status: string;
  address_line_1: string;
  email: string;
}

interface ReferenceTrack {
  comment: string;
}

interface Reference {
  Reference: ReferenceData;
  ReferenceTrack: ReferenceTrack[];
}

const MyComponent: React.FC = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [filteredReferences, setFilteredReferences] = useState<Reference[]>([]);
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [member, setMember] = useState<string>('');
  const router = useRouter();
  const [message, setMessage] = useState('');
  const username = 'amar@sanmisha.com';
  const password = 'amar123@';

  const fetchReferences = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      const authString = btoa(`${username}:${password}`);
      myHeaders.append('Authorization', `Basic ${authString}`);

      const response = await fetch(`https://bbmoapp.bbnglobal.net/api/references`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage('It Worked!!!');
        setReferences(data.references);
        setFilteredReferences(data.references);
      } else {
        setMessage('It did not Work!!!');
        setReferences([]);
        setFilteredReferences([]);
      }
    } catch (e: any) {
      console.error('JSON parse error', e);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = () => {
    const filtered = references.filter((ref) => {
      const matchesReference = reference ? ref.Reference.to_whom.toLowerCase().includes(reference.toLowerCase()) : true;
      const matchesDate = date ? new Date(ref.Reference.date).toDateString() === date.toDateString() : true;
      const matchesTitle = title ? ref.Reference.name_of_referral.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesMember = member ? ref.Reference.status.toLowerCase().includes(member.toLowerCase()) : true;
      return matchesReference && matchesDate && matchesTitle && matchesMember;
    });
    setFilteredReferences(filtered);
  };

  const handleClear = () => {
    setReference('');
    setDate(undefined);
    setTitle('');
    setMember('');
    setFilteredReferences(references);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/(tabs)/home')} style={styles.iconButton}>
          <EvilIcons name="close" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.profileImage} source={require('../../assets/images/profile.jpg')} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Reference"
            value={reference}
            onChangeText={setReference}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={styles.dateText}>{date ? date.toDateString() : 'Date'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Member"
            value={member}
            onChangeText={setMember}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => router.navigate('/screens/givenewreference')}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          {filteredReferences.map((reference, index) => (
            <View key={index} style={styles.referenceCard}>
              <Text style={styles.referenceTo}>To: {reference.Reference.to_whom}</Text>
              <View>
                <Text style={styles.referralName}>Referral Name: {reference.Reference.name_of_referral}</Text>
                <View style={styles.referenceDetails}>
                  <Text style={styles.referenceDate}>{reference.Reference.date}</Text>
                  <Text style={[styles.referenceStatus, reference.Reference.status === 'Business Done' ? styles.businessDone : styles.businessPending]}>
                    {reference.Reference.status}
                  </Text>
                </View>
                {reference.ReferenceTrack[0].comment !== '' && (
                  <Text style={styles.referenceComment}>
                    "{reference.ReferenceTrack[0].comment}"
                  </Text>
                )}
                <Text style={styles.referenceAddress}>{reference.Reference.address_line_1}</Text>
                <View style={styles.referenceEmailContainer}>
                  <FontAwesome name="paper-plane-o" size={20} color="gray" />
                  <Text style={styles.referenceEmail}>{reference.Reference.email}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addTestimonialButton}>
                  <Text style={styles.buttonText}>Add Testimonial</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
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
  searchContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 24,
  },
  inputGroup: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 8,
    margin: 4,
    width: '100%',
  },
  dateText: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
  addButton: {
    backgroundColor: '#FF4500',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginLeft: 4,
  },
  clearButton: {
    backgroundColor: '#B0B0B0',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 4,
  },
  scrollView: {
    width: '100%',
  },
  referenceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 16,
  },
  referenceTo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  referralName: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 4,
  },
  referenceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  referenceDate: {
    backgroundColor: '#008080',
    color: '#FFF',
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  referenceStatus: {
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 4,
  },
  businessDone: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
  },
  businessPending: {
    backgroundColor: '#9E9E9E',
    color: '#FFF',
  },
  referenceComment: {
    fontSize: 16,
    color: '#000',
    marginVertical: 8,
  },
  referenceAddress: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  referenceEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  referenceEmail: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginRight: 4,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  addTestimonialButton: {
    backgroundColor: '#008080',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default MyComponent;




