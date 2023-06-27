import React from "react";
import { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Input,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  Stack,
  MenuItem,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { SectionCommentHeader } from "./Section";

const makeNameFancy = (name) => name.split('_').slice(1,).map((word) =>
  word[0].toUpperCase() + word.substring(1)
).join(" ");

export const FormHeader = ({ text }) =>
  <>
    <Box
      sx={{
        padding: "15px 30px",
      }}
      display="flex"
      alignItems="center"
    >
      <Box flexGrow={1}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
    <Divider />
  </>;

/**
 * Given a form field name, returns a controlled MUI TextField component
 * @param {string} name The form field name
 * @param {boolean=?} multiline Whether the field is multiline
 * @param {Control} control 
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns  {React.Component}
 */
export const FormTextField = ({ name, control, settings, multiline = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          id={name}
          label={makeNameFancy(name)}
          onChange={onChange}
          value={value}
          multiline={multiline}
          disabled={!settings.enableInputs}
          fullWidth
        />
      )}
    />
  );
};


/**
 * Given a form field name, returns a controlled MUI TextField component with type datetime
 * @param {string} name The form field name
 * @param {boolean=?} multiline Whether the field is multiline
 * @param {Control} control 
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
export const FormDateTimeField = ({ name, control, settings, multiline = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          id={name}
          label={makeNameFancy(name)}
          onChange={onChange}
          type="datetime-local"
          value={value}
          multiline={multiline}
          disabled={!settings.enableInputs}
          fullWidth
        />
      )}
    />
  );
};

/**
 * Given a form field name, returns a comment-style, controlled MUI TextField component 
 * @param {string} name The form field name
 * @param {Control} control 
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
export const FormCommentField = ({ name, control, settings }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <SectionCommentHeader text={"Comments for section " + name.split('_')[0]} />
          <TextField
            sx={{ backgroundColor: "#ffffe1" }}
            id={name}
            onChange={onChange}
            value={value}
            disabled={!settings.enableComments}
            multiline
            minRows={3}
            fullWidth
          />
        </>
      )}
    />
  );
};