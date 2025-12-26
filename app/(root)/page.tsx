import Hero from '@/components/Hero/Hero';
import Servicos from '@/components/Servicos/Servicos';
import Destaque from '@/components/Destaque/Destaque';
import SobreNos from '@/components/SobreNos/SobreNos';
import Chamada from '@/components/Chamada/Chamada';
import SuccessAlert from '@/components/ui/SuccessAlert';

export default function Home() {
  return (
    <main>
      <SuccessAlert />
      <Hero />
      <div className="container mx-auto px-3 md:px-0" id="servicos">
        <Servicos />
      </div>
      <Destaque />
      <div className="container mx-auto px-3 md:px-0" id="sobre-nos">
        <SobreNos />
      </div>
      <div className="bg-[#ebebeb]">
        <div className='container mx-auto px-3 md:px-0'>
          <Chamada />
        </div>
      </div>
    </main>
  );
}
