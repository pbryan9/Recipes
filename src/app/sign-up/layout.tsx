import React from 'react';
import StandardMainContainer from '../components/StandardMainContainer';
import LayoutContainer from '../components/LayoutContainer';
import SectionHeader from '../components/SectionHeader';
import LeftNav from '../recipes/_components/LeftNav';
import LeftNavCard from '../components/LeftNavCard';
import Link from 'next/link';

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <SectionHeader sectionTitle='Sign In' />
      <LayoutContainer>
        <LeftNav>
          <LeftNavCard>
            <Link href='/sign-in'>Sign In</Link>
          </LeftNavCard>
          <LeftNavCard>
            <Link href='/sign-up'>Sign Up</Link>
          </LeftNavCard>
        </LeftNav>
        <StandardMainContainer>{children}</StandardMainContainer>
      </LayoutContainer>
    </>
  );
}
