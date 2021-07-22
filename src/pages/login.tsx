import React, { useContext } from "react";
// Hook do NextJS
import { useRouter } from "next/router";
import { auth, firebase } from "../services/firebase";
import nookies from "nookies";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.additionalUserInfo) {
      setUser(result.additionalUserInfo);
      nookies.set(null, "NAME_USER", result.additionalUserInfo.username, {
        path: "/",
        maxAge: 86400 * 7,
      });
      router.push("/");
    }
  }

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <div className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <button onClick={() => signInWithGithub()}>
              Login com seu gitHub
            </button>
          </div>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
