import styled from "@emotion/styled";
import {
  StepConnector,
  stepConnectorClasses,
  StepConnectorProps,
} from "@mui/material";
import { FC } from "react";

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    zIndex: 0,
    top: 10,
    left: "calc(-50%)",
    right: "calc(50%)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, #0099FF 0%, #66CCCC 52.74%, #E2F3FF 100.27%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0099FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaea",
    borderRadius: 1,
  },
}));

const CommonStepConnector: FC<StepConnectorProps> = props => {
  const { ...otherprops } = props;
  return <Connector {...otherprops} />;
};

export default CommonStepConnector;
