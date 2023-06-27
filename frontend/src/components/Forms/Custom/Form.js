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

// MODES = ["NEW", "DRAFT", "REVIEW", "COMMENT"];
// LOAD EXISTING FORM DATA IF MODE ISN'T "NEW"
// DISABLE INPUT FIELDS IF MODE IS REVIEW
// ENABLE COMMENTS IF MODE IS COMMENT
export const FORM_MODES = {
  "NEW": { enableInputs: true, loadForm: false, showComments: false, enableComments: false },
  "DRAFT": { enableInputs: true, loadForm: true, showComments: false, enableComments: false },
  "REVIEW": { enableInputs: true, loadForm: true, showComments: true, enableComments: false },
  "COMMENT": { enableInputs: false, loadForm: true, showComments: true, enableComments: true },
}


export const draftButtonStyle = {
  "&.MuiButton-contained": {
    backgroundColor: "#B9B9B9"
  },
  "&:active": {
    backgroundColor: '#818181'
  },
  "&:hover": {
    backgroundColor: '#818181'
  }
};



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
      defaultValue="2020-01-01T12:00:00"
      render={({ field: { onChange, value } }) => (
        <TextField
          id={name}
          label={makeNameFancy(name)}
          onChange={onChange}
          type="datetime-local"
          defaultValue="2020-01-01T12:00:00"
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
          {settings.showComments
            ? <>
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
            : <></>
          }
        </>
      )}
    />
  );
};


/**
 * Given a radio field name and options, returns a MUI RadioGroup component with values 0, 1, ...
 * @param {string} name The form field name
 * @param {Control} control 
 * @param {string[]} options A list of options that will be displayed
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
export const FormRadioField = ({ name, control, options, settings }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <FormControl sx={{ mb: 3 }}>
            <RadioGroup
              {...field}
              onChange={(e, value) => field.onChange(parseInt(value))}
            >
              {options.map((option, idx) =>
                <FormControlLabel
                  value={idx}
                  control={<Radio />}
                  sx={{ mb: -1 }}
                  label={option}
                />
              )}
            </RadioGroup>
          </FormControl>
        </>
      )}
    />
  );
};