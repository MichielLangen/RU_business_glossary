import databasehandler

def getCorrectPerspective(MainTerm_pers, subTerms):
    perspective_list = []
    for term in subTerms:
        subID = databasehandler.getPerspectiveID(term)
        perID = databasehandler.getPerspectiveList(subID, MainTerm_pers)
        perspective_list.append({"subTerm_ID": term, "Relationshiptype_ID": perID})
    return (perspective_list)
