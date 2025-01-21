import sqlite3
from collections import defaultdict


conn = sqlite3.connect(':memory:', check_same_thread=False)
cursor = conn.cursor()

def startup():
 cursor.execute('''
    CREATE TABLE IF NOT EXISTS TERM (
        Term_ID INTEGER PRIMARY KEY,
        Term_name TEXT NOT NULL,
        Term_levelStart INTEGER NOT NULL,
        Term_levelEnd INTEGER NOT NULL,
        Term_perspective TEXT CHECK(Term_perspective IN ('Onderwijsontwerp', 'Samenstellingonderbouwing', 'Doelstelling', 'Onderwijsontwerpvolgorde', 'Benodigdheid', 'Aanbod', 'Startperiode')),
        Term_Definition INTEGER,
        FOREIGN KEY (Term_Definition) REFERENCES DEFINITION (Definition_ID)
    );
    ''')
 
 cursor.execute('''
    CREATE TABLE IF NOT EXISTS DEFINITION (
        Definition_ID INTEGER PRIMARY KEY,   -- Primair sleutel voor de definitie
        Term1_ID INTEGER,                    -- Eerste term (foreign key naar TERM)
        Term2_ID INTEGER,                    -- Tweede term (foreign key naar TERM)
        FOREIGN KEY (Term1_ID) REFERENCES TERM (Term_ID),  -- Foreign key naar Term1
        FOREIGN KEY (Term2_ID) REFERENCES TERM (Term_ID)   -- Foreign key naar Term2
);
    ''')
 
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Curriculum', 7, 7, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Cursusontwerp', 4, 4, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsactiviteitontwerp', 2, 2, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Specialisatie', 7, 7, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Minorontwerp', 6, 6, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Microcredentialontwerp', 5, 5, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Eenheid van leeruitkomstenontwerp', 4, 4, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsactiviteitonderdeelontwerp', 1, 1, 'Onderwijsontwerp');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Leerlijn', 4, 7, 'Samenstellingonderbouwing');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Themalijn', 4, 7, 'Samenstellingonderbouwing');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsmatrijs (in-progress)', 2, 4, 'Samenstellingonderbouwing');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Rubric', 1, 2, 'Samenstellingonderbouwing');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Eindkwalificaties', 7, 7, 'Doelstelling');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Minordoelen', 6, 6, 'Doelstelling');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Cursusdoelen', 4, 4, 'Doelstelling');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetscriteria', 2, 2, 'Doelstelling');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Beoordelingsnorm', 1, 1, 'Doelstelling');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Curriculumcursusprogramma', 7, 7, 'Onderwijsontwerpvolgorde');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Minorcursusprogramma', 6, 6, 'Onderwijsontwerpvolgorde');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Cursusplanning', 4, 4, 'Onderwijsontwerpvolgorde');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsactiviteitonderdeel-volgorde', 2, 2, 'Onderwijsontwerpvolgorde');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsmaterialen', 1, 2, 'Benodigdheid');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Opleiding', 7, 7, 'Aanbod');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Minor', 6, 6, 'Aanbod');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Cursus', 4, 4, 'Aanbod');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Toetsgelegenheid', 2, 2, 'Aanbod');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Collegejaar', 7, 7, 'Startperiode');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Semester', 6, 6, 'Startperiode');")
 cursor.execute("INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_perspective) VALUES ('Periode', 3, 4, 'Startperiode');") 


 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (1, 2)')
 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (1, 10)')
 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (1, 9)')
 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (1, 23)')
 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (1, 13)')
 cursor.execute('INSERT INTO DEFINITION (Term1_ID, Term2_ID) VALUES (2, 25)')

 conn.commit()

def get_onderwijsontwerpdata():
    cursor.execute('''
    SELECT t1.*, t2.*, 
       d.Definition_ID
    FROM TERM t1
    LEFT JOIN DEFINITION d ON t1.Term_ID = d.Term1_ID
    LEFT JOIN TERM t2 ON d.Term2_ID = t2.Term_ID;''')
    rows = cursor.fetchall()

    terms_dict = defaultdict(lambda: {
        'Term_ID': None, 'Term_name': None, 'Term_levelStart': None, 'Term_levelEnd': None,
        'Term_perspective': None, 'Related_Terms': [], 'Definition_IDs': []
    })

    # Populate the dictionary with data
    for row in rows:
        term1_id, term1_name, term1_level_start, term1_level_end, term1_perspective, t1definition, term2_id, term2_name, term2_level_start, term2_level_end, term2_perspective, t2definition, definition_id = row

        # If the term has not been encountered, initialize its data
        if terms_dict[term1_id]['Term_ID'] is None:
            terms_dict[term1_id]['Term_ID'] = term1_id
            terms_dict[term1_id]['Term_name'] = term1_name
            terms_dict[term1_id]['Term_levelStart'] = term1_level_start
            terms_dict[term1_id]['Term_levelEnd'] = term1_level_end
            terms_dict[term1_id]['Term_perspective'] = term1_perspective

        # Add the related term and definition ID to the list
        if term2_id is not None:
            terms_dict[term1_id]['Related_Terms'].append({
                'Term2_ID': term2_id,
                'Term2_Name': term2_name,
                'Term2_perspective': term2_perspective
            })
        if definition_id is not None:
            terms_dict[term1_id]['Definition_IDs'].append(term2_id)

    # Convert the dictionary to a list of results
    combined_terms = list(terms_dict.values())
    
    return combined_terms