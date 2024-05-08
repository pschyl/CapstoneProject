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

    public Coordinates transformPostalCodeToCoordinates() {

        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder("${OPEN_CAGE_KEY}");

        JOpenCageForwardRequest request = new JOpenCageForwardRequest("50678");

        request.setMinConfidence(1);
        request.setNoAnnotations(false);
        request.setNoDedupe(true);

        JOpenCageResponse response = jOpenCageGeocoder.forward(request);


        return new Coordinates(response.getResults().get(0).getGeometry().getLat(), response.getResults().get(0).getGeometry().getLng());
    }


}
