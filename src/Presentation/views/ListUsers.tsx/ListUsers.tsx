import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { styles } from './styles';
import useViewModel from './ViewModel';
import { User } from '../../../Domain/entities/User'; // Asegúrate de que la ruta es correcta

const ListUsers = () => {
  const { users, loading, error } = useViewModel();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderUserItem = ({ item }: { item: User }) => {
    console.log('Rendering user:', item); // Agregado para depuración
    return (
      <View style={styles.userItem} key={item.id_user}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.full_name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Menu>
          <MenuTrigger>
            <Text style={styles.menuTrigger}>•••</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Edit ${item.full_name}`)} text="Edit" />
            <MenuOption onSelect={() => alert(`Delete ${item.full_name}`)} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Users</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id_user?.toString() || ''}
      />
    </View>
  );
};

export default ListUsers;
