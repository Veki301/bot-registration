import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import useApi from "../../hooks/UseApi";
import { NewUser } from "../../generated";
import RegistrationSuccess from "./components/RegistrationSuccess";
import RegistrationForm from "./components/RegistrationForm";

/**
 * Registration page.
 */
export default function RegistrationPage() {
  const api = useApi();

  const [registered, setRegistered] = useState<boolean>(false);

  const register = async (registration: NewUser) => {
    try {
      api
        .registerBotProvider({ body: registration })
        .then(() => setRegistered(true));
    } catch (e) {
      console.error(e);
      // TODO: validation?
      throw new Error(
        "An error occurred during registration, did you set valid email? " +
          "Also the password must be at least 6 characters."
      );
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.page}>
      {registered ? (
        <RegistrationSuccess />
      ) : (
        <RegistrationForm register={register} />
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  page: {
    display: "flex",
    flexFlow: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    "& > div": {
      margin: "10px",
      width: "25ch",
    },
  },
  warningBox: {
    color: "red",
    textAlign: "justify",
  },
  infoBox: {},
}));
