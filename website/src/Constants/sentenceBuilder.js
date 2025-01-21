export function buildSentence(perspective, terms) {
  switch (perspective) {
    case "Onderwijsontwerp":
      let sentence =
        "Een " +
        terms.Onderwijsontwerp +
        " is een ontwerp van een " +
        terms.Aanbod +
        " en/of " +
        terms.Uitvoering +
        " met eventueel een bepaald " +
        terms.Kwaliteitskader +
        ", en laat een overzicht zien van een door een samensteller samengesteld samenhangend geheel van " +
        terms.subOnderwijsontwerp +
        " geplaatst in een " +
        terms.Onderwijsontwerp_volgorde +
        ", gericht op de realisatie van " +
        terms.Doelstelling +
        " en met " +
        terms.Toelatingseis +
        ". Eventueel wordt met een bijbehorende " +
        terms.Samenstellingsonderbouwing +
        " expliciet gemaakt hoe een lerende in staat wordt gesteld om te voldoen aan de " +
        terms.Doelstelling +
        " van die " +
        terms.Aanbod +
        " en/of die " +
        terms.Uitvoering;
      console.log(sentence);
      return sentence;
    default:
      console.log("No perspective");
  }
}
