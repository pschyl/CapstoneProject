package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Coordinates {


    private final double latitude;
    private final double longitude;

    public boolean isWithinRadius(Coordinates searchLocationCoordinates, int radius) {
        final int earthRadius = 6371; // Radius of the earth

        double latDistance = Math.toRadians(searchLocationCoordinates.latitude - latitude);
        double lonDistance = Math.toRadians(searchLocationCoordinates.longitude - longitude);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(latitude)) * Math.cos(Math.toRadians(latitude))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distanceInKm = earthRadius * c;

        distanceInKm = Math.pow(distanceInKm, 2);

        return Math.sqrt(distanceInKm) < radius;
    }
}
