type PropsGitHub = {
  login: string;
};

type ProfileRelationsBoxWrapperProps = {
  title: string;
  content: Array<PropsGitHub>;
};

export const ProfileRelationsBoxWrapper = ({ title, content }) => {
  return (
    <>
      <h2 className="smallTitle">
        {title} ({content.length})
      </h2>
      <ul>
        {content.map((itemAtual) => (
          <li key={itemAtual.login}>
            <a href={`/users/${itemAtual.login}`} key={itemAtual.login}>
              <img src={`https://github.com/${itemAtual.login}.png`} />
              <span>{itemAtual.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
