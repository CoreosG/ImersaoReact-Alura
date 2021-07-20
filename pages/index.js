import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import BackgroundImage from '../src/components/BackgroundImage';

function ProfileSideBar(properties) {
  return ( 
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius: '8px'}} alt="Profileimg"/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
function ProfileRelationsBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {properties.title} ({properties.items.length})
            </h2>

            <ul>
              {properties.items.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.id}`}>
                    <img src={`https://github.com/${itemAtual.login}.png`} />
                    <span>{itemAtual.login}</span>
                    </a>
                  </li> 
                )
              })}
            </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([]); //['Peas', 'omariosouto', 'juunegreiros', 'felipefialho'];
  const [comunidades, setComunidades] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function () {
    // GET
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (answer) {
      if(answer.ok){
        return answer.json();
      }
      throw new Error('Algo de errado não está certo: '+ answer.status);
    })
    .then(function (user) {
      console.log(user);
      setFollowers(user);
    })
    .catch(function (error) {
      console.error(error);
    })

    // API GraphQL 
    // fetching communities
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'e81cbbd19073aa7152e6fb1982b72c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response)=>response.json())
    .then((completeResponse) => {
      const comunidadesVindasDoDato = completeResponse.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
    })
    // fetching pessoasFavoritas
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'e81cbbd19073aa7152e6fb1982b72c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allPessoascomunidades{
          id
          login
        }
      }`})
    })
    .then((response)=>response.json())
    .then((completeResponse)=>{
      const pessoasFavoritasDato = completeResponse.data.allPessoascomunidades;
      setPessoasFavoritas(pessoasFavoritasDato);
    })

  }, [])
  
  return (
    <>
      <BackgroundImage>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        {/*<Box style="grid-area: profileArea;"*/}
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem-Vindo(a)!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response)=>{
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas);
              })
              
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usar de capa!" 
                name="image" 
                aria-label="Coloque uma URL para usar de capa!"
                type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBox title="Pessoas da comunidade" items={pessoasFavoritas}/>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                    </a>
                  </li> 
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
            
      </MainGrid>
      </BackgroundImage>
    </>
  )
}


export async function getServerSideProps(context) {

  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch("http://localhost:3000/api/auth", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const {githubUser} = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page components as props
  }
  
}