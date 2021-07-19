import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(properties) {
  return ( 
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius: '8px'}} alt="Profileimg"/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'CoreosG';
  const pessoasFavoritas = ['Peas', 'omariosouto', 'juunegreiros', 'felipefialho']; 

  return (
    <>
      <AlurakutMenu />
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
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade: {pessoasFavoritas.length}
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                    </a>
                  </li> 
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
            
      </MainGrid>
    </>
  )
}
