import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '../services/api';

interface Orphanages{
  id: number;
  name: string;
  wppNumber: string;
}

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanages, setOrphanages] = useState<Orphanages[]>();
  const navigation = useNavigation();

  useEffect(() => {
    api.get(`orphanages`).then(response => {
      setOrphanages(response.data);
    });
  }, []);

  if(!orphanages){
    return(
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    )
  }

  function handleNavigateToOrphanageDetails(id: number){
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleOpenWpp(wppNumber: string){
    Linking.openURL(`https://api.whatsapp.com/send?phone=${wppNumber}`);
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        {orphanages.map(orphanage => {
          return(
            <View style={styles.list}>
              <Text style={styles.content}>{orphanage.name}</Text>
            
              <RectButton style={styles.wppButton} onPress={() => handleOpenWpp(orphanage.wppNumber)}>
                <FontAwesome name="whatsapp" size={30} color="#FFF" />
              </RectButton>
              <RectButton style={styles.infoButton} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <FontAwesome name="info" size={30} color="#FFF" />
              </RectButton>
            </View>
          )
        })}
      </View>

        {/* <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  list:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  content: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',

    marginLeft: 10,
  },

  wppButton:{
    width: 46,
    height: 46,
    backgroundColor: '#3CDC8C',
    borderRadius: 15,

    marginRight: -40,

    justifyContent: 'center',
    alignItems: 'center',
  },

  infoButton:{
    width: 46,
    height: 46,
    backgroundColor: '#15c3d6',
    borderRadius: 15,

    marginRight: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FDF0F5',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})