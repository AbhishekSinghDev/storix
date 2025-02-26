"use client";

import { motion } from "framer-motion";
import SiteHeader from "@/components/landing-page/site-header";
import { Footer } from "@/components/landing-page/footer";
import RegisterForm from "./register-form";

const Register = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8"
          >
            <RegisterForm />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
