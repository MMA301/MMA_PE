import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { selectRooms } from "../store/roomsSlice";
import MapView, { Marker } from "react-native-maps";

const RoomDetailScreen = ({ route }) => {
  const { roomId } = route.params;
  const rooms = useSelector(selectRooms);
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return <Text>Không tìm thấy phòng</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: room.image }} style={styles.roomImage} />
      <Text style={styles.roomTitle}>{room.name}</Text>
      <Text style={styles.roomLocation}>{room.location}</Text>
      <Text style={styles.roomPrice}>${room.pricePerNight}/đêm</Text>
      <Text style={styles.roomDescription}>{room.description}</Text>

      <Text style={styles.amenitiesTitle}>Tiện nghi:</Text>
      {room.amenities.map((amenity, index) => (
        <Text key={index} style={styles.amenity}>
          {amenity}
        </Text>
      ))}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(room.coordinates.latitude),
          longitude: parseFloat(room.coordinates.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(room.coordinates.latitude),
            longitude: parseFloat(room.coordinates.longitude),
          }}
          title={room.name}
          description={room.location}
        />
      </MapView>

      <Button
        style={styles.bookButton}
        title="Đặt phòng"
        onPress={() => alert("Chức năng đặt phòng sẽ được triển khai ở đây!")}
      />
      <View style={{ paddingBottom: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  roomLocation: {
    fontSize: 18,
    color: "#888",
  },
  roomPrice: {
    fontSize: 20,
    color: "#3498db",
    marginVertical: 8,
  },
  roomDescription: {
    fontSize: 16,
    marginVertical: 8,
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  amenity: {
    fontSize: 16,
    marginVertical: 4,
  },
  map: {
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
  },
  bookButton: {
    fontSize: 20,
    color: "#3498db",
    marginVertical: 16,
    paddingBottom: 50,
  },
});

export default RoomDetailScreen;
