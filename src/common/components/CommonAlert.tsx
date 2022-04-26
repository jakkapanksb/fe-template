import { Alert, AlertProps, Box } from "@mui/material";
import { FC, memo, ReactNode } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface CommonAlertProps extends Omit<AlertProps, "variant"> {
  children?: ReactNode;
  variant: "success" | "info" | "warning" | "error";
  content?: string | ReactNode;
}

const CommonAlert: FC<CommonAlertProps> = props => {
  const { children, variant, content, ...otherProps } = props;

  const icons = {
    success: <CheckCircleOutlineIcon aria-label="success-icon" />,
    error: <WarningAmberIcon aria-label="error-icon" />,
    warning: <WarningAmberIcon aria-label="warning-icon" />,
    info: <InfoOutlinedIcon aria-label="info-icon" />,
  };

  //wait for color theme spec
  const alertColor = {
    success: {
      color: "#1C6643",
      backgroundColor: "#E3F5E6",
      borderColor: "#1C6643",
    },
    error: {
      color: "#E9424A",
      backgroundColor: "#F8DCDB",
      borderColor: "#E9424A",
    },
    info: {
      color: "#7A42D8",
      backgroundColor: "#F6F2FE",
      borderColor: "#7A42D8",
    },
    warning: {
      color: "#C37D07",
      backgroundColor: "#FCECD1",
      borderColor: "#C37D07",
    },
  };

  return (
    <Alert
      {...otherProps}
      icon={icons[variant]}
      sx={{
        ...alertColor[variant],
        border: "1px solid",
        "&.MuiAlert-root": {
          padding: "8px",
          width: "inherit",
          display: "flex",
          borderRadius: "4px",
          fontSize: "16px",
        },
        "& .MuiAlert-icon": {
          color: alertColor[variant].color,
        },
      }}
    >
      {content ? content : <Box>{children}</Box>}
    </Alert>
  );
};

export default memo(CommonAlert);
