import React, { useContext, useState, useRef } from "react";

import {
  LinearProgress,
  Typography,
  Container,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { CryptoContext } from "../store/Context";

import useStyles from "./coinsTable.styles";

import { useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

  const classes = useStyles();

  const navigate = useNavigate();

  const { loading, coins } = useContext(CryptoContext);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const tableRef = useRef();

  const handleSearch = () => {
    if (search === "") {
      return coins;
    }
    let filterRedCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase() == search || coin.symbol.toLowerCase() == search
    );

    return filterRedCoins;
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{margin:"30px 0",color:'#FFFFFFCC'}}>
        CryptoCurrency Prices By Market cap
      </Typography>
      <TextField
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className={classes.textArea}
        label="Search Crypto . . ."
        variant="outlined"
        InputLabelProps={{
          style: { color: '#FFFFFFCC'},
       }}
      ></TextField>

      <TableContainer >
        <div ref={tableRef}></div>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "rgb(26,55,134)" }} />
        ) : (
          <Table >
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                  return (
                    <TableCell
                    className={classes.tableCell}
                      style={{ fontWeight: "700" }}
                      key={head}
                      align={head == "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={row.id}
                      onClick={() => {
                        navigate("/coins/" + row.id);
                      }}
                    >
                      <TableCell
                      className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={{ display: "flex" }}
                      >
                        <img
                          src={row.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: "10" }}
                        ></img>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "10px",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "20",
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "20",
                              color: "darkgrey",
                            }}
                          >
                            {row.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className={classes.tableCell} align="right">
                        {"$" + numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell
                      className={classes.tableCell}
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "red",
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell className={classes.tableCell} align="right">
                        ${" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, 6)
                        )}{" "}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
        <Pagination
          onChange={(_, value) => {
            setPage(value);
            tableRef.current.scrollIntoView( {behavior: "smooth",});
          }}
          className={classes.pagination}
          count={handleSearch()?.length / 10}
        ></Pagination>
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;