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
    
    