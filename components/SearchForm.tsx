import React, { useState, useEffect } from 'react';
import { PROVINCES, CITIES, CATEGORIES, INVITATION_TYPES } from '../constants';
import type { SearchFilters } from '../types';
import { useLanguage } from '../LanguageContext';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
  initialFilters: SearchFilters;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, initialFilters }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const formElementClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition text-start";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1 text-start";

  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-start">{t('searchFilters')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="province" className={labelClass}>{t('province')}</label>
          <select id="province" name="province" value={filters.province} onChange={handleInputChange} className={formElementClass}>
            {PROVINCES.map(p => <option key={p} value={p}>{p === 'Any' ? t('any') : p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>{t('city')}</label>
          <select id="city" name="city" value={filters.city} onChange={handleInputChange} className={formElementClass}>
            {CITIES.map(c => <option key={c} value={c}>{c === 'Any' ? t('any') : c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>{t('category')}</label>
          <select id="category" name="category" value={filters.category} onChange={handleInputChange} className={formElementClass}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c === 'Any' ? t('any') : c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('dateRange')}</label>
          <div className="space-y-2">
            <div>
                <label htmlFor="startDate" className="block text-xs font-medium text-gray-500 mb-1 text-start">{t('from')}</label>
                <input id="startDate" type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} className={formElementClass} aria-label={t('from')} />
            </div>
            <div>
                <label htmlFor="endDate" className="block text-xs font-medium text-gray-500 mb-1 text-start">{t('to')}</label>
                <input id="endDate" type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} className={formElementClass} aria-label={t('to')} />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="invitation" className={labelClass}>{t('invitationType')}</label>
          <select id="invitation" name="invitation" value={filters.invitation} onChange={handleInputChange} className={formElementClass}>
            {INVITATION_TYPES.map(type => (
              <option key={type} value={type}>
                {type === 'Any' ? t('any') : (type === 'Free' ? t('free') : t('paid'))}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between pt-2">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors">
                {isLoading && (
                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isLoading ? t('searching') : t('search')}
            </button>
            <button type="button" onClick={handleReset} className="ms-3 text-sm text-gray-600 hover:underline">
                {t('reset')}
            </button>
        </div>
      </form>
    </div>
  );
};
