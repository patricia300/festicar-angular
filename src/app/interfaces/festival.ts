import { OffreCovoiturage } from "./offre-covoiturage"
import { Pageable } from "./pageable"

export interface Festival {
  id: number,
  nom: string,
  dateDebut: Date,
  dateFin: Date,
  tarifPass: number,
  nombrePass: number,
  siteWeb: string,
  nomCommune: string,
  nomSousDomaine: string,
  nomDomainePrincipal: string,
  nomOrganisateur: string,
  offreCovoiturages: OffreCovoiturage[]
}
