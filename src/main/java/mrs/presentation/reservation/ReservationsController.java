package mrs.presentation.reservation;

import mrs.application.scenario.MeetingRoomReservationScenario;
import mrs.application.service.reservation.AlreadyReservedException;
import mrs.application.service.reservation.UnavailableReservationException;
import mrs.domain.model.reservation.reservation.Reservation;
import mrs.domain.model.reservation.room.ReservableRoom;
import mrs.domain.model.reservation.room.ReservableRoomId;
import mrs.domain.model.user.ReservationUserDetails;
import mrs.domain.model.user.User;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 会議室予約画面
 */
@Controller("会議室予約")
@RequestMapping("reservations/{date}/{roomId}")
public class ReservationsController {

    private final MeetingRoomReservationScenario scenario;

    public ReservationsController(MeetingRoomReservationScenario scenario) {
        this.scenario = scenario;
    }

    @ModelAttribute
    ReservationForm setUpForm() {
        ReservationForm form = new ReservationForm();
        // デフォルト値
        form.setStartTime(LocalTime.of(9, 0));
        form.setEndTime(LocalTime.of(10, 0));
        return form;
    }

    @GetMapping
    String reserveForm(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable("date") LocalDate date,
                       @PathVariable("roomId") Integer roomId, Model model) {
        ReservableRoomId reservableRoomId = new ReservableRoomId(roomId, date);
        List<Reservation> reservations = scenario.findReservations(reservableRoomId);

        List<LocalTime> timeList = Stream.iterate(LocalTime.of(0, 0), t -> t.plusMinutes(30))
                .limit(24 * 2)
                .collect(Collectors.toList());

        model.addAttribute("room", scenario.findMeetingRoom(roomId));
        model.addAttribute("reservations", reservations);
        model.addAttribute("timeList", timeList);
        return "reservation/reserveForm";
    }

    @PostMapping
    String reserve(@Validated ReservationForm form, BindingResult bindingResult,
                   @AuthenticationPrincipal ReservationUserDetails userDetails,
                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable("date") LocalDate date,
                   @PathVariable("roomId") Integer roomId, Model model) {
        if (bindingResult.hasErrors()) {
            return reserveForm(date, roomId, model);
        }

        ReservableRoom reservableRoom = new ReservableRoom(
                new ReservableRoomId(roomId, date));
        Reservation reservation = new Reservation();
        reservation.setStartTime(form.getStartTime());
        reservation.setEndTime(form.getEndTime());
        reservation.setReservableRoom(reservableRoom);
        reservation.setUser(userDetails.getUser());

        try {
            scenario.reserve(reservation);
        } catch (UnavailableReservationException | AlreadyReservedException e) {
            model.addAttribute("error", e.getMessage());
            return reserveForm(date, roomId, model);
        }
        return "redirect:/reservations/{date}/{roomId}";
    }

    @PostMapping(params = "cancel")
    String cancel(@AuthenticationPrincipal ReservationUserDetails userDetails,
                  @RequestParam("reservationId") Integer reservationId,
                  @PathVariable("roomId") Integer roomId,
                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable("date") LocalDate date,
                  Model model) {
        User user = userDetails.getUser();
        try {
            Reservation reservation = scenario.findOne(reservationId);
            scenario.cancel(reservation);
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return reserveForm(date, roomId, model);
        }
        return "redirect:/reservations/{date}/{roomId}";
    }
}
