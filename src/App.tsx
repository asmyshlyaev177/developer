import { Container } from 'components/Container';
import { Header } from 'components/Header';
import { Hero } from 'components/Hero';
import { Scene } from 'components/Scene';
import { Footer } from 'components/Footer';

function App() {
  return (
    <>
      <Container>
        <Header />
        <Hero />
        <Scene />
      </Container>
      <Footer />
    </>
  );
}

export default App;
