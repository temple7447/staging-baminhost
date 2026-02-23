import React, { createContext, useContext, useState, useCallback } from 'react';

interface PageLoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  setLoading: (loading: boolean) => void;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(undefined);

export const PageLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <PageLoaderContext.Provider value={{ isLoading, showLoader, hideLoader, setLoading }}>
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error('usePageLoader must be used within PageLoaderProvider');
  }
  return context;
};
