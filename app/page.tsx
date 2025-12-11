import Hero from '@/components/Hero/Hero';
import Servicos from '@/components/Servicos/Servicos';
import Destaque from '@/components/Destaque/Destaque';
import SobreNos from '@/components/SobreNos/SobreNos';

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
    </main>
  );
}
