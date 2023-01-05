import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingSpinner from '../../UI/LoadingIndicator';

const mongoDbRankingsEndpoint = process.env.REACT_APP_RANKINGS_ENDPOINT;

function createData(userScore, userName) {
    return { userScore, userName };
}

export default function ScoreboardTable() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scoreboardEntries, setScoreboardEntries] = useState([]);

    // Make AJAX call and use AJAX results to set local state
    useEffect(() => {
        fetch(mongoDbRankingsEndpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);

                    let newItem = [];
                    for (let i = 0; i < Object.keys(result).length; i++) {
                        newItem.push(
                            createData(result[i].score, result[i].name)
                        )
                    }

                    setScoreboardEntries(newItem);
                    console.log(newItem);

                },
                // Handle errors so that we "don't swallow
                // exceptions from actual bugs in component"
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error {error.message}</div>;
    } else if (!isLoaded) {
        return (<LoadingSpinner />);
    } else {
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
                        {scoreboardEntries.map((row) => (
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
}
