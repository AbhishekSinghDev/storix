import SiteHeader from "./site-header";

import { Footer } from "./footer";
import Main from "./main";
import { auth } from "@/server/auth";

const LandingPage = async () => {
  const session = await auth();
  const isAuth = !!session?.user;

  return (
    <>
      <SiteHeader isAuthenticated={isAuth} />
      <Main />
      <Footer />
    </>
  );
};

export default LandingPage;
