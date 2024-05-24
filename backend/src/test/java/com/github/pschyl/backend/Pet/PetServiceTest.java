package com.github.pschyl.backend.Pet;

import com.github.pschyl.backend.dto.PetWOId;
import com.github.pschyl.backend.model.Coordinates;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Role;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.PetRepo;
import com.github.pschyl.backend.service.CoordinateService;
import com.github.pschyl.backend.service.IdService;
import com.github.pschyl.backend.service.PetService;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PetServiceTest {

    PetRepo mockrepo = mock(PetRepo.class);
    IdService idService = mock(IdService.class);
    CoordinateService coordinateService = mock(CoordinateService.class);
    PetService petService = new PetService(mockrepo, idService, coordinateService);
    Shelter shelter = new Shelter("1", "Tierheim Dellbrück", "Krasse Straße 3", "51069", "Berlin", "tierheim@yahoo.de", "tierheimDellbrück", "123", new Coordinates(50.96214243254786, 7.086788534833288), Role.SHELTER);

    @Test
    void getAllPets_shouldReturnListWithElementDjango_WhenCalled() {
        //GIVEN
        Pet newPet = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
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
        Pet newPet = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
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
        Pet newPet = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
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
        Pet expected = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
        when(idService.generateId()).thenReturn("1");
        PetWOId testPet = new PetWOId("Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
        //WHEN
        Pet actual = petService.saveNewPet(testPet);
        //THEN
        assertEquals(expected, actual);
        verify(mockrepo).save(new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter));
    }

    @Test
    void getPetById_ShouldReturnPetDjango_WhenCalledWith1() {
        //GIVEN
        Pet expected = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);
        when(mockrepo.findById("1")).thenReturn(Optional.of(expected));
        //WHEN
        Pet actual = petService.getPetById("1");
        //THEN
        verify(mockrepo).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void editPetById_shouldReturnEditedPet_WhenCalledWithValidId() {
        //GIVEN
        String id = "1";
        Pet expected = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);

        when(mockrepo.save(expected)).thenReturn(expected);

        //WHEN
        Pet actual = petService.editPetById(id, expected);

        //THEN
        verify(mockrepo).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void deletePetById_shouldCallDeleteMethodFromRepo_WhenCalledWithValidID() {
        //GIVEN
        String id ="1";
        Pet expected = new Pet("1", "Django", "Familienmitglied", "cat", "Männlich", "Ja", "Alt",  "Hallo", List.of("www.example.de/picture"), shelter);

        when(mockrepo.findById(id)).thenReturn(Optional.of(expected));
        doNothing().when(mockrepo).delete(expected);

        //WHEN
        Pet actual = petService.deletePetById(id);
        //THEN
        assertEquals(actual, expected);
        verify(mockrepo).delete(expected);
    }
}
