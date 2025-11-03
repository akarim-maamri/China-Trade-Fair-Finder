import React from 'react';
import { useLanguage } from '../LanguageContext';

interface DeveloperInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactItem: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => (
  <div className="flex items-center mt-4">
    <span className="w-6 h-6 me-4 flex-shrink-0">{icon}</span>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{value}</a>
      ) : (
        <p className="text-gray-800">{value}</p>
      )}
    </div>
  </div>
);

const DeveloperInfoModal: React.FC<DeveloperInfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-start transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
            <h2 id="dev-modal-title" className="text-2xl font-bold text-gray-800">{t('appTitle')}</h2>
        </div>

        <div className="border-t border-b my-4 py-4">
            <div className="text-center">
                <p className="text-sm text-gray-500">{t('developedBy')}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">{t('devName')}</h3>
            </div>
            <div className="mt-4">
                 <ContactItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>}
                    label="WhatsApp"
                    value="0699699996"
                    href="https://wa.me/213699699996"
                  />
                <ContactItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>}
                    label="Facebook"
                    value="facebook.com/maamri.abdelkarim.2025"
                    href="https://www.facebook.com/maamri.abdelkarim.2025"
                  />
                <ContactItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="text-gray-800" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>}
                    label="GitHub"
                    value="github.com/akarim-maamri"
                    href="https://github.com/akarim-maamri"
                  />
                <ContactItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="text-red-500" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.034-1.135A1 1 0 0 0 1 3v.994l7.994 4.184L15 3.994V3a1 1 0 0 0-.034-.236zM1 4.217V12h14V4.217l-7.033 3.655z"/></svg>}
                    label="Email"
                    value="akarim.maamri@yandex.com"
                    href="mailto:akarim.maamri@yandex.com"
                  />
            </div>
        </div>

        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={t('close')}
        >
          {t('close')}
        </button>
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

export default DeveloperInfoModal;