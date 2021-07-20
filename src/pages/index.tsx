import axios, { AxiosResponse } from "axios";
import React, { FormEvent, useState, useEffect } from "react";
import { Box } from "../components/Box/styled";
import { MainGrid } from "../components/MainGrid/styled";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations/styled";
import { ProfileSidebar } from "../components/ProfileSidebar";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../lib/AlurakutCommons";

export default function Home(props) {
  const user = props.githubUser;
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas"];
  const [comunidades, setComunidades] = useState([]);
  const [inputComunidadeTitle, setInputComunidadeTitle] = useState("");
  const [seguidores, setSeguidores] = useState([]);
  const [inputComunidadeImage, setInputComunidadeImage] = useState("");

  useEffect(() => {
    async function getDataApi() {
      await axios
        .get<AxiosResponse[]>(
          "https://api.github.com/users/matheuslisbon/followers"
        )
        .then((response) => setSeguidores(response.data));
    }
    async function postGraphQL() {
      axios({
        method: "post",
        url: "https://graphql.datocms.com/",
        data: JSON.stringify({
          query: `query {
	allCommunities {
    title
    id
    imageUrl
  }
}`,
        }),
        headers: {
          Authorization: "2d747fc87647abae2ed739be24c765",
          "Content-Type": "aplication/json",
          Accept: "aplication/json",
        },
      }).then(({ data }) => setComunidades(data.data.allCommunities));
    }

    postGraphQL();

    getDataApi();
  }, []);

  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputComunidadeTitle.length <= 0 || inputComunidadeImage.length <= 0) {
      return;
    }
    const comunidade = {
      title: inputComunidadeTitle,
      imageUrl: inputComunidadeImage,
    };

    fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comunidade),
    }).then(async (response) => {
      const dados = await response.json();
      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado;
      const comunidadesAtualizadas = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas);
    });
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
            <h2 className="smallTitle">Seguidores ({seguidores.length})</h2>
            <ul>
              {seguidores.map((itemAtual) => (
                <li key={itemAtual.login}>
                  <a href={`/users/${itemAtual.login}`} key={itemAtual.login}>
                    <img src={`https://github.com/${itemAtual.login}.png`} />
                    <span>{itemAtual.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas das Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/comunities/${itemAtual.id}`} key={itemAtual.id}>
                    <img src={itemAtual.imageUrl} />
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
