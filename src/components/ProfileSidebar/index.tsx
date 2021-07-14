import React from "react";
import { Box } from "../Box/styled";

type ProfileSidebarProps = {
  gitHubUser: string;
};

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  gitHubUser,
}) => {
  return (
    <Box>
      <img
        src={`https://github.com/${gitHubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};
