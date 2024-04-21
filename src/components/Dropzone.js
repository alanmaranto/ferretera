"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import { PhotoPreview } from "./PhotoPreview";

export const Dropzone = ({
  text,
  preview,
  setValue,
  onRemove,
  register,
  photo,
  setPhoto,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDrop = (acceptedFiles, fileRejections) => {
    const file = acceptedFiles[0];

    if (fileRejections.length >= 1) {
      enqueueSnackbar("El tamaño de imagen no debe ser mayor a 5MB", {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }

    setPhoto(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setValue("image", file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    multiple: false,
    onDrop: handleDrop,
    maxSize: 5242880,
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          border: `2px dashed #9d9d9d`,
          borderRadius: "12px",
          width: "100%",
          height: "auto",
          ":hover": {
            cursor: "pointer",
            borderColor: theme.palette.primary.hover,
            transition: "all 0.3s ease-out",
          },
        })}
        component="section"
      >
        <Stack
          alignItems="center"
          gap={1}
          width="100%"
          padding={{ xs: 4, md: 8 }}
          sx={{ background: "white" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} {...register("image")} />
          <Box>
            <Image
              src="/photos-filled-svgrepo-com.svg"
              alt="logo"
              width="40"
              height="40"
            />
          </Box>
          <Typography variant="body" color="grey.text" textAlign="center">
            {text}
          </Typography>
        </Stack>
      </Box>

      {preview && photo ? (
        <PhotoPreview photo={photo} onRemove={onRemove} />
      ) : null}
    </>
  );
};
