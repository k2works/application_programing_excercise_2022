package mrs.appication.service.room;

import mrs.application.service.room.ReservableRoomRepository;
import mrs.domain.model.room.ReservableRoom;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class ReservableRoomRepositoryTest {

    @Autowired
    private ReservableRoomRepository reservableRoomRepository;

    @Test
    public void 会議室一覧を取得する() {
        LocalDate date = LocalDate.now();
        List<ReservableRoom> rooms = reservableRoomRepository.findByReservableRoomId_reservedDateOrderByReservableRoomId_roomIdAsc(date);
        assertNotNull(rooms);
        assertEquals(2, rooms.size());
        assertEquals(java.util.Optional.ofNullable(rooms.get(1).getMeetingRoom().getRoomName()), Optional.of("有楽町"));
    }
}
