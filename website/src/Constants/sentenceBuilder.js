export function buildSentence(terms) {
  let sentence = "Een ";
  sentence += terms.Term_name;
  sentence += " is een ";
  sentence += terms.Term_Perspective_Name;
  sentence += " ";
  terms.DefinitionTerm.forEach((element) => {
    console.log(element);

    sentence += element.RelationshipType_name;
    sentence += " ";
    sentence += element.subTerm_name;
  });

  return sentence;
}
