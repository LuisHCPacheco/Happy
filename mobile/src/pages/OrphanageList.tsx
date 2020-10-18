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

    marginLeft: 5,
    marginTop: 5,
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
  }
})