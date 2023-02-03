import React from "react";
import { Modal, TextField, Button, Card, Typography } from "@material-ui/core";
import { t } from "../../../services/LocaleService";
import useInput from "../../../hooks/UseInput";
import { createModal } from "react-modal-promise";

interface Props {
  isOpen: boolean;
  onResolve: (value: string) => void;
  onReject: () => void;
}
const PromiseModal: React.FC<Props> = ({ isOpen, onResolve, onReject }) => {
  const { value: password, bind: bindPassword } = useInput("");

  const handleClick = () => {
    onResolve(password);
    bindPassword.value = "";
  };

  return (
    <Modal open={isOpen} onBackdropClick={onReject} onClose={onReject}>
      <Card style={style}>
        <Typography variant="h6">{t("MODAL_PROMPT.TITLE")}</Typography>
        <TextField
          required
          id="password"
          type="password"
          label={t("COMMON.PASSWORD_LABEL")}
          {...bindPassword}
        />
        <Button variant="contained" onClick={handleClick}>
          {t("COMMON.ACTION_SUBMIT")}
        </Button>
      </Card>
    </Modal>
  );
};

const style = {
  margin: "50px auto",
  height: "50vh",
  width: "50vw",
  display: "grid",
};

const ModalPrompt = createModal(PromiseModal);

export default ModalPrompt;
