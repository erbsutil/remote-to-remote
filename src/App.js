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
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomMaterial from "./Material";
import DB from "./Firebase";

const App = () => {
  const classes = CustomMaterial();
  
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    const response = DB.collection("enderecos");
    const data = await response.get();
    data.docs.forEach((item) => {
      setPlaces([...places, item.data()]);
    });
  };

  useEffect(() => {
    fetchPlaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <AppBar elevation={0} position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="primary" noWrap>
            Remote to Remote
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Title
            </Typography>
            <div>
              <Autocomplete
                freeSolo
                disableClearable
                options={places && places.map((place) => place.cidade)}
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
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {places &&
              places.map((place) => (
                <Grid item key={place} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {place.cidade}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
      </footer>
    </React.Fragment>
  );
};

export default App;
