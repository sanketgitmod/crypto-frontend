import Table from "../components/Table";
import { Box, Button, Typography } from "@mui/material";
import Router from "next/router";

export default function Home(props) {
  const saveData = () => {
    fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/exchange-list`,
      {
        method: "POST",
      }
    ).then(() => Router.reload());
  };
  return (
    <>
      <Box sx={{ marginLeft: 50 }}>
        <Typography gutterBottom variant="h5" component="div">
          Top crypto exchanges
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compare all 190 top crypto exchnages the list is ranked by trading
          volume
        </Typography>
        <Button sx={{ margin: 1 }} variant="contained" onClick={saveData}>
          fetch Exchange
        </Button>

        <Table row={props.row} />
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/exchange-list`
  );
  const result = await res.json();

  const rowItems = result.map((row) => {
    return {
      id: row._id.toString(),
      name: row?.name,
      volume_1day_usd: row?.volume_1day_usd,
      imageUrl: row?.imageUrl || "",
    };
  });
  return {
    props: {
      row: rowItems,
    },
  };
}
