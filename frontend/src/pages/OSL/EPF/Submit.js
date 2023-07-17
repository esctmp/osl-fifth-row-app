import React, { useState, useEffect } from 'react';
import {
  SectionHeader,
  SectionBody,
  SectionCommentHeader,
} from "../../../components/Forms/Custom/Section";
import {
  TableHeader,
  TableDescription,
  TableColHeaders,
  TableRowsStatic,
  TableRowsDynamic,
} from "../../../components/Forms/Custom/Table";
import {
  convertFieldsToJSON,
  convertJSONToFields,
  getEPF,
  createEPF
} from "../../../components/Forms/Custom/Utilities";
import {
  FORM_MODES,
  draftButtonStyle,
  FormHeader,
  FormTextField,
  FormDateTimeField,
  FormCommentField,
  FormRadioField
} from "../../../components/Forms/Custom/Form";
import { Card, CardContent, Container, Divider, Box, Typography, TextField, FormControlLabel, Checkbox, Input, Button, Grid, RadioGroup, Radio, FormControl, Stack, MenuItem, FormGroup, } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

// To test this out, fill in the fields then click 'Submit' and check console for the submitted data

const EPFSubmit = ({ mode = "COMMENT" }) => {
  // DEFINE FORM CONTROL VARIABLES
  const settings = FORM_MODES[mode];
  const { handleSubmit, control, setValue } = useForm({});
  const formControl = { // global form vars that should be passed down to imported custom component
    control: control,
    settings: settings
  };

  useEffect(() => {
    if (settings.loadForm) {
      getEPF(4).then(values => Object.entries(values).map(([k, v]) => setValue(k, v)));
    }
  }, []);

  // DEFINE HANDLES 
  const submit = (data) => {
    createEPF(data);
  }

  // DEFINE SECTIONS
  const SectionA = () => {
    return (
      <>
        <SectionHeader text="A. Project Director's Particulars" />
        <Grid container spacing={6} >
          <Grid item xs={9}>
            <SectionBody text="The project director will be the main point of contact for SG Events and Office of Student Life." />
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={6}><FormTextField {...formControl} name="A_name" /></Grid>
              <Grid item xs={6}><FormTextField {...formControl} name="A_student_id" /></Grid>
              <Grid item xs={6}><FormTextField {...formControl} name="A_organisation" /></Grid>
              <Grid item xs={6}><FormTextField {...formControl} name="A_contact_number" /></Grid>
              <Grid item xs={12}><FormTextField {...formControl} name="A_email" /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} >
            <FormCommentField {...formControl} name="A_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };

  const SectionB = () => {
    return (
      <>
        <SectionHeader text="B. Event Details" sx={{ mb: 3 }} />
        <Grid container spacing={6} >
          <Grid item xs={9}>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={6}><FormTextField {...formControl} name="B_event_name" /></Grid>
              <Grid item xs={6}><FormTextField {...formControl} name="B_target_audience" /></Grid>
              <Grid item xs={6}><FormDateTimeField {...formControl} name="B_event_schedule" /></Grid>
              <Grid item xs={6}><FormTextField {...formControl} name="B_expected_turnout" /></Grid>
              <Grid item xs={12}><FormTextField {...formControl} name="B_event_objective" multiline={true} /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} >
            <FormCommentField {...formControl} name="B_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };


  const SectionC = () => {
    const tableSettingsC1 = {
      names: ['C1_date', 'C1_time', 'C1_activity_and_description', 'C1_venue'],
      colConfig: [3, 2, 4, 3],
      colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
    }
    const tableSettingsC2 = {
      names: ['C2_date', 'C2_time', 'C2_activity_and_description', 'C2_venue'],
      colConfig: [3, 2, 4, 3],
      colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
    }
    const tableSettingsC3_1 = {
      names: ['C3_date', 'C3_time', 'C3_activity_and_description', 'C3_venue'],
      colConfig: [3, 2, 4, 3],
      colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
    };
    const tableSettingsC3_2 = {
      // Replace 'C3_cleanup' with 'C3cleanup' to not break processing
      names: ['C3cleanup_date', 'C3cleanup_time', 'C3cleanup_activity_and_description', 'C3cleanup_venue'],
      colConfig: [3, 2, 4, 3],
      colNames: ['Clean Up']
    }
    return (
      <>
        <SectionHeader text="C. Programme Schedule" />

        <Grid container spacing={6} >
          <Grid item xs={9}>
            <SectionBody text="Please include all the necessary details about each activity and other necessary details such as wet weather plan. The project director is incharge of ensuring the plan is followed." />

            <TableHeader text="C.1 Pre-Event" />
            <TableDescription text="Include details regarding your pre-event set up." />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsC1} />
              <TableRowsDynamic {...formControl} {...tableSettingsC1} />
            </Grid >

            <TableHeader text="C.2 Event" />
            <TableDescription text="Include details regarding your event and description of each activity." />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsC2} />
              <TableRowsDynamic {...formControl} {...tableSettingsC2} />
            </Grid >

            <TableHeader text="C.3 Post-Event" />
            <TableDescription text="Include details regarding your post event clean up, management of resources and waste and excess food." />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsC3_1} />
              <TableRowsDynamic {...formControl} {...tableSettingsC3_1} />
              <TableColHeaders  {...tableSettingsC3_2} colConfig={[12]} />
              <TableRowsDynamic {...formControl} {...tableSettingsC3_2} />
            </Grid >
          </Grid>

          <Grid item xs={3} >
            <FormCommentField {...formControl} name="C_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };


  const SectionD = () => {
    const tableSettingsD1A = {
      names: [['D1A_club_income_fund'], ["D1A_osl_seed_fund"],
      ["D1A_donation"]],
      rowNames: ["Club Income Fund", "OSL Seed Fund", "Donation"],
      colConfig: [6, 6],
      colNames: ['Source', 'Amount ($)']
    };

    const tableSettingsD1B = {
      names: [['D1B_revenue'], ["D1B_donation_or_scholarship"],
      ["D1B_total_source_of_funds"]],
      rowNames: ["Revenue from Sales of Goods and Services (Please complete table D.1.1)", "Donation or Scholarship", "Total Source of Funds"],
      colConfig: [6, 6],
      colNames: ['Source', 'Amount ($)']
    };
    const tableSettingsD11_1 = {
      names: ["D11_items_goods_services", "D11_price", "D11_quantity", "D11_amount"],
      colConfig: [3, 3, 3, 3],
      colNames: ['Item/Goods/Services', 'Price ($)', 'Quantity', 'Amount ($)']
    };
    const tableSettingsD11_2 = {
      names: [['D11_total_revenue']],
      rowNames: ['Total Revenue'],
      colConfig: [6, 6],
    };
    const tableSettingsD2_1 = {
      names: ['D2_items', 'D2_reason_for_purchase', 'D2_venue'],
      colConfig: [4, 4, 4],
      colNames: ['Item', 'Reason for Purchase', 'Venue']
    };
    const tableSettingsD2_2 = {
      names: [['D2_total_expenditure']],
      rowNames: ['Total Expenditure'],
      colConfig: [6, 6],
    }
    return (
      <>
        <SectionHeader text="D. Project Finances" />

        <Grid container spacing={6} >
          <Grid item xs={9}>
            <TableHeader text="D.1 Budget: Please indicate the sources of funding for your event." />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsD1A} />
              <TableRowsStatic {...formControl} {...tableSettingsD1A} />
              <TableColHeaders {...tableSettingsD1B} />
              <TableRowsStatic {...formControl} {...tableSettingsD1B} />
            </Grid >

            <TableHeader text="Table D.1.1" />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsD11_1} />
              <TableRowsDynamic {...formControl} {...tableSettingsD11_1} />
              <TableRowsStatic {...formControl} {...tableSettingsD11_2} />
            </Grid >

            <TableHeader text="D.2. Expenditure" />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...tableSettingsD2_1} />
              <TableRowsDynamic {...formControl} {...tableSettingsD2_1} />
              <TableRowsStatic {...formControl} {...tableSettingsD2_2} />
            </Grid >
          </Grid>

          <Grid item xs={3} >
            <FormCommentField {...formControl} name="D_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };


  const SectionE = () => {
    return (
      <>
        <SectionHeader text="E. Personal data protection declaration" />

        <Grid container spacing={6} >
          <Grid item xs={9}>
            <SectionBody text={<>
              Personal data refers to data, whether true or not, about an individual who can be identified from that data; or from that data and other information to which SUTD has or is likely to have access. These include:
              <br></br>1. Unique identifiers: NRIC Numbers, passport numbers, student IDs.
              <br></br>2. Any set of data (e.g. name, age, address, telephone number, occupation, etc), which when taken together would be able to identify the individual.
              <br></br>3. Image of an identifiable individual (whether in photographs or videos).</>} />
            <Typography sx={{ fontWeight: 'bold', color: 'red' }}>
              Are you collecting personal data? Please tick accordingly.
            </Typography>

            <FormRadioField {...formControl} name="E_personal_data" options={["No", "Yes. Please complete the Microsoft Form: https://forms.office.com/r/RzNvq976m9."]} />

            <SectionBody text={<>
              By submitting this form, the project director agrees to abide by the personal data protection clauses as stated below.
              <br></br>1. All the personal data processed** for the event are for the purposes of communications and facilitating participation in the event. The information shall not be released to any other 3rd party or person (i.e sponsors/donors) other than the organizing committee and relevant persons facilitating the event, without prior approval from OSL. The information collated cannot be used for any other purpose other than for the event itself and will be disposed appropriately upon the completion of event.
              <br></br>2. The personal information collected will be deleted one month after the event, or at the date as per declaration to OSL.
              <br></br>3. The above obligations will be communicated to the participants in the consent clause, prior to or at the point of data collection (i.e. the prescribed clause as reflected on the Microsoft Form).
              <br></br>4. Data platforms used for the collection of the data would be kept secure, private and accessible to only authorized persons.
              <br></br>5. The event team will not collect any excessive personal data from the participants other than ones necessary for the event.
              <br></br>6. Under no circumstances, the collected personal data is to be transferred overseas to any external parties abroad unless clearance is first sought from OSL.</>} />
            <SectionBody text={<>
              **The Personal Data Protection Act (PDPA) defines ‘processing’ as ‘the carrying out of any operation or set of operations in relation to the personal data, and it includes recording, holding and transmission’ (non-exhaustive list of operations which forms part of collection, use or disclosure).</>} />
          </Grid>
          <Grid item xs={3} >
            <FormCommentField {...formControl} name="E_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };

  const SectionF = () => {
    const tableSettingsF = {
      names: ['F_name', 'F_student_id', 'F_position'],
      colNames: ['Name', 'Student ID', 'Position'],
      colConfig: [4, 4, 4]
    }
    return (
      <>
        <SectionHeader text="F. Organising Committee Members" />

        <Grid container spacing={6} >
          <Grid item xs={9}>
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...formControl} {...tableSettingsF} />
              <TableRowsDynamic {...formControl} {...tableSettingsF} />
            </Grid >
          </Grid>

          <Grid item xs={3} >
            <FormCommentField {...formControl} name="F_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };


  const SectionG = () => {
    const tableSettingsG = {
      names: [
        ["G_1_1", "G_1_2", "G_1_3"],
        ["G_2_1", "G_2_2", "G_2_3"],
        ["G_3_1", "G_3_2", "G_3_3"],
        ["G_4_1", "G_4_2", "G_4_3"],
        ["G_5_1", "G_5_2", "G_5_3"],
        ["G_6_1", "G_6_2", "G_6_3"],
        ["G_7_1", "G_7_2", "G_7_3"]
      ],
      colNames: [
        'Areas for Safety Consideration',
        <>Potential Hazard<br></br><div style={{ fontWeight: 'normal' }}><i>What could go wrong?<br></br>List in point form</i></div></>,
        <>Measures to Address Hazard<br></br><div style={{ fontWeight: 'normal' }}><i>What is your plan to prevent it from happening, or to reduce the potential damage? List in point form</i></div></>,
        <>Person-in-charge<br></br><div style={{ fontWeight: 'normal' }}><i>Who will implement the plan?<br></br>List in point form</i></div></>
      ],
      colConfig: [3, 3, 3, 3],
      rowNames: [
        <>Social/Emotional<br></br><div style={{ fontWeight: 'normal' }}>e.g. hazing, bullying, emotional or physical harassment, sexual harassment, insensitive jokes, disrespecting other cultures, races or religions</div></>,
        <>Political Agenda<br></br><div style={{ fontWeight: 'normal' }}>e.g. the event will evoke or promote a political agenda that is sensitive to different groups in the community and society at large, and/or endanger harmonious relations between different groups in the community</div></>,
        <>Environment<br></br><div style={{ fontWeight: 'normal' }}>e.g. fire, damage to facilities/venues, electricity trip, water/food wastage, excessive use of non-renewable resources, poor air quality etc.</div></>,
        <>Reputational<br></br><div style={{ fontWeight: 'normal' }}>e.g. being viewed as public nuisance, disturbance of public peace , misrepresentation of SUTD, misleading marketing content, poor management of social media campaigns etc.</div></>,
        <>Financial<br></br><div style={{ fontWeight: 'normal' }}>e.g. losses for events, incurring of legal/compensation fees, failure to collect payment owed to SUTD, unexpected travel/medical expenses etc.</div></>,
        <>Legal<br></br><div style={{ fontWeight: 'normal' }}>e.g. being sued for personal data leaks, infringement of copyrights, any illegal or unlawful actions, negligence resulting in injuries/damages/losses etc.</div></>,
        <>List all Other Risks not listed in this table and not already identified in Annex A.<br></br><div style={{ fontWeight: 'normal' }}>This may include potential infringements of any University policies, core values and applicable regulations governing the organization and execution of an event. </div></>
      ],
    }
    return (
      <>
        <SectionHeader text="G. Risk Assessment" />

        <Grid container spacing={6} >
          <Grid item xs={9}>
            <SectionBody text={<>
              (i) Please complete Annex A Integrated Form for Risk Assessment on Work Activities for physical/physiological risks e.g. sports/trauma injuries, trip/fall hazards, poor lighting, dangerous/faulty equipment, stampede/crushing risks, hearing damage, fatigue, food poisoning, infectious diseases etc. and submit together with this Event Proposal Form.
              <br></br>(ii) Please also complete the following table for all other types of risks. Where no risk has been identified for any category listed below, indicate a “NIL” in the column under Potential Hazard for that risk category.
            </>} />
            <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
              <TableColHeaders {...formControl} {...tableSettingsG} />
              <TableRowsStatic {...formControl} {...tableSettingsG} />
            </Grid >
          </Grid>

          <Grid item xs={3} >
            <FormCommentField {...formControl} name="G_comments_OSL" />
          </Grid>
        </Grid>
      </>
    );
  };


  // RENDERING
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <div>
          <Card
            variant="outlined"
            sx={{
              p: 0,
            }}
          >
            <FormHeader text="Event Proposal Form" />
            <Grid container spacing={0}>
              <Grid item lg={12} md={12}>
                <CardContent
                  sx={{
                    padding: "30px",
                  }}
                >
                  <form>
                    <FormGroup>
                      <SectionA />
                      <SectionB />
                      <SectionC />
                      <SectionD />
                      <SectionE />
                      <SectionF />
                      <SectionG />
                      <Stack spacing={2} direction="row" justifyContent="center">
                        <Button style={{ width: 120, height: 40 }} color="success" variant="contained" 
                          onClick={handleSubmit(
                            async (data) => {
                              data.status = "Approved"; submit(data);
                            })}>
                          Approve
                        </Button>
                        <Button style={{ width: 120, height: 40 }} color="error" variant="contained"
                          onClick={handleSubmit(
                            async (data) => {
                              data.status = "Declined"; submit(data);
                            })}>
                          Decline
                        </Button>
                        <Button style={{ width: 120, height: 40 }} sx={draftButtonStyle} variant="contained" 
                          onClick={handleSubmit(
                            async (data) => {
                              data.status = "Draft_OSL"; submit(data);
                            })}>
                          Save draft
                        </Button>
                      </Stack>
                    </FormGroup>
                  </form>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default EPFSubmit;