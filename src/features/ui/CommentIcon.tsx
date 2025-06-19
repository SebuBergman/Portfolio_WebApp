import { IconButton, Badge } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

interface Props {
  commentCount: number;
  onClick: () => void;
}

export default function CommentIconComponent({ commentCount, onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={commentCount} color="primary">
        <CommentIcon />
      </Badge>
    </IconButton>
  );
}
