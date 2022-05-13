package k2works.mrs.domain.service.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import k2works.mrs.domain.model.MeetingRoom;
import k2works.mrs.domain.model.ReservableRoom;
import k2works.mrs.domain.repository.room.MeetingRoomRepository;
import k2works.mrs.domain.repository.room.ReservableRoomRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoomService {

	@Autowired
	MeetingRoomRepository meetingRoomRepository;

	public Optional<MeetingRoom> findMeetingRoom(Integer roomId) {
		return meetingRoomRepository.findById(roomId);
	}

	@Autowired
	ReservableRoomRepository reservableRoomRepository;

	public List<ReservableRoom> findReservableRooms(LocalDate date) {
		return reservableRoomRepository.findByReservableRoomId_ReservedDateOrderByReservableRoomId_RoomIdAsc(date);
	}
}
