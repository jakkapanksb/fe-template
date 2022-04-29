import { StepLabel, StepLabelProps } from "@mui/material";
import { FC } from "react";
import CommonStepIcon from "./CommonStepIcon";

const CommonStepLabel: FC<StepLabelProps> = props => {
  const { children, ...otherprops } = props;
  return (
    <StepLabel StepIconComponent={CommonStepIcon} {...otherprops}>
      {children}
    </StepLabel>
  );
};

export default CommonStepLabel;
