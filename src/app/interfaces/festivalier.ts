import { Utilisateur } from "./utilisateur";

export interface Festivalier extends Utilisateur {
  adresse: string,
  complementAdresse: string,
  ville: string,
  codePostal: string
}
