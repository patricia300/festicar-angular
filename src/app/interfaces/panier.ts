import { StatutPanier } from "../enums/statut-panier";
import { Article } from "./article";
import { Festivalier } from "./festivalier";

export interface Panier {
  id: number,
  dateCreation: string,
  dateModification: string,
  statut: StatutPanier,
  festivalier: Festivalier,
  articles: Article[]
}
