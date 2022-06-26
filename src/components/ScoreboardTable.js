import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(userScore, userName) {
    return { userScore, userName };
}

const rows = [];

/// API TO DATABASE ///
const mongoDatabaseEndpoint = 'http://localhost:4000/scoreboard/rankings';
async function getapi() {
    // Store response
    const response = await fetch(mongoDatabaseEndpoint);
    // Store data in form of JSON
    var data = await response.json();
    // console.log(data);
    // show(data);
    for (let i = 0; i < Object.keys(data).length; i++) {
        rows.push(
            createData(data[i].score, data[i].name)
        )
    }
}
getapi(); //TODO THIS AINT THE REACT WAY
/// API TO DATABASE ///

export default function ScoreboardTable() {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Score</TableCell>
                        <TableCell align="right">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.userScore}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.userScore}
                            </TableCell>
                            <TableCell align="right">{row.userName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
