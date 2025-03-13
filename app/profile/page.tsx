"use client";

import { useAuth } from "../../hooks/userAuth";
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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AnimatedCineFlowLogo from "../../components/AnimatedLogo";
import { fetchUserProfile } from "../../redux/slices/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.user);
  console.log("profile", profile);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [avatar, setAvatar] = useState(
    profile?.profileUrl ||
      "https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg"
  );

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
        minHeight: "100vh",
        bgcolor: "black",
        color: "white"
      }}
    >
      {/* ✅ Collapsible Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 250 : 60,
          transition: "width 0.3s",
          bgcolor: "grey.900",
          p: 2,
          borderRight: "1px solid grey"
        }}
      >
        <AnimatedCineFlowLogo />

        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{ color: "grey.400" }}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
        {sidebarOpen && (
          <>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="text"
                sx={{ color: "white", justifyContent: "flex-start" }}
              >
                Profile
              </Button>
              <Button
                variant="text"
                sx={{ color: "grey.500", justifyContent: "flex-start" }}
              >
                Account
              </Button>
              <Button
                variant="text"
                sx={{ color: "grey.500", justifyContent: "flex-start" }}
              >
                Appearance
              </Button>
              <Button
                variant="text"
                sx={{ color: "grey.500", justifyContent: "flex-start" }}
              >
                Notifications
              </Button>
              <Button
                variant="text"
                sx={{ color: "grey.500", justifyContent: "flex-start" }}
              >
                Display
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* ✅ Settings Panel */}
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
