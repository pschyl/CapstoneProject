package com.github.pschyl.backend.service;

import com.github.pschyl.backend.model.Coordinates;
import com.opencagedata.jopencage.JOpenCageGeocoder;
import com.opencagedata.jopencage.model.JOpenCageForwardRequest;
import com.opencagedata.jopencage.model.JOpenCageResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CoordinateService {

    public Coordinates transformPostalCodeToCoordinates(String postalCode) {

        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder("ed450abe46f64eab9a8f9fa0ac180b2d");

        JOpenCageForwardRequest request = new JOpenCageForwardRequest(postalCode);

        request.setMinConfidence(1);
        request.setNoAnnotations(false);
        request.setNoDedupe(true);

        JOpenCageResponse response = jOpenCageGeocoder.forward(request);


        return new Coordinates(response.getResults().getFirst().getGeometry().getLat(), response.getResults().getFirst().getGeometry().getLng());
    }


}
