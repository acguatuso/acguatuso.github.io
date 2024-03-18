// Layout.tsx
import React, { ReactNode } from 'react';
import { Footer, Navbar } from '.';

interface LayoutProps {
  children: ReactNode;
}

// se utiliza este componente para que el footer y navbar estén presentes en c/u de los componentes sin inyectarlo en c/u
// lo que se renderiza en children son los demaś componentes unicamente

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
