import { buildSentence } from "../Constants/sentenceBuilder";

describe("buildSentence", () => {
  it("should build a sentence from terms object", () => {
    const terms = {
      Term_name: "term",
      Term_Perspective_Name: "perspective",
      DefinitionTerm: [
        { RelationshipType_name: "relationship1", subTerm_name: "subterm1" },
        { RelationshipType_name: "relationship2", subTerm_name: "subterm2" },
      ],
    };

    const result = buildSentence(terms);
    expect(result).toBe(
      "Een term is een perspective relationship1 subterm1 relationship2 subterm2"
    );
  });

  it("should handle empty DefinitionTerm array", () => {
    const terms = {
      Term_name: "term",
      Term_Perspective_Name: "perspective",
      DefinitionTerm: [],
    };

    const result = buildSentence(terms);
    expect(result).toBe("Een term is een perspective ");
  });

  it("should handle missing Term_name", () => {
    const terms = {
      Term_Perspective_Name: "perspective",
      DefinitionTerm: [
        { RelationshipType_name: "relationship1", subTerm_name: "subterm1" },
      ],
    };

    const result = buildSentence(terms);
    expect(result).toBe(
      "Een undefined is een perspective relationship1 subterm1"
    );
  });

  it("should handle missing Term_Perspective_Name", () => {
    const terms = {
      Term_name: "term",
      DefinitionTerm: [
        { RelationshipType_name: "relationship1", subTerm_name: "subterm1" },
      ],
    };

    const result = buildSentence(terms);
    expect(result).toBe("Een term is een undefined relationship1 subterm1");
  });
});
