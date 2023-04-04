import {
  Avatar,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { UserCardProps } from "../(componentProps)/UserCardProps";

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: green[500],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 400, m: 2, width: "100%" }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Typography variant="h5" component="h2" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UserCard;
