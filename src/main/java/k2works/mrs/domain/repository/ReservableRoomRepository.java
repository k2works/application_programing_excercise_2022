package k2works.mrs.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import k2works.mrs.domain.model.ReservableRoom;
import k2works.mrs.domain.model.ReservableRoomId;

import java.time.LocalDate;
import java.util.List;

public interface ReservableRoomRepository extends JpaRepository<ReservableRoom, ReservableRoomId> {
	List<ReservableRoom> findByReservableRoomId_ReservedDateOrderByReservableRoomId_RoomIdAsc(LocalDate reservedDate);
}