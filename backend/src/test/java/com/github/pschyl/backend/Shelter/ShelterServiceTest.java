package com.github.pschyl.backend.Shelter;

import com.github.pschyl.backend.dto.ShelterWOIdAndCoordinates;
import com.github.pschyl.backend.model.Coordinates;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.ShelterRepo;
import com.github.pschyl.backend.service.CoordinateService;
import com.github.pschyl.backend.service.IdService;
import com.github.pschyl.backend.service.ShelterService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ShelterServiceTest {

    ShelterRepo mockrepo = mock(ShelterRepo.class);
    IdService mockIdService = mock(IdService.class);
    CoordinateService mockCoordianteService = mock(CoordinateService.class);
    ShelterService shelterService = new ShelterService(mockrepo, mockIdService, mockCoordianteService);

    @Test
    void getAllShelter_shouldReturnListWithElementTierheimDellbrück_WhenCalled() {
        //GIVEN
        Shelter shelter = new Shelter("1", "Tierheim Dellbrück", "51069", new Coordinates(50.96214243254786, 7.086788534833288));
        List<Shelter> expected = List.of(shelter);

        when(mockrepo.findAll()).thenReturn(expected);
        //WHEN
        List<Shelter> actual = shelterService.getAllShelter();
        //THEN
        verify(mockrepo).findAll();
        assertEquals(actual,expected);
    }

    @Test
    void saveNewShelter_shouldReturnTierheimDellbrück_WhenCalledWithDto() {
        //GIVEN
        ShelterWOIdAndCoordinates newShelter = new ShelterWOIdAndCoordinates("Tierheim Dellbrück", "51069");
        Shelter expected = new Shelter("1", "Tierheim Dellbrück", "51069", new Coordinates(50.96214243254786, 7.086788534833288));

        when(mockIdService.generateId()).thenReturn("1");
        when(mockCoordianteService.transformLocationToCoordinates("51069")).thenReturn(new Coordinates(50.96214243254786, 7.086788534833288));
        when(mockrepo.save(expected)).thenReturn(expected);
        //WHEN
        Shelter actual = shelterService.saveNewShelter(newShelter);
        //THEN
        verify(mockIdService).generateId();
        verify(mockCoordianteService).transformLocationToCoordinates("51069");
        verify(mockrepo).save(expected);
        assertEquals(expected, actual);

    }
}
