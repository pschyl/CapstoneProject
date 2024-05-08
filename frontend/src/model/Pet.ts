import {Shelter} from "./Shelter.ts";

export type Pet = {
    id: string,
    name: string,
    species: string,
    shelter: Shelter,
    images: string[]
}