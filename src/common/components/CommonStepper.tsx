import Stepper, { StepperProps } from "@mui/material/Stepper";
import React from "react";
import { FC } from "react";
import CommonStepConnector from "./CommonStepConnector";

const CommonStepper: FC<StepperProps> = props => {
  const { children, orientation, ...otherprops } = props;

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { variant: "progress" });
    }
    return null;
  });

  return (
    <Stepper
      {...otherprops}
      alternativeLabel={orientation === "horizontal"}
      connector={<CommonStepConnector />}
    >
      {childrenWithProps}
    </Stepper>
  );
};

export default CommonStepper;
