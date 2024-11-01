import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, cancelBooking } from "../store/bookingsSlice";
import {
  selectBookings,
  selectBookingsStatus,
  selectBookingsError,
} from "../store/bookingsSlice";

const BookingScreen = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  const bookingsStatus = useSelector(selectBookingsStatus);
  const error = useSelector(selectBookingsError);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
    }
  }, [bookingsStatus, dispatch]);

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "Xác nhận hủy đặt phòng",
      "Bạn có chắc chắn muốn hủy đặt phòng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => dispatch(cancelBooking(bookingId)),
        },
      ]
    );
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.roomTitle}>Phòng: {item.roomId}</Text>
      <Text style={styles.bookingDate}>Ngày nhận: {item.checkInDate}</Text>
      <Text style={styles.bookingDate}>Ngày trả: {item.checkOutDate}</Text>
      <Text style={styles.bookingPrice}>Tổng giá: {item.totalPrice} VNĐ</Text>
      <Text style={styles.bookingStatus}>Trạng thái: {item.status}</Text>
      <Button
        title="Hủy đặt phòng"
        onPress={() => handleCancelBooking(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {bookingsStatus === "loading" && <Text>Đang tải...</Text>}
      {bookingsStatus === "failed" && <Text>Lỗi: {error}</Text>}
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  bookingItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDate: {
    fontSize: 16,
    marginVertical: 4,
  },
  bookingPrice: {
    fontSize: 16,
    color: "#3498db",
  },
  bookingStatus: {
    fontSize: 16,
    color: "#666",
  },
  list: {
    paddingBottom: 16,
  },
});

export default BookingScreen;
