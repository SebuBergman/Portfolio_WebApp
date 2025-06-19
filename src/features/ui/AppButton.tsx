import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  LinkComponent?: React.ElementType;
  href?: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  isSmall?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth,
  loading,
  LinkComponent,
  href,
  children,
  startIcon,
  endIcon,
  sx,
  isSmall,
  onClick,
  disabled,
  color,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={LinkComponent}
      href={href}
      loading={loading}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === "text" || isSmall ? 42 : 48,
          md: variant === "text" || isSmall ? 48 : 56,
        },
        textTransform: "none",
        width: fullWidth ? "100%" : "fit-content",
        ...sx,
      }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </LoadingButton>
  );
}
