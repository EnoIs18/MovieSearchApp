import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch } from "react-redux";
import { logout } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";

const NavbarDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 5,
        width: "100%",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" component="div">
          MOVIE APP
        </Typography>
      </Link>
      <Stack direction="row" spacing={2}>
        <IconButton size="large" edge="start" aria-label="logo">
          <KeyboardBackspaceIcon
            onClick={() => navigate(-1)}
            fontSize="large"
            style={{ color: "white" }}
          />
        </IconButton>
        <CustomButton
          style={{
            color: "#fff",
          }}
          onClick={() => {
            dispatch(logout());
          }}
        >
          LOG OUT
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default NavbarDetails;
