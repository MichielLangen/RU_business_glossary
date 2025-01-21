export let OnderwijsontwerpSjabloon = {
  Onderwijsontwerp: [],
  subOnderwijsontwerp: [],
  Kwaliteitskader: [],
  Samenstellingskader: [],
  Aanbod: [],
  Uitvoering: [],
  Samensteller: [],
  Onderwijsontwerp_volgorde: [],
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
  Onderwijsontwerp_volgorde: "Onderwijsontwerp_volgorde",
};

export function fillTemplate(template, record) {
  // Loop through all terms in Related_Terms and add them to the corresponding fields
  record.Related_Terms.forEach((term) => {
    const field = perspectiveToField[term.Term2_perspective];
    if (field) {
      template[field].push(term.Term2_Name);
    } else {
      console.log("Unhandled perspective:", term.Term2_perspective);
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
