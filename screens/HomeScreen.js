import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  selectRooms,
  selectRoomsStatus,
  selectRoomsError,
} from "../store/roomsSlice";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const roomsStatus = useSelector(selectRoomsStatus);
  const error = useSelector(selectRoomsError);

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
    console.log("rooms", rooms);
  }, [roomsStatus, dispatch]);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() =>
        navigation.navigate("RoomDetailScreen", { roomId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <Text style={styles.roomLocation}>{item.location}</Text>
        <Text style={styles.roomPrice}>${item.pricePerNight}/đêm</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Đặt phòng" />
      <View style={styles.container}>
        {roomsStatus === "loading" && <Text>Đang tải...</Text>}
        {roomsStatus === "failed" && <Text>Lỗi: {error}</Text>}
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  list: {
    paddingBottom: 16,
  },
  roomItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    overflow: "hidden",
  },
  roomImage: {
    width: "100%",
    height: 200,
  },
  roomInfo: {
    padding: 16,
  },
  roomLocation: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomPrice: {
    fontSize: 16,
    color: "#3498db",
  },
  roomDescription: {
    fontSize: 14,
    color: "#666",
  },
});
