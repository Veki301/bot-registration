import { Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Service } from "../../../generated";
import useApi from "../../../hooks/UseApi";
import useRouter from "../../../hooks/UseRouter";
import { routes } from "../../../modules/Routing";
import { t } from "../../../services/LocaleService";
import ModalPrompt from "../components/ModalPrompt";
import ServiceListItem from "./ServiceListItem";
import ModalContainer from "react-modal-promise";

interface Props {
  serviceList: Service[];
  refreshList: () => void;
}

const ServiceList: React.FC<Props> = ({ serviceList, refreshList }: Props) => {
  const router = useRouter();
  const api = useApi();

  const handleNewServiceClick = () => {
    router.push(routes.new);
  };

  const onServiceClick = (id?: string) => {
    router.push(routes.service + `/${id}`);
  };

  const handleEnableService = async (service: Service) => {
    await ModalPrompt({ isOpen: true })
      .then((passwd) => {
        const payload = {
          body: {
            ...service,
            public_keys: [
              service.public_keys?.length && service.public_keys[0].pem,
            ],
            enabled: !service.enabled,
            password: passwd,
          },
        };
        if (service.id) {
          api.updateServiceConnection(payload, service.id).then((r) => {
            refreshList();
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Paper>
      <ModalContainer />
      <Typography variant="h5">{t("SERVICE_LIST.TITLE")}</Typography>
      <div style={headerStyle}>
        <Button variant="contained" onClick={handleNewServiceClick}>
          {t("SERVICE_LIST.CREATE_BUTTON")}
        </Button>
      </div>
      {serviceList.map((item) => {
        return (
          <ServiceListItem
            key={item.id}
            item={item}
            onServiceClick={onServiceClick}
            onEnable={handleEnableService}
          />
        );
      })}
    </Paper>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
};

export default ServiceList;
