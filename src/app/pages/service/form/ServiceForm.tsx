import { makeStyles } from "@material-ui/styles";
import { Button, Paper, TextField } from "@material-ui/core";
//import ImageUpload from "../components/ImageUpload";
import { t } from "../../../services/LocaleService";
import { Form } from "antd";
import { Service } from "../../../generated";
import { useForm } from "antd/es/form/Form";

interface Props {
  service?: Service;
  onSubmit: (service: Service) => void;
}

/**
 * Form which allows user to register/update a service.
 */
export const ServiceForm: React.FC<Props> = ({ service, onSubmit }) => {
  const [form] = useForm();
  const onFinish = (e: any) => {
    form.validateFields().then((values) => {
      onSubmit(values);
      console.log(values);
    });
  };

  const onFinishFailed = (e: any) => {
    console.log(e);
  };

  const validateHttps = (
    rule: any,
    value: string,
    callback: (msg: string) => void
  ) => {
    if (value.startsWith("https://")) {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  console.log(service);

  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.paper}>
      <div className={classes.info}>
        <div className={classes.heading}>
          {service ? t("SERVICE.TITLE") : t("SERVICE_FORM.TITLE")}
        </div>
        <Form
          form={form}
          className={classes.info}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            id: service?.id,
            name: service?.name,
            base_url: service?.base_url,
            description: service?.description,
            summary: service?.summary,
            public_keys:
              service?.public_keys?.length && service.public_keys[0].pem, // TODO: ?
          }}
          autoComplete="off"
        >
          <Form.Item name="id" hidden={!service}>
            <TextField
              id="id"
              label={t("SERVICE.ID_LABEL")}
              disabled
              helperText={t("SERVICE.ID_HELPER_TEXT")}
            />
          </Form.Item>
          <Form.Item
            required
            name="name"
            rules={[
              { required: true, message: t("COMMON.FORM_REQUIRED_MESSAGE") },
            ]}
          >
            <TextField
              label={t("SERVICE.NAME_LABEL")}
              helperText={t("SERVICE.NAME_HELPER_TEXT")}
            />
          </Form.Item>
          <Form.Item
            name="base_url"
            rules={[
              { required: true, message: t("COMMON.FORM_REQUIRED_MESSAGE") },
              { type: "url", message: t("SERVICE_FORM.INVALID_URL_MESSAGE") },
              {
                validator: validateHttps,
                message: t("SERVICE_FORM.HTTPS_VALIDATE_ERROR"),
              },
            ]}
          >
            <TextField
              label={t("SERVICE.URL_LABEL")}
              helperText={t("SERVICE.URL_HELPER_TEXT")}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: t("COMMON.FORM_REQUIRED_MESSAGE") },
            ]}
          >
            <TextField
              label={t("SERVICE.DESCRIPTION_LABEL")}
              multiline
              helperText={t("SERVICE.DESCRIPTION_HELPER_TEXT")}
            />
          </Form.Item>
          <Form.Item
            name="summary"
            rules={[
              { required: true, message: t("COMMON.FORM_REQUIRED_MESSAGE") },
            ]}
          >
            <TextField
              label={t("SERVICE.SUMMARY_LABEL")}
              multiline
              helperText={t("SERVICE.SUMMARY_HELPER_TEXT")}
            />
          </Form.Item>
          {/* TODO: tooltip? */}

          <Form.Item
            name="public_keys"
            rules={[
              { required: true, message: t("COMMON.FORM_REQUIRED_MESSAGE") },
            ]}
          >
            <TextField
              label={t("SERVICE.KEY_LABEL")}
              multiline
              helperText={t("SERVICE.KEY_HELPER_TEXT")}
            />
          </Form.Item>

          {/* <ImageUpload /> */}

          <div className={classes.buttons}>
            <Button variant="contained" type="submit">
              <>
                {service
                  ? t("COMMON.ACTION_UPDATE")
                  : t("COMMON.ACTION_CREATE")}
              </>
            </Button>
          </div>
        </Form>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    margin: "10px",
  },
  info: {
    display: "flex",
    flexFlow: "column",
    margin: "5px",
    "& > div": {
      margin: "20px",
    },
    div: {
      width: "100%",
    },
  },
  buttons: {},
  heading: {
    fontWeight: "bold",
  },
}));
