package mrs.app.room;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import mrs.app.room.RoomsController;
import mrs.domain.service.room.RoomService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class RoomsControllerTest {
    MockMvc mockMvc;

    @InjectMocks
    RoomsController controller;

    @Mock
    RoomService mockRoomService;

    @BeforeEach
    public void setUpMockMvc() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void listRooms() throws Exception {
        mockMvc.perform(get("/rooms"))
                .andExpect(status().isOk());
    }

}