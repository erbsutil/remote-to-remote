import React, { useState, useEffect } from "react";
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Modal,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomMaterial from "./Material";

import { db } from "./Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import CreatePlace from "./CreatePlace";

import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import PowerIcon from "@material-ui/icons/Power";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CashIcon from "@material-ui/icons/AttachMoney";

import * as S from "./styles";

// const usePlaces = () => {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     firebase
//       .firestore()
//       .collection("enderecos")
//       .onSnapshot((snapshot) => {
//         const places = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setPlaces(places);
//       });
//   }, []);

//   return places;
// };

const App = () => {
  const classes = CustomMaterial();
  // const places = usePlaces();
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "places"));

    onSnapshot(q, (querySnapshot) => {
      setPlaces(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <React.Fragment>
      <AppBar elevation={0} position="relative" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="primary"
            noWrap
            className={classes.menuButton}
          >
            Nome
          </Typography>
          <nav>
            <Button size="large" onClick={() => setOpen(true)}>
              Recomendar
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <S.Cover>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Titulo
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Subtítulo
          </Typography>
          <div>
            <Autocomplete
              freeSolo
              disableClearable
              options={places && places.map((place) => place.data.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search place"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
        </Container>
      </S.Cover>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {places &&
            places.map((place) => (
              <Grid item key={place.data.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {place.data.name}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ gap: 6 }}
                    >
                      <Grid>
                        <SignalWifi4BarIcon fontSize="small" />
                      </Grid>
                      <Grid>{place.data.wifi}</Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ gap: 6 }}
                    >
                      <Grid>
                        <PowerIcon fontSize="small" />
                      </Grid>
                      <Grid>{place.data.outlet}</Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ gap: 6 }}
                    >
                      <Grid>
                        <CashIcon fontSize="small" />
                      </Grid>
                      <Grid>{place.data.price}</Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
      </footer>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreatePlace />
      </Modal>
    </React.Fragment>
  );
};

export default App;
