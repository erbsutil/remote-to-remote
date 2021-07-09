import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import firebase from "./Firebase";

const useStyles = (theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("enderecos");
    this.unsubscribe = null;
    this.state = {
      boards: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { cidade } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        cidade,
      });
    });
    this.setState({
      boards,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { classes } = this.props;
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
                  options={this.state.boards.map((option) => option.cidade)}
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
              {this.state.boards.map((board) => (
                <Grid item key={board} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {board.cidade}
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
  }
}

export default withStyles(useStyles)(App);
