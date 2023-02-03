import { makeStyles } from "@material-ui/styles";
import { useRequireAuth } from "../../hooks/UseAuth";
import { useEffect, useState } from "react";
import ComponentOrPending from "../../modules/ComponentOrPending";
import { useParams } from "react-router-dom";
import { NewService, Service } from "../../generated";
import { ServiceForm } from "./form/ServiceForm";

interface IdParam {
  id: string;
}

/**
 * Displays data about the service.
 */
export default function ServicePage() {
  const { api } = useRequireAuth();
  const { id }: IdParam = useParams();

  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const [service, setService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    setStatus("pending");
    api
      .getService(id)
      .then((r) => setService(r))
      .then(() => setStatus("idle"))
      .catch((e) => console.error(e)); // todo maybe some error handling
  }, [id, api]);

  const handleSubmit = (uService: Service | NewService) => {
    const updatedService = { ...service, ...uService };
    console.log("updatedService", updatedService);
    const payload = { body: updatedService };
    api.updateService(payload, id).then((r) => {
      console.log("updated", r);
    });
  };

  const classes = useStyles();
  return (
    <ComponentOrPending status={status}>
      <div className={classes.service}>
        {service && <ServiceForm service={service} onSubmit={handleSubmit} />}
      </div>
    </ComponentOrPending>
  );
}

const useStyles = makeStyles(() => ({
  service: {
    display: "flex",
    flexFlow: "column",
  },
  heading: {
    fontSize: "large",
    fontWeight: "bold",
  },
}));
