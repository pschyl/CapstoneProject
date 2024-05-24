package com.github.pschyl.backend.Message;

import com.github.pschyl.backend.dto.MessageWOIdAndTime;
import com.github.pschyl.backend.model.Message;
import com.github.pschyl.backend.repository.MessageRepo;
import com.github.pschyl.backend.service.CurrentTimeService;
import com.github.pschyl.backend.service.IdService;
import com.github.pschyl.backend.service.MessageService;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MessageServiceTest {

    IdService idService = mock(IdService.class);
    MessageRepo mockrepo = mock(MessageRepo.class);
    CurrentTimeService currentTimeService = mock(CurrentTimeService.class);
    MessageService service = new MessageService(mockrepo, idService, currentTimeService);

    @Test
    void getAllMessages_shouldReturnListWithElementTestMessage_whenCalled() {
        //GIVEN
        Message message = new Message(
                "1",
                "Ernie",
                "Bert",
                "Test",
                LocalDateTime.of(2077, Month.APRIL, 16, 12, 2, 3, 20000)
        );

        List<Message> expected = List.of(message);

        when(mockrepo.findAll()).thenReturn(expected);

        //WHEN
        List<Message> actual = service.getAllMessages();

        //THEN
        assertEquals(actual,expected);
        verify(mockrepo).findAll();
    }

    @Test
    void saveNewMessage_shouldReturnTestMessage_whenCalledWithDto() {
        //GIVEN
        MessageWOIdAndTime newMessage = new MessageWOIdAndTime("Ernie", "Bert", "test");
        Message expected = new Message(
                "1",
                "Ernie",
                "Bert",
                "test",
                LocalDateTime.of(2077, Month.APRIL, 16, 12, 2, 3, 20000)
        );

        when(idService.generateId()).thenReturn("1");
        when(currentTimeService.getCurrentTime()).thenReturn(LocalDateTime.of(2077, Month.APRIL, 16, 12, 2, 3, 20000));

        //WHEN
        Message actual = service.saveNewMessage(newMessage);

        //THEN
        verify(idService).generateId();
        verify(mockrepo).save(expected);
        assertEquals(expected, actual);
    }

}
