export let OnderwijsontwerpSjabloon = {
  Onderwijsontwerp: [],
  subOnderwijsontwerp: [],
  Kwaliteitskader: [],
  Samenstellingskader: [],
  Aanbod: [],
  Uitvoering: [],
  Samensteller: [],
  Onderwijsontwerpvolgorde: [],
  Doelstelling: [],
  Toelatingseis: [],
  Samenstellingsonderbouwing: [],
};

const perspectiveToField = {
  Onderwijsontwerp: "Onderwijsontwerp",
  subOnderwijsontwerp: "subOnderwijsontwerp",
  Kwaliteitskader: "Kwaliteitskader",
  Samenstellingskader: "Samenstellingskader",
  Samenstellingonderbouwing: "Samenstellingsonderbouwing",
  Doelstelling: "Doelstelling",
  Aanbod: "Aanbod",
  Uitvoering: "Uitvoering",
  Toelatingseis: "Toelatingseis",
  Samensteller: "Samensteller",
  Onderwijsontwerpvolgorde: "Onderwijsontwerpvolgorde",
};

export function fillTemplate(template, record) {
  record.DefinitionTerm.forEach((term) => {
    const field = perspectiveToField[term.RelationshipType_ToPerspective];
    if (field) {
      template[field].push(term.subTerm_name);
    } else {
      console.log(
        "Unhandled perspective:",
        term.RelationshipType_ToPerspective
      );
    }
  });

  // Handle the case for subOnderwijsontwerp (if no sub term exists, use "sub" + first term)
  if (
    !template.subOnderwijsontwerp.length &&
    template.Onderwijsontwerp.length > 0
  ) {
    template.subOnderwijsontwerp.push(template.Onderwijsontwerp[0]); // Default sub-term based on first term
  }

  template["Onderwijsontwerp"] = [record.Term_name];
  return template;
}
