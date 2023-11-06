import * as React from "react";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { FeedOutlined } from "@mui/icons-material";

export default function UploadStatus() {
  return (
    <Box width="100%" marginY=".5rem" border="1px solid #dbdbdb">
      <Box
        sx={{
          display: "flex",
          width: "calc(100% - 1.5rem)",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: "1rem" }}>
          <FeedOutlined sx={{ fontSize: "2rem" }} />
        </Box>
        <Box sx={{ width: "100%", Padding: "1rem" }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
}
