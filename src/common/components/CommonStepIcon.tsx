import { CheckCircle } from "@mui/icons-material";
import { StepIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

const StepIconRoot = styled("div")(({ theme }) => ({
  zIndex: 1,
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .StepIcon-completedIcon": {
    color: "#0099FF",
    fontSize: 28,
    backgroundColor: "white",
  },
  "& .StepIcon-active-circle": {
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "8px solid #66CCCC",
  },
  "& .StepIcon-normal-circle": {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "4px solid #F4F4F4",
  },
}));

const CommonStepIcon: FC<StepIconProps> = props => {
  const { active, completed, className } = props;
  return (
    <StepIconRoot className={className}>
      {completed ? (
        <CheckCircle className="StepIcon-completedIcon" />
      ) : active ? (
        <div className="StepIcon-active-circle" />
      ) : (
        <div className="StepIcon-normal-circle" />
      )}
    </StepIconRoot>
  );
};

export default CommonStepIcon;
