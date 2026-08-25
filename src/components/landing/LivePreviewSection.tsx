import React, { useState } from 'react';
import { VideoWrapper } from '../ui/VideoWrapper';
import { CTAButton } from '../ui/CTAButton';
import { PhoneMockup3D } from '../ui/PhoneMockup3D';
import { FallingPetals } from '../ui/FallingPetals';
import { FloatingHearts } from '../ui/FloatingHearts';
import { SectionContainer } from '../shared/SectionContainer';
import type { FormData } from '../../types';

/* Duración del feedback visual mientras "prepara" el pago (sin checkout aún) */
const PAYMENT_FEEDBACK_MS = 1500;

export const LivePreviewSection: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombreElla: '',
    mensaje: '',
    tuNombre: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombreElla.trim()) newErrors.nombreElla = 'Completa todos los campos';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Completa todos los campos';
    if (!formData.tuNombre.trim()) newErrors.tuNombre = 'Completa todos los campos';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handlePreparePayment = () => {
    if (isPreparingPayment) return;
    setIsPreparingPayment(true);
    window.setTimeout(() => setIsPreparingPayment(false), PAYMENT_FEEDBACK_MS);
  };

  return (
    <SectionContainer id="crear" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
        <FallingPetals count={8} />
        <FloatingHearts count={3} />
        <div>
          <VideoWrapper videoNumber={3} />
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-zafiro mt-6">
            Tú tienes el control total
          </h2>
          <p className="text-lg text-grafito">Crea una experiencia inmersiva en 3 pasos.</p>
        </div>
        {/* Tarjeta de cristal: deja pasar el degradado cielo/rosa del lienzo */}
        <div className="glass-card rounded-[2rem] p-6 shadow-2xl shadow-sky-200/40 sm:p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-xl text-zafiro">✏️ Paso 1: Escribe tu dedicatoria</h3>
              <div>
                <label className="block text-sm font-medium text-grafito">Nombre de ella</label>
                <input
                  type="text"
                  name="nombreElla"
                  placeholder="Ej. Camila"
                  maxLength={30}
                  value={formData.nombreElla}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/80 rounded-xl border focus:outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-esmeralda-dark ${
                    errors.nombreElla ? 'border-red-500' : 'border-transparent'
                  }`}
                />
                {errors.nombreElla && <p className="text-red-600 text-sm">{errors.nombreElla}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-grafito">Tu mensaje</label>
                <textarea
                  name="mensaje"
                  placeholder="Escribe desde el corazón..."
                  maxLength={200}
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/80 rounded-xl border focus:outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-esmeralda-dark ${
                    errors.mensaje ? 'border-red-500' : 'border-transparent'
                  }`}
                />
                {errors.mensaje && <p className="text-red-600 text-sm">{errors.mensaje}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-grafito">Tu nombre</label>
                <input
                  type="text"
                  name="tuNombre"
                  placeholder="Ej. Juan"
                  maxLength={30}
                  value={formData.tuNombre}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/80 rounded-xl border focus:outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-esmeralda-dark ${
                    errors.tuNombre ? 'border-red-500' : 'border-transparent'
                  }`}
                />
                {errors.tuNombre && <p className="text-red-600 text-sm">{errors.tuNombre}</p>}
              </div>
              <div className="flex justify-end">
                <CTAButton onClick={handleNext} size="sm">
                  Siguiente →
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="animate-scale-in">
              <h3 className="font-heading font-black text-xl sm:text-2xl text-pink-600 animate-fade-in-up">
                🎀 Tu regalo personalizado
              </h3>
              <PhoneMockup3D
                nombreElla={formData.nombreElla}
                mensaje={formData.mensaje}
                tuNombre={formData.tuNombre}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex min-h-[44px] items-center justify-center bg-slate-200 hover:bg-slate-300 text-zafiro font-bold px-6 rounded-xl transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handlePreparePayment}
                  disabled={isPreparingPayment}
                  aria-busy={isPreparingPayment}
                  className={`font-bold py-2 px-6 rounded-xl transition text-white ${
                    isPreparingPayment
                      ? 'bg-esmeralda-abismo cursor-wait opacity-80'
                      : 'bg-esmeralda-noche hover:bg-esmeralda-abismo'
                  }`}
                >
                  {isPreparingPayment ? '⏳ Preparando pago…' : '¡Me encanta! → Pagar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};