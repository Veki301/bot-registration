import { Button, Card, Grid } from "@material-ui/core";
import React, { SyntheticEvent } from "react";
import ImageWithFallback from "../../../common/Image";
import { Service } from "../../../generated";
import { t } from "../../../services/LocaleService";

interface Props {
  item: Service;
  onServiceClick: (id?: string) => void;
  onEnable: (service: Service) => void;
}

const ServiceListItem: React.FC<Props> = ({
  item,
  onServiceClick,
  onEnable,
}: Props) => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    onEnable(item);
  };
  return (
    <Card style={cardStyle} onClick={() => onServiceClick(item.id)}>
      <Grid container spacing={1}>
        <ImageWithFallback />
        <Grid item textAlign="start">
          <Grid item>
            {t("SERVICE_LIST.ITEM.NAME_LABEL")}: {item.name}
          </Grid>
          <Grid item>
            {t("SERVICE_LIST.ITEM.URL_LABEL")}: {item.base_url}
          </Grid>
          <Grid item>
            {t("SERVICE_LIST.ITEM.STATUS_LABEL")}:{" "}
            {item.enabled
              ? t("COMMON.STATE_ENABLED")
              : t("COMMON.STATE_DISABLED")}
          </Grid>
        </Grid>
      </Grid>
      <Grid style={descriptionStyle} item textAlign="start">
        {t("SERVICE_LIST.ITEM.DESCRIPTION_LABEL")}: {item.description}
      </Grid>
      <Grid item textAlign="end">
        <Button
          color={item.enabled ? "error" : "primary"}
          variant="contained"
          onClick={handleClick}
        >
          {item.enabled
            ? t("COMMON.ACTION_DISABLE")
            : t("COMMON.ACTION_ENABLE")}
        </Button>
      </Grid>
    </Card>
  );
};

const cardStyle = {
  margin: "10px",
  padding: "15px",
  cursor: "pointer",
};

const descriptionStyle = {
  padding: "3px",
};

export default ServiceListItem;
