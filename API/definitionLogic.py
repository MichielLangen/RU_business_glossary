import databasehandler

def getCorrectPerspective(MainTerm_pers, subTerms):
    """
    Determines the correct relationship types between a main term perspective and multiple sub-term perspectives.

    This function retrieves the perspectives of the given sub-terms and then finds 
    the relationship type between each sub-term perspective and the main term perspective.

    Parameters:
        MainTerm_pers (int): The Perspective_ID of the main term.
        subTerms (list of int): A list of Term_IDs representing sub-terms.

    Returns:
        list of dict: A list where each dictionary represents a sub-term and its relationship type:
            - subTerm_ID (int): The ID of the sub-term.
            - Relationshiptype_ID (int or None): The ID of the relationship type between 
              the sub-term perspective and the main term perspective.
    """
    perspective_list = []
    for term in subTerms:
        subID = databasehandler.getPerspectiveID(term)
        perID = databasehandler.getPerspectiveList(subID, MainTerm_pers)
        perspective_list.append({"subTerm_ID": term, "Relationshiptype_ID": perID})
    return (perspective_list)
