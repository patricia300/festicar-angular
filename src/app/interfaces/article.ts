import { Festival } from "./festival";
import { OffreCovoiturage } from "./offre-covoiturage";
import { Panier } from "./panier";
import { PointPassageCovoiturages } from "./point-passage-covoiturages";

export interface Article {
  id: number,
  panier: Panier,
  pointPassageCovoiturage: PointPassageCovoiturages,
  quantite: number,
  festival: Festival
}

export interface AjoutArcticle {
  idPointPassage: number,
  quantite: number
}

export interface ArticleCard {
  id: number,
  festival: Festival,
  quantite: number,
  offreCovoiturage?: OffreCovoiturage,
  pointPassageCovoiturage?: PointPassageCovoiturages,
  checked?: boolean,
  totalPrix: number
}
