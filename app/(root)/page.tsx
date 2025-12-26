import Hero from '@/components/LandingPage/Hero/Hero';
import Servicos from '@/components/LandingPage/Servicos/Servicos';
import Destaque from '@/components/LandingPage/Destaque/Destaque';
import SobreNos from '@/components/LandingPage/SobreNos/SobreNos';
import Chamada from '@/components/LandingPage/Chamada/Chamada';
import SuccessAlert from '@/components/ui/SuccessAlert';

export default function Home() {
  return (
    <main>
      <SuccessAlert />
      <header>
        <Hero />
      </header>
      
      <section className="container mx-auto px-3 md:px-0" id="servicos" aria-labelledby="servicos-titulo">
        <Servicos />
      </section>
      
      <section aria-label="Produtos em Destaque">
        <Destaque />
      </section>
      
      <section className="container mx-auto px-3 md:px-0" id="sobre-nos" aria-labelledby="sobre-nos-titulo">
        <SobreNos />
      </section>
      
      <section className="bg-[#ebebeb]" aria-label="Solicitar Orçamento">
        <div className='container mx-auto px-3 md:px-0'>
          <Chamada />
        </div>
      </section>
    </main>
  );
}
