import { StatutPanier } from "../enums/statut-panier";
import { Article, ArticleCard } from "./article";
import { Festival } from "./festival";
import { Festivalier } from "./festivalier";

export interface Panier {
  id: number,
  dateCreation: string,
  dateModification: string,
  statut: StatutPanier,
  festivalier: Festivalier,
  articles: Article[]
}

export interface GetCurrentPanier {
  panier: Panier,
  articles: Article[],
}

export interface GetAllPanierResponse {
  panier: {
    id: number,
    dateCreation: Date,
    dateModification: Date,
    statut: StatutPanier
  },
  articles: {
    id: number,
    festival: Festival,
    quantite: number
  }[]
}

export interface PanierPayesListing {
  panier: {
    id: number,
    dateCreation: Date,
    dateModification: Date,
    statut: StatutPanier
  },
  articles: ArticleCard[]
}

export enum ClassTypePaymentResponse {
  OFFRE_COVOITURAGE,
  FESTIVAL
}

export interface PaymentResponse {
  panier: any,
  articles: any,
  articlesNonDisponible: {
    id: number,
    nbPassDisponible: number,
    classType: ClassTypePaymentResponse,
    message: string
  }[] | null
}
