"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
// import { Menu, X, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { fetchUserProfile } from "../../redux/slices/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const avatar =
    profile?.profileUrl ||
    "https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg";

  const handleAvatarChange = () => {};

  useEffect(() => {
    setName(profile?.name as string);
    setEmail(profile?.email as string);
  }, [profile]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minHeight: "100vh",
        color: "white"
      }}
    >
      <Container sx={{ flex: 1, py: 6 }}>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="body2" color="grey.500">
          This is how others will see you on the site.
        </Typography>

        <Paper sx={{ bgcolor: "grey.900", p: 4, mt: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Profile Settings
          </Typography>

          {/* ✅ Avatar Upload */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Avatar sx={{ width: 64, height: 64 }} src={avatar} />
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{ color: "white", borderColor: "white" }}
            >
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
          </Box>

          {/* ✅ Editable Username */}
          <Box mt={3}>
            <TextField
              label="Username"
              variant="filled"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                bgcolor: "grey.800",
                borderRadius: 1,
                input: { color: "white" },
                label: { color: "grey.500" }
              }}
            />
          </Box>

          {/* ✅ Email Selection */}
          <Box mt={3}>
            <TextField
              label="email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: "grey.800",
                borderRadius: 1,
                input: { color: "white" },
                label: { color: "grey.500" }
              }}
            />
          </Box>

          {/* ✅ Save Button */}
          <Button variant="contained" color="error" sx={{ mt: 4 }}>
            Save Changes
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
