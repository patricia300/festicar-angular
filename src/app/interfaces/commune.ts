import { Departement } from "./departement";

export interface Commune {
  codeInsee: string,
  codePostal: string,
  nom: string,
  latitude: number,
  longitude: number,
  departement: Departement
}
