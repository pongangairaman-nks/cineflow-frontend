"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchUserProfile } from "../../../redux/slices/userSlice";
import { AppDispatch } from "../../../redux/store";
interface WatchListItem {
  poster: string;
  title: string;
}
export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.userSlice);
  const [avatar, setAvatar] = useState("");
  const [mywatchList, setMywatchList] = useState<WatchListItem[]>([]);

  console.log(avatar, "avatar");

  useEffect(() => {
    dispatch(fetchUserProfile("arg"));
    const watcherLater = JSON.parse(localStorage.getItem("myLists") ?? "[]");
    setMywatchList(watcherLater);
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setAvatar(profile?.profileUrl);
    }
  }, [profile]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <div style={{ flex: 1, margin: "32px" }}>
        {mywatchList && (
          <>
            <Typography variant="body2" color="grey.500">
              My List
            </Typography>
            <div>
              {mywatchList &&
                mywatchList?.map((ele, index) => (
                  <>
                    <div className="card" key={index}>
                      <div className="card-image-container">
                        <Image
                          src={ele?.poster}
                          alt={ele?.title}
                          //   layout="fill"
                          width={300}
                          height={300}
                          objectFit="cover"
                          unoptimized
                        />
                        <h3 className="card-title">{ele?.title}</h3>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
      </div>
    </Box>
  );
}
