import {Coordinates} from "./Coordinates.ts";

export type Shelter = {
    id: string,
    name: string,
    postalCode: string,
    coordinates: Coordinates,
    images: string[]
}