import { Link } from "react-router-dom";
import type { Superhero } from "../types/Superhero";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  hero: Superhero;
};

const StyledCard = styled(Card)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease-in-out",
  "&:hover": {
    transform: "scale(0.95)",
  },
});

export const SuperheroCard = ({ hero }: Props) => {
  const imagePath = hero.images?.[0]
    ? `${import.meta.env.VITE_API_URL}/uploads/${hero.images}`
    : "placeholder.jpg";

  return (
    <StyledCard>
      <CardActionArea
        component={Link}
        to={`/superheroes/${hero.id}`}
        sx={{ height: "100%" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={imagePath}
          alt={hero.nickname}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" noWrap>
            {hero.nickname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};