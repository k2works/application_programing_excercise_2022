package k2works.mrs.domain.service.room;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import k2works.mrs.MrsApplication;
import k2works.mrs.domain.model.ReservableRoom;
import k2works.mrs.domain.service.RoomService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest(classes = MrsApplication.class)
public class RoomServiceTest {
	@Autowired
	RoomService roomService;

	@Test
	public void 会議室一覧を取得する() {
		LocalDate date = LocalDate.now();
		List<ReservableRoom> rooms = roomService.findReservableRooms(date);

		assertEquals(2, rooms.size());
	}
}
