import json
import pyodbc

def connect_to_sql_server():
    # Define your connection string (adjust the details like server, database, username, and password)
    conn_str = (
        "Driver={SQL Server};"  # Change to the correct ODBC driver
        "Server=127.0.0.1;"  # Replace with your server name or IP address
        "Database=business_glossary;"  # Replace with your database name
        "UID=sa;"  # Replace with your username
        "PWD=Pannenkoek25;"  # Replace with your password
    )

    try:
        conn = pyodbc.connect(conn_str)
        print("Connection successful")
        return conn
    except Exception as e:
        print(f"Error: {e}")
        return None

def get_onderwijsontwerpdata():
    """
    Retrieves and organizes educational design data from the database.

    This function fetches terms and their related definitions, perspectives, 
    and relationship types by joining multiple tables. The results are structured 
    into a dictionary to group definitions under their respective main terms.

    Returns:
        list: A list of dictionaries, where each dictionary represents a term with the following structure:
            - Term_ID (int): Unique identifier of the term.
            - Term_name (str): Name of the term.
            - Term_levelStart (int): Starting level of the term.
            - Term_levelEnd (int): Ending level of the term.
            - Term_Perspective (int): Perspective ID associated with the term.
            - Term_Perspective_Name (str): Name of the associated perspective.
            - DefinitionTerm (list of dict): A list of related definitions, where each definition contains:
                - DefinitionTerm_ID (int): Unique identifier for the definition.
                - MainTerm_ID (int): ID of the main term.
                - MainTerm_name (str): Name of the main term.
                - subTerm_ID (int): ID of the related sub-term.
                - subTerm_name (str): Name of the related sub-term.
                - Relationshiptype_ID (int): ID of the relationship type.
                - RelationshipType_name (str): Name of the relationship type.
                - RelationshipType_FromPerspective (str): Perspective from which the relationship originates.
                - RelationshipType_ToPerspective (str): Perspective to which the relationship points.

    Returns None if an error occurs during database retrieval or processing.
    """
    # Connect to MSSQL
    connection = connect_to_sql_server()
    if not connection:
        return None

    # SQL query to retrieve data
    query = """
     SELECT
        t.Term_ID,
        t.Term_name,
        t.Term_levelStart,
        t.Term_levelEnd,
        t.Term_Perspective,
        dt.DefinitionTerm_ID,
        dt.MainTerm_ID,
        dt.subTerm_ID,
        dt.Relationshiptype_ID,
        p.Perspective_name AS Term_Perspective_Name,
        rt.RelationshipType_name,
        p_from.Perspective_name AS RelationshipType_FromPerspective,
        p_to.Perspective_name AS RelationshipType_ToPerspective,
        st.Term_name AS SubTerm_name  -- Adding subterm name in the query
    FROM
        TERM t
    LEFT JOIN
        DEFINITIONTERM dt ON t.Term_ID = dt.MainTerm_ID OR t.Term_ID = dt.subTerm_ID
    LEFT JOIN
        PERSPECTIVE p ON t.Term_Perspective = p.Perspective_ID
    LEFT JOIN
        RELATIONSHIPTYPE rt ON dt.Relationshiptype_ID = rt.RelationshipType_ID
    LEFT JOIN
        PERSPECTIVE p_from ON rt.RelationshipType_fromPerspective = p_from.Perspective_ID
    LEFT JOIN
        PERSPECTIVE p_to ON rt.RelationshipType_toPerspective = p_to.Perspective_ID
    LEFT JOIN
        TERM st ON dt.subTerm_ID = st.Term_ID;
    """

    try:
        # Execute the query and fetch data
        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        # Format the data
        terms_dict = {}

        for row in rows:
            term_id = row.Term_ID
            term_name = row.Term_name
            
            if term_id not in terms_dict:
                terms_dict[term_id] = {
                    'Term_ID': term_id,
                    'Term_name': term_name,
                    'Term_levelStart': row.Term_levelStart,
                    'Term_levelEnd': row.Term_levelEnd,
                    'Term_Perspective': row.Term_Perspective,
                    'Term_Perspective_Name': row.Term_Perspective_Name,
                    'DefinitionTerm': []
                }

            # Add the DefinitionTerm only if TERM_ID matches MainTerm_ID
            if row.MainTerm_ID == term_id:
                terms_dict[term_id]['DefinitionTerm'].append({
                    'DefinitionTerm_ID': row.DefinitionTerm_ID,
                    'MainTerm_ID': row.MainTerm_ID,
                    'MainTerm_name': term_name,
                    'subTerm_ID': row.subTerm_ID,
                    'subTerm_name': row.SubTerm_name,
                    'Relationshiptype_ID': row.Relationshiptype_ID,
                    'RelationshipType_name': row.RelationshipType_name,
                    'RelationshipType_FromPerspective': row.RelationshipType_FromPerspective,
                    'RelationshipType_ToPerspective': row.RelationshipType_ToPerspective
                })

        # Close the connection
        connection.close()

        # Return formatted data as a JSON object
        return list(terms_dict.values())

    except Exception as e:
        print(f"Error during data fetching or formatting: {e}")
        return None
    
    finally:
        if connection:
            connection.close()

    
def get_admin():
    """
    Retrieves and organizes data from the database related to perspectives, relationship types, and terms.

    This function fetches data from three tables: PERSPECTIVE, RELATIONSHIPTYPE, and TERM. 
    The results are structured into dictionaries for easy access.

    Returns:
        list: A list containing three dictionaries:
            - perspective_dict (dict): A dictionary where each key is a Perspective_ID, and the value is a dictionary with:
                - Perspective_ID (int)
                - Perspective_name (str)
            - relationshiptype_dict (dict): A dictionary where each key is a RelationshipType_ID, and the value is a dictionary with:
                - rel_ID (int)
                - rel_text (str)
                - toPerspective (int)
                - fromPerspective (int)
            - term_dict (dict): A dictionary where each key is a Term_ID, and the value is a dictionary with:
                - term_ID (int)
                - term_name (str)
                - levelStart (int)
                - levelEnd (int)
                - term_perspective (int)

    Returns None if an error occurs during database retrieval or processing.
    """
    # Connect to database
    connection = connect_to_sql_server()
    if not connection:
        return None   
    
    # Queries to retrieve neccessary data
    query_perspective = "SELECT * FROM PERSPECTIVE"
    query_relationshiptype = "SELECT * FROM RELATIONSHIPTYPE"
    query_term = "SELECT * FROM TERM"

    try:
        # Execute perspective query and fetch data
        cursor = connection.cursor()
        cursor.execute(query_perspective)
        rows = cursor.fetchall()

        perspective_dict = {}

        # Form data in dict
        for row in rows:
            pers_id = row.Perspective_ID
            pers_name = row.Perspective_name

            if pers_id not in perspective_dict:
                perspective_dict[pers_id] = {
                    'Perspective_ID': pers_id,
                    'Perspective_name': pers_name
                }

        # Execute relationshiptype query and fetch data
        cursor.execute(query_relationshiptype)
        rows = cursor.fetchall()

        relationshiptype_dict = {}

        # Form data in dict
        for row in rows:
            rel_id = row.RelationshipType_ID

            if rel_id not in relationshiptype_dict:
                relationshiptype_dict[rel_id] = {
                    'rel_ID': rel_id,
                    'rel_text': row.RelationshipType_name,
                    'toPerspective': row.RelationshipType_toPerspective,
                    'fromPerspective': row.RelationshipType_fromPerspective
                }

        # Execute term query and fetch data
        cursor.execute(query_term)
        rows = cursor.fetchall()

        term_dict = {}

        # Form data in dict
        for row in rows:
            term_id = row.Term_ID

            if term_id not in term_dict:
                term_dict[term_id] = {
                    'term_ID': term_id,
                    'term_name': row.Term_name,
                    'levelStart': row.Term_levelStart,
                    'levelEnd': row.Term_levelEnd,
                    'term_perspective': row.Term_Perspective,
                }


        # Close the connection
        connection.close()

        # Return data as an array
        return [perspective_dict, relationshiptype_dict, term_dict]

    except Exception as e:
        print(f"Error during data fetching or formatting: {e}")
        return None
    
    finally:
        if connection:
            connection.close()


def insert_term_and_definitionterm(term_params, definitionterm_list):
    """
    Inserts a new term and a related definitionterm record into the database in a single transaction.
    
    Parameters:
        term_params (dict): A dictionary with keys:
            - Term_ID (int)
            - Term_name (str)
            - Term_levelStart (int)
            - Term_levelEnd (int)
            - Term_Perspective (int)
        definitionterm_list (list of dict): A list of dictionaries where each dictionary has keys:
            - DefinitionTerm_ID (int)
            - MainTerm_ID (int)  (should match term_params['Term_ID'])
            - subTerm_ID (int)
            - Relationshiptype_ID (int)
    
    Returns:
        bool: True if both insertions succeed, False otherwise.
    """
    connection = connect_to_sql_server()
    if not connection:
        return False

    try:
        cursor = connection.cursor()
        # Start transaction (pyodbc automatically starts a transaction)
        
        # 1. Insert into TERM table
        insert_term_query = """
            INSERT INTO TERM (Term_name, Term_levelStart, Term_levelEnd, Term_Perspective)
            VALUES (?, ?, ?, ?)
        """
        cursor.execute(insert_term_query,  
                       term_params['Term_name'], 
                       term_params['Term_levelStart'], 
                       term_params['Term_levelEnd'], 
                       term_params['Term_Perspective'])
        
        # Retrieve the newly generated Term_ID using SCOPE_IDENTITY()
        cursor.execute("SELECT Term_ID FROM TERM WHERE Term_name=?", term_params['Term_name'])
        row = cursor.fetchone()
        if row is None or row[0] is None:
            raise Exception("Failed to retrieve the new Term_ID.")
        main_term_id = int(row[0])
        
        insert_definitionterm_query = """
            INSERT INTO DEFINITIONTERM (MainTerm_ID, subTerm_ID, Relationshiptype_ID)
            VALUES (?, ?, ?)
        """
        
        for dt in definitionterm_list:       
            cursor.execute(insert_definitionterm_query, 
                        main_term_id, 
                        dt['subTerm_ID'], 
                        dt['Relationshiptype_ID'])

        # If all operations are successful, commit the transaction.
        connection.commit()
        print("New term and its definitionterm record inserted successfully.")
        return True

    except Exception as e:
        connection.rollback()
        print("Error during insertion:", e)
        return False

    finally:
        if connection:
            connection.close()


def getPerspectiveList(toPers, fromPers):
    """
    Retrieves the RelationshipType_ID based on the given fromPerspective and toPerspective values.

    This function queries the RELATIONSHIPTYPE table to find the relationship type 
    that connects the specified perspectives.

    Parameters:
        toPers (int): The ID of the target perspective.
        fromPers (int): The ID of the source perspective.

    Returns:
        int: The RelationshipType_ID if found.
        False: If no matching relationship type is found or an error occurs.

    Exceptions:
        - If no result is found, an exception is raised with the message:
          "Failed to retrieve the new Term_ID."
        - Any other database errors are caught and printed.
    """
    connection = connect_to_sql_server()
    if not connection:
        return False
    
    try:
        cursor = connection.cursor()
        query = """ SELECT * FROM RELATIONSHIPTYPE WHERE  RelationshipType_fromPerspective = ? AND RelationshipType_toPerspective = ?"""

        cursor.execute(query, fromPers, toPers)
        row = cursor.fetchone()

        if row is None or row[0] is None:
            raise Exception("Failed to retrieve the new Term_ID.")
        perspective_id = int(row[0])

        return perspective_id

    except Exception as e:
        connection.rollback()
        print("Error during insertion:", e)
        return False
    
    finally:
        if connection:
            connection.close()


def getPerspectiveID(term_id):
    """
    Retrieves the Perspective_ID associated with a given Term_ID.

    This function queries the TERM table to find the perspective linked to the specified term.

    Parameters:
        term_id (int): The ID of the term whose perspective needs to be retrieved.

    Returns:
        int: The Perspective_ID if found.
        False: If no matching term is found or an error occurs.

    Exceptions:
        - If no result is found, an exception is raised with the message:
          "Failed to retrieve the new Term_ID."
        - Any other database errors are caught and printed.
    """
    connection = connect_to_sql_server()
    if not connection:
        return False
    
    try:
        cursor = connection.cursor()
        query = """ SELECT Term_Perspective FROM TERM WHERE Term_ID = ?"""

        cursor.execute(query, term_id)
        row = cursor.fetchone()

        if row is None or row[0] is None:
            raise Exception("Failed to retrieve the new Term_ID.")
        perspective_id = int(row[0])

        return perspective_id

    except Exception as e:
        connection.rollback()
        print("Error during insertion:", e)
        return False
    
    finally:
        if connection:
            connection.close()
