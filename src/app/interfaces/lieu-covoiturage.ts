import { TypeLieuCovoiturage } from "../enums/type-lieu-covoiturage";
import { Commune } from "./commune";

export interface LieuCovoiturage {
  id: number,
  nom: string,
  adresse: string,
  latitude: number,
  longitude: number,
  type: TypeLieuCovoiturage,
  commune: Commune,
}
