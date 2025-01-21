export function generateMermaidString(record) {
  let mermaidString = "flowchart TD\n";

  // Define relationships manually based on the record structure
  mermaidString += `    A[Onderwijsontwerp] -->|Ontwerp van een| B[Aanbod]\n`;
  mermaidString += `    A -->|Ontwerp van een| C[Uitvoering]\n`;
  mermaidString += `    A -->|Samengesteld door| D[Samensteller]\n`;
  mermaidString += `    A -->|Waarvan de subOnderwijsontwerpen staan in een| E[Onderwijsontwerp-volgorde]\n`;
  mermaidString += `    A -->|Gericht op de realisatie van één of meerdere| F[Doelstelling]\n`;
  mermaidString += `    A -->|Met één of meerdere| G[Toelatingseis]\n`;
  mermaidString += `    A -->|Waarvan de samenstelling is onderbouws door| H[Samenstellingsonderbouwing]\n`;
  mermaidString += `    A -->|is een samenstelling van| I[subOnderwijsontwerpen]\n`;
  mermaidString += `    J[Samenstellingskaders] -->|Bepalen de vrijheidsgraden voor de samenstelling van| A\n`;
  mermaidString += `    K[Kwaliteitskader] -->|Vormt de kwaliteitsstandaard voor| A\n`;

  // Replace placeholders with actual values from the record
  Object.keys(record).forEach((key) => {
    const values = record[key];
    if (values.length > 0) {
      values.forEach((value) => {
        mermaidString = mermaidString.replace(
          new RegExp(`\\b${key}\\b`, "g"),
          value
        );
      });
    }
  });

  return mermaidString;
}
