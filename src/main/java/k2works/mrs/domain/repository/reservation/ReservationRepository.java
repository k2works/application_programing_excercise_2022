package k2works.mrs.domain.repository.reservation;

import java.util.List;

import k2works.mrs.domain.model.ReservableRoomId;
import k2works.mrs.domain.model.Reservation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
	List<Reservation> findByReservableRoom_ReservableRoomIdOrderByStartTimeAsc(ReservableRoomId reservableRoomId);
}
