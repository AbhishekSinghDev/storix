import SiteHeader from "@/components/landing-page/site-header";
import { Footer } from "@/components/landing-page/footer";
import SigninForm from "./signin-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  // server side redirect to homepage when already logged in
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <SigninForm />
      <Footer />
    </div>
  );
};

export default SignIn;
