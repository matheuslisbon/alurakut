import { Box } from "../components/Box/styled";
import { MainGrid } from "../components/MainGrid/styled";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations/styled";
import { ProfileSidebar } from "../components/ProfileSidebar";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../lib/AlurakutCommons";

export default function Home() {
  const user = "matheuslisbon";
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas"];
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar gitHubUser={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Welcome</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => (
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
