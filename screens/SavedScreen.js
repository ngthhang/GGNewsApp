import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text>Saved Screen</Text>
    </View>
  );
}

SavedScreen.navigationOptions = {
  title: 'Saved Post',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});
