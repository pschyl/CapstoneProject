package com.github.pschyl.backend.service;

import com.github.pschyl.backend.model.Coordinates;
import com.opencagedata.jopencage.JOpenCageGeocoder;
import com.opencagedata.jopencage.model.JOpenCageForwardRequest;
import com.opencagedata.jopencage.model.JOpenCageResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CoordinateService {

    @Value("${OPEN_CAGE_KEY}")
    private String key;

    public Coordinates transformLocationToCoordinates(String location) {


        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder(key);

        JOpenCageForwardRequest request = new JOpenCageForwardRequest(location);

        request.setMinConfidence(1);
        request.setNoAnnotations(false);
        request.setNoDedupe(true);

        JOpenCageResponse response = jOpenCageGeocoder.forward(request);

        try {
            return new Coordinates(response.getResults().getFirst().getGeometry().getLat(), response.getResults().getFirst().getGeometry().getLng());
        } catch (NoSuchElementException e) {
            return new Coordinates(0, 0);
        }

    }
}
