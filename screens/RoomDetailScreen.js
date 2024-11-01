import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectRooms } from "../store/roomsSlice";
import MapView, { Marker } from "react-native-maps";
import { bookRoom } from "../store/bookingsSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

const RoomDetailScreen = ({ route }) => {
  const { roomId } = route.params;
  const rooms = useSelector(selectRooms);
  const room = rooms.find((r) => r.id === roomId);
  const dispatch = useDispatch();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  if (!room) {
    return <Text>Không tìm thấy phòng</Text>;
  }

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert("Vui lòng nhập ngày nhận và trả phòng.");
      return;
    }

    const bookingData = {
      roomId: room.id,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      totalPrice:
        (room.pricePerNight * (checkOutDate - checkInDate)) /
        (1000 * 60 * 60 * 24),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    dispatch(bookRoom(bookingData));
    Alert.alert("Đặt phòng thành công!", "Bạn đã đặt phòng thành công.");
  };

  const onCheckInChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckInPicker(false);
    setCheckInDate(currentDate);
  };

  const onCheckOutChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOutPicker(false);
    setCheckOutDate(currentDate);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: room.image }} style={styles.roomImage} />
      <Text style={styles.roomTitle}>{room.name}</Text>
      <Text style={styles.roomLocation}>{room.location}</Text>
      <Text style={styles.roomPrice}>{room.pricePerNight} VNĐ/đêm</Text>
      <Text style={styles.roomDescription}>{room.description}</Text>

      <View style={styles.divider} />

      <Text style={styles.amenitiesTitle}>Tiện nghi:</Text>
      {room.amenities.map((amenity, index) => (
        <Text key={index} style={styles.amenity}>
          • {amenity}
        </Text>
      ))}

      <View style={styles.divider} />

      <Text style={styles.amenitiesTitle}>Bản đồ:</Text>
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

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowCheckInPicker(true)}
      >
        <Text>{checkInDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showCheckInPicker && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display="default"
          onChange={onCheckInChange}
        />
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowCheckOutPicker(true)}
      >
        <Text>{checkOutDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOutDate}
          mode="date"
          display="default"
          onChange={onCheckOutChange}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Đặt phòng</Text>
      </TouchableOpacity>
      <View style={{ paddingBottom: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  roomImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
  roomLocation: {
    fontSize: 18,
    color: "#888",
    marginBottom: 4,
  },
  roomPrice: {
    fontSize: 22,
    color: "#e67e22",
    marginVertical: 8,
  },
  roomDescription: {
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  amenitiesTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  amenity: {
    fontSize: 16,
    color: "#444",
    marginVertical: 2,
  },
  map: {
    height: 250,
    marginVertical: 16,
    borderRadius: 12,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
});

export default RoomDetailScreen;
