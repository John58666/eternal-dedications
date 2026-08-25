import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FloatingHearts } from '../ui/FloatingHearts';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const ValidationSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div className="w-full bg-noche py-16 lg:py-20 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <FloatingHearts count={2} color="#ffffff" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white">
          Aprobado y Validado por Ellas
        </h2>
        <div className="mt-6 border-2 border-perla rounded-2xl overflow-hidden shadow-xl">
          <VideoWrapper videoNumber={4} />
        </div>
        <p className="text-perla text-lg mt-4 max-w-2xl mx-auto">
          Diseñado con lógica de ingenieros, aprobado por la emoción de ellas.
        </p>
      </motion.div>
    </div>
  );
};
