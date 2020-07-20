import React from "react";

import { getAccessToken, setAccessToken } from "@saruni/auth";

type ExtractImageFunction = (files: FileList) => Promise<string | ArrayBuffer>;

type UploadImageFunction = (image?: string | ArrayBuffer) => Promise<string>;

type ImageState = {
  error: string | undefined;
  image: string | undefined;
  location: string | undefined;
  imageProcessing: boolean;
  imageUploading: boolean;
};

type Validator = (size: number, type: string) => string | void;

type ImageUploadHookOptions = {
  validation?: Validator;
  headers?: HeadersInit;
};

type ImageUploadHook = (
  options?: ImageUploadHookOptions
) => [ExtractImageFunction, UploadImageFunction, ImageState];

const useImageUpload: ImageUploadHook = (options) => {
  const emptyValidation: Validator = () => undefined;

  const validation = options?.validation || emptyValidation;

  const [image, setImage] = React.useState(undefined);
  const [location, setLocation] = React.useState(undefined);
  const [imageProcessing, setImageProcessing] = React.useState(false);
  const [imageUploading, setImageUploading] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const extractImage = React.useCallback<ExtractImageFunction>((files) => {
    return new Promise((resolve, reject) => {
      setImageProcessing(true);

      const imageFile = files[0];

      const validationResult = validation(imageFile.size, imageFile.type);

      if (validationResult) {
        setImageProcessing(false);

        setError(validationResult);

        return reject(validationResult);
      }

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onerror = () => {
        setImageProcessing(false);

        reject();
      };

      reader.onload = () => {
        setImage(reader.result);

        setImageProcessing(false);

        resolve(reader.result);
      };
    });
  }, []);

  const uploadImage = React.useCallback<UploadImageFunction>(
    async (imageArg) => {
      const imgToUse = imageArg || image;

      if (!imgToUse || error || imageProcessing || imageUploading) {
        return;
      }

      const getAPIEndpoint = (r) => "";

      try {
        setImageUploading(true);
        const r = await fetch(getAPIEndpoint("refresh_token"), {
          method: "POST",
          credentials: "include",
        });

        const json = await r.json();

        setAccessToken(json.jwt);

        const result = await fetch(
          "https://imymthalsh.execute-api.eu-west-1.amazonaws.com/dev/image_upload",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ image: imageArg || image }),
            headers: {
              "content-type": "application/json",
              authentication: `bearer ${getAccessToken()}`,
              ...options?.headers,
            },
          }
        );

        const { location } = (await result.json()) as { location: string };

        setLocation(location);

        setImageUploading(false);

        return location;
      } catch (e) {
        setError(e);

        setImageUploading(false);
      }
    },
    [image, error, imageProcessing, imageUploading]
  );

  return [
    extractImage,
    uploadImage,
    { error, image, location, imageProcessing, imageUploading },
  ];
};

export default useImageUpload;
