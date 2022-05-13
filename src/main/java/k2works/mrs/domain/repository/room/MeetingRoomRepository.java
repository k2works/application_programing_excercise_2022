package k2works.mrs.domain.repository.room;

import org.springframework.data.jpa.repository.JpaRepository;
import k2works.mrs.domain.model.MeetingRoom;

public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Integer> {
}