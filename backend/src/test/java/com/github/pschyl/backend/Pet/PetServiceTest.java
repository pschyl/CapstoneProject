package com.github.pschyl.backend.Pet;

import com.github.pschyl.backend.dto.PetWOId;
import com.github.pschyl.backend.model.Coordinates;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.PetRepo;
import com.github.pschyl.backend.service.CoordinateService;
import com.github.pschyl.backend.service.IdService;
import com.github.pschyl.backend.service.PetService;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PetServiceTest {

    PetRepo mockrepo = mock(PetRepo.class);
    IdService idService = mock(IdService.class);
    CoordinateService coordinateService = mock(CoordinateService.class);
    PetService petService = new PetService(mockrepo, idService, coordinateService);
    Shelter shelter = new Shelter("1", "Tierheim Dellbrück", "51069", new Coordinates(50.96214243254786, 7.086788534833288));

    @Test
    void getAllPets_shouldReturnListWithElementDjango_WhenCalled() {
        //GIVEN
        Pet newPet = new Pet("1", "Django", "cat", shelter, List.of("www.example.de/picture"));
        List<Pet> expected = List.of(newPet);

        when(mockrepo.findAll()).thenReturn(expected);

        //WHEN
        List<Pet> actual = petService.getAllPets();

        //THEN
        verify(mockrepo).findAll();
        assertEquals(actual,expected);
    }

    @Test
    void getAllWithinRadius_shouldReturnEmptyList_whenCalledWithBonnAnd10() {
        //GIVEN
        Pet newPet = new Pet("1", "Django", "cat", shelter, List.of("www.example.de/picture"));
        List<Pet> expected = Collections.emptyList();
        String location = "Bonn";
        int radius = 10;
        when(mockrepo.findAll()).thenReturn(List.of(newPet));
        when(coordinateService.transformLocationToCoordinates("Bonn")).thenReturn(new Coordinates(50.73854222632312, 7.097727676912724));
        //WHEN
        List<Pet> actual = petService.getAllWithinRadius(location, radius);
        //THEN
        verify(mockrepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllWithinRadius_shouldReturnListWithDjangoElement_whenCalledWithBonnAnd50() {
        //GIVEN
        Pet newPet = new Pet("1", "Django", "cat", shelter, List.of("www.example.de/picture"));
        List<Pet> expected = List.of(newPet);
        String location = "Bonn";
        int radius = 50;
        when(mockrepo.findAll()).thenReturn(expected);
        when(coordinateService.transformLocationToCoordinates("Bonn")).thenReturn(new Coordinates(50.73854222632312, 7.097727676912724));

        //WHEN
        List<Pet> actual = petService.getAllWithinRadius(location, radius);
        //THEN
        verify(mockrepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void saveNewPet_shouldReturnPetDjango_WhenCalledWithTestPet() {
        //GIVEN
        Pet expected = new Pet("1", "Django", "cat", shelter, List.of("www.example.de/picture"));
        when(idService.generateId()).thenReturn("1");
        PetWOId testPet = new PetWOId(
                "Django",
                "cat",
                shelter,
                List.of("www.example.de/picture")
        );
        //WHEN
        Pet actual = petService.saveNewPet(testPet);
        //THEN
        assertEquals(expected, actual);
        verify(mockrepo).save(new Pet("1", "Django", "cat", shelter, List.of("www.example.de/picture")));
    }
}
