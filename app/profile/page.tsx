"use client";

// import { useAuth } from "../../hooks/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { Menu, X, Upload } from "lucide-react";
import {  useEffect, useState } from "react";
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
import {fetchUserProfile, updateAvatar} from "../../redux/slices/userSlice"
import {AppDispatch} from "../../redux/store"
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { profile } = useSelector((state: RootState) => state.userSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedFile,setSelectedFile] = useState<any>()

  const handleAvatarChange = (event:any) => {
    // const selectedImage = event.target.files[0]
    setSelectedFile(event.target.files[0])
    const formData :any= new FormData();
    formData.append('avatar', selectedFile);
    console.log(formData,"formData")

    dispatch(updateAvatar(formData))
  };

  console.log(profile,"profile")

  useEffect(() => {
    dispatch(fetchUserProfile("arg"));
  }, []);

  useEffect(()=>{
    if(profile){
      setName(profile?.name)
      setEmail(profile?.email)
      setAvatar(profile?.profileUrl)
    }
  },[profile])

  const handleLogout = ()=>{
    dispatch(logout())
    router.push("/auth/login")
  }

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
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{ color: "grey.400",minWidth:"0px" }}
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
            <Avatar
              sx={{ width: 64, height: 64 }}
              src={
                "https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/posters/1741603384744-squidgametrailerposter.jpg"
              }
            />
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
          <Button variant="contained"  sx={{ mt: 4,ml:4,backgroundColor:"grey",color:"white" }} onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}