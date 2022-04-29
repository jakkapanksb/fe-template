import { Step, StepProps } from "@mui/material";
import React from "react";
import { FC } from "react";

const CommonStep: FC<StepProps> = props => {
  const { children, ...otherprops } = props;
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return null;
  });
  return <Step {...otherprops}>{childrenWithProps}</Step>;
};
export default CommonStep;
