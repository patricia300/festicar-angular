import { Panier } from "./panier";
import { PointPassageCovoiturages } from "./point-passage-covoiturages";

export interface Article {
  id: number,
  panier: Panier,
  pointPassageCovoiturage: PointPassageCovoiturages,
  quantite: number
}
