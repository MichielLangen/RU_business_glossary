import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { OnderwijsontwerpSjabloon } from "../../Constants/Onderwijsontwerp";
import { fillTemplate } from "../../Constants/Onderwijsontwerp";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = () => {
    fetch("http://127.0.0.1:5000/onderwijsontwerp")
      .then((res) => res.json()) // Correcte syntax voor json() parsing
      .then((res) => {
        console.log(res);
        this.setState({ data: res }); // Update state met de opgehaalde data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Foutafhandelingsmechanisme
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data } = this.state;
    const headers = ["Term_name"];
    const perspectives = [
      ...new Set(data.map((term) => term.Term_Perspective_Name)),
    ];

    const minLevel = Math.min(...data.map((term) => term.Term_levelStart));
    const maxLevel = Math.max(...data.map((term) => term.Term_levelEnd));
    const levels = Array.from(
      { length: maxLevel - minLevel + 1 },
      (_, i) => minLevel + i
    ).reverse();

    const rows = [];

    levels.forEach((level) => {
      const row = { level, cells: {} };

      perspectives.forEach((perspective) => {
        // Find terms that match this level and perspective
        const termsAtLevel = data.filter(
          (term) =>
            term.Term_Perspective_Name === perspective &&
            term.Term_levelStart <= level &&
            term.Term_levelEnd >= level
        );

        if (termsAtLevel.length > 1) {
          row.cells[perspective] = termsAtLevel.map((term) => term.Term_name);
        } else if (termsAtLevel.length === 1) {
          row.cells[perspective] = [termsAtLevel[0].Term_name];
        } else {
          row.cells[perspective] = [];
        }
      });

      rows.push(row);
    });

    return (
      <div>
        <br />
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  {perspectives.map((perspective, index) => (
                    <TableCell key={index}>{perspective}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => {
                  const subRows = Math.max(
                    ...Object.values(row.cells).map((cell) =>
                      cell ? cell.length : 0
                    )
                  );

                  return Array.from({ length: subRows }).map(
                    (_, subRowIndex) => (
                      <TableRow key={`${rowIndex}-${subRowIndex}`}>
                        {subRowIndex === 0 && (
                          <TableCell rowSpan={subRows}>{row.level}</TableCell>
                        )}
                        {perspectives.map((perspective, perspectiveIndex) => (
                          <TableCell
                            key={`${rowIndex}-${perspectiveIndex}-${subRowIndex}`}
                          >
                            {row.cells[perspective][subRowIndex] || ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br />
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* Dynamically create headers from `headers` array */}
                  {headers.map((header, index) => (
                    <TableCell key={index}>{header}</TableCell>
                  ))}
                  <TableCell>Related Terms</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over the rows of the data */}
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {/* Map over each header and render corresponding data */}
                    {headers.map((header, colIndex) => (
                      <TableCell key={colIndex}>{row[header]}</TableCell>
                    ))}
                    {/* Render related terms in a new column */}
                    <TableCell>
                      {row.DefinitionTerm && row.DefinitionTerm.length > 0 ? (
                        <ul>
                          {row.DefinitionTerm.map((relatedTerm, index) => (
                            <li key={index}>{relatedTerm.subTerm_name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No related terms</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default Index;
