import React from 'react';
import LeftNav from '../recipes/_components/LeftNav';
import SectionHeader from '../recipes/_components/SectionHeader';
import StandardMainContainer from '../components/StandardMainContainer';
import LayoutContainer from '../components/LayoutContainer';

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <SectionHeader sectionTitle='Log In' />
      <LayoutContainer>
        <LeftNav>stuff</LeftNav>
        <StandardMainContainer>{children}</StandardMainContainer>
      </LayoutContainer>
    </>
  );
}
