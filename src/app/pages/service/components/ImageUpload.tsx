import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import useApi from "../../../hooks/UseApi";
import { blobToArrayBuffer } from "../../../services/ImageUtils";

const previewStyle = {
  maxHeight: "30vh",
  width: "fit-content",
  alignSelf: "center",
};

// async function convertToByteArray(file: any) {
//   const reader = new FileReader();
//   return new Promise((resolve, reject) => {
//     reader.onload = () => {
//       resolve(new Uint8Array(reader.result as ArrayBuffer));
//     };
//     reader.onerror = reject;
//     reader.readAsArrayBuffer(file);
//   });
// }

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const api = useApi();

  const handleChange = async (event: any) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const fileType = file["type"];
      const validTypes = ["image/jpeg", "image/png"];

      if (validTypes.includes(fileType)) {
        setPreviewUrl(URL.createObjectURL(file));

        const imageBuffer = blobToArrayBuffer(event.target.files);
        const response = api.uploadImage(imageBuffer);
      }
    }
    // const file = event.target.files && event.target.files[0];
    // const fileType = file && file["type"];
    // const validTypes = ["image/jpeg", "image/png"];

    // if (validTypes.includes(fileType)) {
    //   setPreviewUrl(URL.createObjectURL(file));
    //   setImage(file);

    //   const byteArray = await blobToArrayBuffer([file]);
    //   const response = api.uploadImage(byteArray);

    //   console.log(response);
    // }
    // TODO: finish
    console.log(event.target.files);
  };

  return (
    <>
      <TextField
        type="file"
        onChange={handleChange}
        helperText={"Bot avatar."}
      />
      {previewUrl && (
        <img style={previewStyle} src={previewUrl} alt="Preview" />
      )}
    </>
  );
};

export default ImageUpload;
