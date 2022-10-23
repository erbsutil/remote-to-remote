import React, { useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import CustomMaterial from "./Material";
// import firebase from "./Firebase";
import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";

const CreatePlace = () => {
  const [localData, setLocalData] = useState({
    address: null,
    city: null,
    name: null,
    outlet: null,
    price: null,
    state: null,
    wifi: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "places"), {
        address: localData?.address,
        city: localData?.city,
        name: localData?.name,
        outlet: localData?.outlet,
        price: localData?.price,
        state: localData?.state,
        wifi: localData?.wifi,
      });
    } catch (err) {
      alert(err);
    }
  };

  const classes = CustomMaterial();

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Recomendar novo local
            </Typography>

            <TextField
              required
              id="name"
              name="name"
              label="Nome do local"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  name: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="city"
              name="city"
              label="Cidade"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  city: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="state"
              name="state"
              label="Estado"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  state: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="address"
              name="address"
              label="Endereço"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  address: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="wifi"
              name="wifi"
              label="Wifi"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  wifi: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="outlet"
              name="outlet"
              label="Tomada"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  outlet: e.target.value,
                }));
              }}
            />

            <TextField
              required
              id="price"
              name="price"
              label="Preço"
              fullWidth
              onChange={(e) => {
                setLocalData((localData) => ({
                  ...localData,
                  price: e.target.value,
                }));
              }}
            />

            <Container style={{ textAlign: "center", marginTop: 30 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Recomendar
              </Button>
            </Container>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default CreatePlace;

// import React from "react";
// import {
//   AppBar,
//   Grid,
//   Toolbar,
//   Typography,
//   Container,
// } from "@material-ui/core";
// import CustomMaterial from "./Material";
// import firebase from "./Firebase";

// const App = () => {
//   const classes = CustomMaterial();

//   const setNewPlace = async () => {
//     const citiesRef = DB.collection("enderecos");
//     const data = await citiesRef.doc("SF").set({
//       cep: "123",
//       cidade: "Pato",
//       estado: "PR",
//       numero: "123",
//       rua: "nome da rua",
//     });

//     console.log(data);
//   };

//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const addNote = () => {
//     firebase.firestore().collection("notes").add({
//       title,
//       body,
//     });

//     setTitle("");
//     setBody("");
//   };

//   return (
//     <React.Fragment>
//       <AppBar elevation={0} position="relative">
//         <Toolbar className={classes.toolbar}>
//           <Typography variant="h6" color="primary" noWrap>
//             Onde trabalhar remoto
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <main>
//         <div className={classes.heroContent}>
//           <Container maxWidth="sm">
//             <Typography
//               component="h1"
//               variant="h2"
//               align="center"
//               color="text.primary"
//               gutterBottom
//             >
//               Onde trabalhar remoto
//             </Typography>
//           </Container>
//         </div>
//         <Container className={classes.cardGrid} maxWidth="md">
//           <Grid container spacing={4}>
//             bla
//           </Grid>
//         </Container>
//       </main>
//       <footer className={classes.footer}>
//         <Typography variant="h6" align="center" gutterBottom>
//           Footer
//         </Typography>
//       </footer>
//     </React.Fragment>
//   );
// };

// export default App;
