import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { useRequireAuth } from "../../../hooks/UseAuth";
import { t } from "../../../services/LocaleService";

export default function Header() {
  const { user, logout } = useRequireAuth();
  const styles = useStyles();
  return (
    <div className={styles.header}>
      <Button onClick={logout}>
        {t("COMMON.ACTION_LOGOUT")} - {user}
      </Button>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
  },
}));
