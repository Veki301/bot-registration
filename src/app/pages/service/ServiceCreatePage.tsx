import React from "react";
import { NewService, Service } from "../../generated";
import { useRequireAuth } from "../../hooks/UseAuth";
import useRouter from "../../hooks/UseRouter";
import { routes } from "../../modules/Routing";
import { ServiceForm } from "./form/ServiceForm";

// TODO: hardcoded tags?
const defaultTag = "tutorial";

const ServiceCreatePage: React.FC = () => {
  const { api } = useRequireAuth();
  const router = useRouter();

  const handleSubmit = (service: NewService | Service) => {
    const newService = service as NewService;
    api
      .createNewService({
        // TODO: hardcoded tags?
        body: {
          ...newService,
          tags: [defaultTag],
        },
      })
      .then(() => router.push(routes.home))
      .catch((e) => {
        console.log(e);
      });
  };

  return <ServiceForm onSubmit={handleSubmit} />;
};

export default ServiceCreatePage;
