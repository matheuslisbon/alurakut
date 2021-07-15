import React from "react";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
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
      <hr />
      <p>
        <a href={`https://github.com/${gitHubUser}`} className="boxLink">
          @{gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};
