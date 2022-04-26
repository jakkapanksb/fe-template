import { Chip, ChipProps } from "@mui/material";
import { FC, memo } from "react";

interface CommonChipProps extends Omit<ChipProps, "variant"> {
  variant:
    | "success"
    | "immediate"
    | "error"
    | "inform"
    | "expired"
    | "recommended"
    | "active"
    | "overdue";
  label: React.ReactNode;
}

const CommonChip: FC<CommonChipProps> = props => {
  const { variant, ...otherProps } = props;

  //wait for color theme spec
  const variants = {
    success: {
      color: "#1C6643",
      backgroundColor: "#E3F5E6",
    },
    immediate: {
      color: "#9D3C41",
      backgroundColor: "#FCECD1",
    },
    error: {
      color: "#C63110",
      backgroundColor: "#FEDAD0",
    },
    inform: {
      color: "#7A42D8",
      backgroundColor: "#F6F2FE",
    },
    expired: {
      color: "#7E7E7E",
      backgroundColor: "#EAEAEA",
    },
    recommended: {
      color: "#000000",
      backgroundColor: "#F3AE3D",
    },
    active: {
      color: "#FFFFFF",
      backgroundColor: "#4EBE6E",
    },
    overdue: {
      color: "#FFFFFF",
      backgroundColor: "#E9424A",
    },
  };

  return (
    <Chip
      {...otherProps}
      sx={{
        ...variants[variant],
        "&.MuiChip-root": {
          borderRadius: "4px",
          height: "auto",
          minHeight: 32,
          maxWidth: "100%",
        },
        "& .MuiChip-label": {
          fontWeight: "bold",
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      }}
    />
  );
};

export default memo(CommonChip);
