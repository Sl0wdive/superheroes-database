import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main", py: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            ml: 2,
          }}
        >
          Superheroes Database
        </Typography>

        <Box sx={{ mr: 2 }}>
          <Button
            component={Link}
            to="/create"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Add Superheroes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
