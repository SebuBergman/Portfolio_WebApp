import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  ButtonBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "@heroui/react";

import { Colors, theme } from "@config/styles";
import { selectUser } from "@features/auth/store/authSlice";
import AppLogo from "@features/ui/Icons/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { logout } from "@services/api";
import { useAppSelector } from "@store/index";

import { ACCOUNT_LINKS } from "./data";
import { AppRoutes } from "@app/config/routes";
import SidebarRefreshButton from "@features/ui/RefreshButton";

interface Props {
  onClose: () => void;
  isMinimized?: boolean;
}

export default function AccountSidebar({ isMinimized, onClose }: Props) {
  const { md } = useBreakpoints();
  const user = useAppSelector(selectUser);
  const userInitial = user?.displayName?.split(" ")[0][0];
  const userName = user?.displayName;

  const onLinkClick = () => {
    if (!md) {
      onClose();
    }
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        py: 3,
        px: 2,
        height: "100%",
      }}
    >
      <Box>
        <Stack mb={{ xs: 4, md: 6 }} alignItems={"center"}>
          <Link href={AppRoutes.home}>
            <AppLogo isMinimized={isMinimized} />
          </Link>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          mb={4}
          gap={3}
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Avatar
            sx={{
              height: { xs: 40, md: 48 },
              width: { xs: 40, md: 48 },
              background: Colors.disabled,
            }}
          >
            {userInitial}
          </Avatar>
          {!isMinimized && (
            <Typography variant="body1" sx={{ color: Colors.black }}>
              {userName}
            </Typography>
          )}
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink
                to={path}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
                onClick={onLinkClick}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      background: isActive
                        ? Colors.secondaryGreen
                        : "transparent",
                      borderRadius: 2,
                      color: isActive
                        ? theme.palette.primary.dark
                        : theme.palette.text.secondary,
                      mb: 1,
                      px: isMinimized ? 1 : 2,
                      justifyContent: isMinimized ? "center" : "flex-start",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: isMinimized ? "inherit" : 56,
                        color: isActive
                          ? theme.palette.primary.dark
                          : theme.palette.text.secondary,
                      }}
                    >
                      <Icon fontSize="large" />
                    </ListItemIcon>
                    {!isMinimized && (
                      <Typography variant={isActive ? "body2" : "body1"}>
                        {text}
                      </Typography>
                    )}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Box>
          <SidebarRefreshButton />
        </Box>
        <Box>
          <ButtonBase
            onClick={onLogout}
            sx={{
              height: 51,
              py: 1,
              px: 2,
              width: "fit-content",
              borderRadius: 2,
            }}
          >
            <LogoutIcon
              sx={{ color: "text.secondary", mr: isMinimized ? 0 : 4 }}
            />
            {!isMinimized && (
              <Typography
                component="span"
                variant="body1"
                sx={{ color: Colors.black }}
              >
                Logout
              </Typography>
            )}
          </ButtonBase>
        </Box>
      </Box>
    </Stack>
  );
}
