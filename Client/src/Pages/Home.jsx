import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Home() {
  const navigate = useNavigate();

  const electionResults = [
    { title: "General Election", route: "/results/General" },
    { title: "Local Government Election", route: "/results/local" },
    { title: "State Election", route: "/results/state" },
  ];

  const upcomingElections = [
    { title: "Upcoming General Election", date: "April 10 - May 19, 2024", description: "Voting for the General Elections." },
    { title: "Jammu and Kashmir Assembly Election", date: "September 2024", description: "Elections for Karnataka State Assembly." },
    { title: "Haryana Assembly Election", date: "September 2024", description: "Elections for Madhya Pradesh State Assembly." },
    { title: "Delhi Assembly Election", date: "April 2025", description: "Elections for Rajasthan State Assembly." },
    { title: "Maharastra Assembly Election", date: "November 2024", description: "Elections for Telangana State Assembly." },
    { title: "Chhattisgarh Assembly Election", date: "November 2024", description: "Elections for Chhattisgarh State Assembly." },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 128px)",
            marginBottom: "20px", // Space between image and cards
            backgroundImage: "url('images/indiaflag.png')",
            backgroundSize: "80% auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            borderRadius: "10px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent overlay
              borderRadius: "10px",
              zIndex: 0,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              color: "#004d00", // Dark green for contrast
              textAlign: "center",
              fontWeight: "bold",
              zIndex: 1,
              position: "relative", // Position relative to be above the overlay
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Text shadow for readability
              padding: "20px",
            }}
          >
            Welcome to the Indian Election Portal
          </Typography>
        </Box>

        {/* Cards Section for Election Results */}
        <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f0f4f8" }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#333", fontWeight: "bold" }}>
            Explore Election Results
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {electionResults.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" }, // Hover effect for card
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(result.route)}
                    sx={{
                      padding: "20px",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {result.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click to view detailed results
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Elections Section */}
        <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#e8f5e9" }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#333", fontWeight: "bold" }}>
            Upcoming Elections in India (2024-2025)
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {upcomingElections.map((election, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" }, // Hover effect for card
                  }}
                >
                  <CardContent sx={{ padding: "20px" }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {election.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {election.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {election.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </ThemeProvider>
  );
}
