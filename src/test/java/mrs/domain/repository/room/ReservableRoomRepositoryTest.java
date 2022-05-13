package mrs.domain.repository.room;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import mrs.domain.model.ReservableRoom;
import mrs.domain.repository.room.ReservableRoomRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@DataJpaTest
public class ReservableRoomRepositoryTest {

    @Autowired
    private ReservableRoomRepository reservableRoomRepository;

    @Test
    public void 会議室一覧を取得する() {
        LocalDate date = LocalDate.now();
        List<ReservableRoom> rooms = reservableRoomRepository
                .findByReservableRoomId_ReservedDateOrderByReservableRoomId_RoomIdAsc(date);
        assertNotNull(rooms);
        assertEquals(2, rooms.size());
        assertEquals(java.util.Optional.ofNullable(rooms.get(1).meetingRoom().roomName()), Optional.of("有楽町"));
    }
}
