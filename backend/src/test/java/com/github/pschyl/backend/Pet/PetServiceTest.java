package com.github.pschyl.backend.Pet;

import com.github.pschyl.backend.model.Coordinates;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.PetRepo;
import com.github.pschyl.backend.service.PetService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PetServiceTest {

    PetRepo mockrepo = mock(PetRepo.class);
    PetService petService = new PetService(mockrepo);

    Shelter shelter = new Shelter("1", "Tierheim Bonn", "50678", new Coordinates(1,1));

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
}
