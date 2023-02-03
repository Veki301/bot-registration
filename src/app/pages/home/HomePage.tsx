import Header from "./components/Header";
import ServiceList from "../service/list/ServiceList";
import { useEffect, useState } from "react";
import useApi from "../../hooks/UseApi";
import { Service } from "../../generated";

/**
 * Login Page, redirects to home after
 */
export default function HomePage() {
  const api = useApi();
  const [serviceList, setServiceList] = useState<Service[]>([]);

  useEffect(() => {
    fetchServiceList();
  });

  const fetchServiceList = () => {
    api
      .getServiceList()
      .then((r) => {
        setServiceList(r);
      })
      .catch((e) => console.error(e)); // todo maybe some error handling
  };

  return (
    <>
      <Header />
      <ServiceList serviceList={serviceList} refreshList={fetchServiceList} />
    </>
  );
}
