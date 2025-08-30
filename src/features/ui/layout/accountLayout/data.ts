import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AlbumIcon from "@mui/icons-material/Album";

import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import { AppRoutes } from "@config/routes/AppRoutes";

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
}

export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: MovieIcon,
    text: "Movies",
    path: AppRoutes.movieList,
  },
  {
    Icon: LiveTvIcon,
    text: "TV Shows",
    path: AppRoutes.tvShowList,
  },
  {
    Icon: MenuBookIcon,
    text: "Books",
    path: AppRoutes.bookList,
  },
  {
    Icon: AlbumIcon,
    text: "Vinyls",
    path: AppRoutes.vinylList,
  },
];
