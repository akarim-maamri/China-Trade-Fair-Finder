import React from 'react';
import { useLanguage } from '../LanguageContext';

type VisaType = 'L' | 'M' | 'Z';

interface VisaInfoModalProps {
  visaType: VisaType | null;
  onClose: () => void;
}

const VisaInfoModal: React.FC<VisaInfoModalProps> = ({ visaType, onClose }) => {
  const { t } = useLanguage();

  if (!visaType) return null;
  
  const visaDetails = {
    L: { title: t('visaL'), reqsKey: 'visaLReqs' as const },
    M: { title: t('visaM'), reqsKey: 'visaMReqs' as const },
    Z: { title: t('visaZ'), reqsKey: 'visaZReqs' as const },
  }[visaType];
  
  const requirements = t(visaDetails.reqsKey).split('\n');

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="visa-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg text-start transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 id="visa-modal-title" className="text-xl font-bold">{visaDetails.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="space-y-4">
           <div className="px-4 py-3 border rounded-md bg-gray-50">
               <h4 className="font-bold text-gray-800 mb-2">{t('requirements')}</h4>
               <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {requirements.map((req, index) => <li key={index}>{req}</li>)}
               </ul>
               <div className="mt-4 text-end">
                 <a 
                   href="https://www.visaforchina.cn/globle/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-700"
                 >
                  {t('applyNow')}
                 </a>
               </div>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default VisaInfoModal;