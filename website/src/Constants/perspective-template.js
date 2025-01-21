export let onderwijsontwerp =
  "Een {Onderwijsontwerp} is een ontwerp van een {Aanbod} en/of {Uitvoering} met eventueel een bepaald {Kwaliteitskader}, en laat een overzicht zien van een door een samensteller samengesteld samenhangend geheel van sub{Onderwijsontwerpen} geplaatst in een {Onderwijsontwerpvolgorde}, gericht op de realisatie van {Doelstellingen} en met {Toelatingseisen}. Eventueel wordt met een bijbehorende {Samenstellingonderbouwing} expliciet gemaakt hoe een lerende in staat wordt gesteld om te voldoen aan de {Doelstelling} van dat {Aanbod} en/of die {Uitvoering}";

export function replacePlaceholders(sentence, terms) {
  const usedTerms = {};

  // Array of all perspectives to replace in the sentence
  const perspectives = [
    "Onderwijsontwerp",
    "Aanbod",
    "Uitvoering",
    "Kwaliteitskader",
    "Doelstelling",
    "Toelatingseis",
    "Samenstellingonderbouwing",
    "Onderwijsontwerpvolgorde",
  ];

  // Loop through each perspective and replace placeholders dynamically
  perspectives.forEach((perspective) => {
    sentence = sentence.replace(new RegExp(`{${perspective}}`, "g"), () => {
      const availableTerms = getTermsByPerspective(perspective, terms).filter(
        (term) => !usedTerms[perspective]?.includes(term)
      );
      const termToUse = availableTerms.shift(); // Take the first unused term
      if (termToUse) {
        if (!usedTerms[perspective]) usedTerms[perspective] = [];
        usedTerms[perspective].push(termToUse); // Mark this term as used
      }
      return termToUse || `{${perspective}}`; // Return the term, or leave the placeholder if no term is available
    });
  });

  return sentence;
}

// Function to get term names based on perspective, returning all matching terms
function getTermsByPerspective(perspective, terms) {
  return terms
    .filter((t) => t.Term2_perspective === perspective)
    .map((t) => t.Term2_Name);
}
