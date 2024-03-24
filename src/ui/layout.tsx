// Layout.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Footer, Navbar } from '.';

interface LayoutProps {
  children: ReactNode;
}

// se utiliza este componente para que el footer y navbar estén presentes en c/u de los componentes sin inyectarlo en c/u
// lo que se renderiza en children son los demaś componentes unicamente

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulando una carga asíncrona
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Cambia este valor según tus necesidades de tiempo de carga
  }, [setTimeout, setIsLoaded]);

  return (
    <>
      <Navbar />
      {children}
      {isLoaded && <Footer />}
    </>
  );
};

export default Layout;
