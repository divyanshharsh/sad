import React from "react";
import { Toolbar, Typography, AppBar, Grid, Box } from "@mui/material";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import { NavbarData } from "../../Data/NavbarData";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const style = {
    logo: {
      fontSize: 35,
      paddingRight: 10,
      color: "#ff9933", // Saffron for the logo
    },
    appBar: {
      backgroundColor: "#ffffff", // White AppBar background
      padding: "10px 20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    navLink: {
      fontSize: 18,
      color: "#006400", // Green for the nav links
      textDecoration: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      transition: "background-color 0.2s", // Shortened transition for quicker hover
    },
    navLinkHover: {
      backgroundColor: "#4caf50", // Darker green on hover
      color: "white",
    },
    title: {
      color: "#006400", // Green for the title
      fontWeight: "bold",
      paddingLeft: "10px",
      fontFamily: "'Montserrat', sans-serif", // Modern font family
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // Added for positioning
    },
    chakra: {
      width: "80px", // Increased Ashoka Chakra size
      marginRight: "20px", // Increased spacing
    },
    lionCapital: {
      width: "100px", // Increased Lion Capital size
    },
  };

  return (
    <>
      <AppBar position="static" style={style.appBar}>
        <Toolbar>
          <Grid container spacing={0} alignItems="center">
            {/* Left Section - Logo and Title */}
            <Grid item xs={4} display="flex" alignItems="center">
              <HowToVoteOutlinedIcon style={style.logo} />
              <Typography variant="h5" style={style.title}>
                Voting System
              </Typography>
            </Grid>

            {/* Center Section - Ashoka Chakra and Lion Capital */}
            <Grid item xs={4} display="flex" justifyContent="center">
              <Box style={style.logoContainer}>
                <img
                  src="/images/india.jpg" // Adjusted path
                  alt="Ashoka Chakra"
                  style={style.chakra}
                />
                <img
                  src="/images/a.jpg" // Adjusted path
                  alt="Lion Capital of Ashoka"
                  style={style.lionCapital}
                />
              </Box>
            </Grid>

            {/* Right Section - Navigation Links */}
            <Grid item xs={4}>
              <Grid container gap={4} justifyContent="flex-end" alignItems="center">
                {NavbarData.map((item, index) => {
                  return (
                    <Link
                      to={item.link}
                      key={index}
                      style={style.navLink}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = style.navLinkHover.backgroundColor;
                        e.target.style.color = style.navLinkHover.color;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#006400"; // Return to green
                      }}
                    >
                      <Typography>{item.title}</Typography>
                    </Link>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
