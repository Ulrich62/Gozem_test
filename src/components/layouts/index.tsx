import { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="container" >
      {children}
      </main>
    </div>
  );
}

export default Layout;
