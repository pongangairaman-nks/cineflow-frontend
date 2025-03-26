"use client";

// import { useAuth } from "../../hooks/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
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
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import { fetchUserProfile } from "../../../redux/slices/userSlice";
import { AppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profile } = useSelector((state: RootState) => state.userSlice);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [selectedFile, setSelectedFile] = useState<any>();

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/updateAvatar`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      }
    );

    const data = await response.json();
    if (data.profileAvatar) {
      setAvatar(data.profileAvatar);
    }
  };

  console.log(avatar, "avatar");

  useEffect(() => {
    dispatch(fetchUserProfile("arg"));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile?.name);
      setEmail(profile?.email);
      setAvatar(profile?.profileUrl);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <Container sx={{ flex: 1, py: 6 }}>
        <Paper sx={{ bgcolor: "#312f33", p: 4, mt: 4, borderRadius: 2 }}>
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
              InputProps={{
                readOnly: true
              }}
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
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 4, backgroundColor: "#6E44FF" }}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 4, ml: 4, backgroundColor: "grey", color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
