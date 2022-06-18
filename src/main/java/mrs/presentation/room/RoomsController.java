package mrs.presentation.room;

import com.github.pagehelper.PageHelper;
import mrs.application.scenario.MeetingRoomReservationScenario;
import mrs.domain.model.reservation.reservation.ReservedDate;
import mrs.domain.model.reservation.room.ReservableRoomList;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;

/**
 * 会議室予約一覧画面
 */
@Controller
@RequestMapping("rooms")
public class RoomsController {

    private final MeetingRoomReservationScenario meetingRoomReservationScenario;

    public RoomsController(MeetingRoomReservationScenario meetingRoomReservationScenario) {
        this.meetingRoomReservationScenario = meetingRoomReservationScenario;
    }

    @GetMapping
    String listRooms(Model model) {
        PageHelper.startPage(1, 10);
        LocalDate today = LocalDate.now();
        ReservableRoomList rooms = meetingRoomReservationScenario.findReservableRooms(new ReservedDate(today)).orElse(new ReservableRoomList());
        model.addAttribute("date", today);
        model.addAttribute("rooms", rooms.asList());
        return "room/listRooms";
    }

    @GetMapping("{date}")
    String listRooms(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable("date") LocalDate date, Model model) {
        ReservableRoomList rooms = meetingRoomReservationScenario.findReservableRooms(new ReservedDate(date)).orElse(new ReservableRoomList());
        model.addAttribute("rooms", rooms.asList());
        return "room/listRooms";
    }
}
