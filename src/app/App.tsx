import React from "react";
import Routing from "./modules/Routing";
import { makeStyles } from "@material-ui/styles";
import LocaleService from "./services/LocaleService";
import MESSAGES from "./services/messages";

const defaultLocale = "en";

LocaleService.initLocalization(defaultLocale, MESSAGES);

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.page}>
        <div className={classes.information}>
          <Routing />
        </div>
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
  },
  page: {
    display: "flex",
    flexFlow: "column",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "2%",
    flexGrow: 1,
  },
  information: {
    display: "flex",
    flexFlow: "column",
    padding: "20px",
    flexGrow: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: "800px",
  },
});
