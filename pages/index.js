import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

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

            {/* <ul>
              {properties.items.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                    </a>
                  </li> 
                )
              })}
            </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

// tentativa de adicionar followers do github
// async function fetchFollowers(githubUser) {

//   return 

//   let response = await fetch(`https://api.github.com/users/${githubUser}/followers`);
//   let data = await response.json();
  
//   return data.map((current) => {
//     return current.login;
//   });
// }
// function MyFollowers(githubUser) {
//   let followers = [];
//   fetchFollowers(githubUser)
//   .then((item)=> {
//     followers.push(item);
//   });
//   return followers;
// }

export default function Home() {
  const githubUser = 'CoreosG';
  const pessoasFavoritas = ['Peas', 'omariosouto', 'juunegreiros', 'felipefialho'];
  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function () {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (answer) {
      if(answer.ok){
        return answer.json();
      }
      throw new Error('Algo de errado não está certo: '+ answer.status);
    })
    .then(function (user) {
      setFollowers(user);
    })
    .catch(function (error) {
      console.error(error);
    })
  }, [])

  console.log(followers);
  

  return (
    <>
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
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
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
                    <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                    </a>
                  </li> 
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
            
      </MainGrid>
    </>
  )
}
