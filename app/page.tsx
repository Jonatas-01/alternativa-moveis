import Hero from '@/components/Hero/Hero';
import Servicos from '@/components/Servicos/Servicos';
import Destaque from '@/components/Destaque/Destaque';
import SobreNos from '@/components/SobreNos/SobreNos';
import Chamada from '@/components/Chamada/Chamada';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-6">
        <Servicos />
      </div>
      <Destaque />
      <div className="container mx-auto px-6">
        <SobreNos />
      </div>
      <div className="bg-[#ebebeb]">
        <div className='container mx-auto px-6'>
          <Chamada />
        </div>
      </div>
      <div className="bg-[var(--primary)] text-white">
        <div className="container mx-auto px-6">
          <Footer />
        </div>
      </div>
    </main>
  );
}
