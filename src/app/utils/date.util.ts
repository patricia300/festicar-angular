export const formatDate = (inputDate: string): string => {
  // Vérifier si la date est dans le bon format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(inputDate)) {
      throw new Error("Format de date invalide. Utilisez le format 'yyyy-mm-dd'.");
  }

  // Extraire les parties de la date
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  // Formater la date
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}
