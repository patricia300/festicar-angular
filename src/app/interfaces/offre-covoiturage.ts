import { Covoitureur } from "./covoitureur";
import { PointPassageCovoiturages } from "./point-passage-covoiturages";

export interface OffreCovoiturage {
  id: number,
  dateOffre: Date,
  nombrePlaces: number,
  modeleVoiture: string,
  heureDepart: Date,
  heureArrive: Date,
  covoitureur: Covoitureur,
  pointPassageCovoiturages: PointPassageCovoiturages[]
}
