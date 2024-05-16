import {Shelter} from "./Shelter.ts";

export type Pet = {
    id: string,
    name: string,
    type: string,
    species: string,
    gender: string,
    castrated: string,
    age: string,
    description: string,
    images: string[],
    shelter: Shelter
}