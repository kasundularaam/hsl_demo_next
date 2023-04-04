"use client";

import { User } from "@/domain/auth/User";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  styled,
  Theme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import UserCard from "./(components)/UserCard";

const getUsers = async () => {
  const res = await fetch("http://localhost:8000/api/v1/users");
  const data = await res.json();
  return data as User[];
};

const UserListWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "100vh",
}));

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function load() {
      const list = await getUsers();
      setUsers(list);
    }
    load();
  });

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: green[500],
      },
    },
  });

  const styles = {
    userListContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#4CAF50", py: 4 }}
        >
          Users
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
