import { OffreCovoiturage } from "./offre-covoiturage"

export interface Festival {
  id: number,
  nom: string,
  dateDebut: Date,
  dateFin: Date,
  tarifPass: number,
  nombrePass: number,
  siteWeb: string,
  nomCommune: string,
  codePostalCommune: string,
  nomSousDomaine: string,
  nomDomainePrincipal: string,
  nomOrganisateur: string,
  offreCovoiturages: OffreCovoiturage[],
  nombrePlaceOffreCovoiturage?: number
}


export const COMMUNE = 'Commune';
export const DATE_DEBUT = 'Date de début du festival';
export const DOMAINE = 'Domaine';
