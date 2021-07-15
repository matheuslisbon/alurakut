import { string } from "prop-types";
import React, { FormEvent, useState } from "react";
import { Box } from "../components/Box/styled";
import { MainGrid } from "../components/MainGrid/styled";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations/styled";
import { ProfileSidebar } from "../components/ProfileSidebar";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../lib/AlurakutCommons";

type ComunidadeProps = {
  id: string;
  title: string;
  image: string;
};

export default function Home() {
  const user = "matheuslisbon";
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas"];
  const [comunidades, setComunidades] = useState<ComunidadeProps[]>([]);
  const [inputComunidadeTitle, setInputComunidadeTitle] = useState("");
  const [inputComunidadeImage, setInputComunidadeImage] = useState("");

  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputComunidadeTitle.length <= 0 || inputComunidadeImage.length <= 0) {
      return;
    }
    const comunidade = {
      title: inputComunidadeTitle,
      image: inputComunidadeImage,
      id: new Date().toDateString(),
    };

    setComunidades([...comunidades, comunidade]);
  }

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

          <Box>
            <h2 className="subTitle">Oque você deseja fazer ? </h2>

            <form onSubmit={(e) => handleSubmitForm(e)}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  onChange={(e) => setInputComunidadeTitle(e.target.value)}
                  value={inputComunidadeTitle}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Coloque um link de imagem para capa"
                  name="image"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  onChange={(e) => setInputComunidadeImage(e.target.value)}
                  value={inputComunidadeImage}
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas das comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                    <img src={`https://github.com/${itemAtual.image}.png`} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => (
                <li key={itemAtual}>
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
