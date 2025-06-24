"use client";
import { React, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Shield, Zap, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyrightYear from "@/components/CopyrightYear/CopyrightYear";

// Quotes for the carousel
const quotes = [
  {
    text: "“The art of writing is the art of discovering what you believe.”",
    author: "Gustave Flaubert",
  },
  {
    text: "“Blogging is not rocket science. It’s about being yourself, and putting what you have into it.”",
    author: "Anonymous",
  },
  {
    text: "“Start writing, no matter what. The water does not flow until the faucet is turned on.”",
    author: "Louis L’Amour",
  },
];

function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  // Auto-advance quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-32 md:h-40 flex flex-col justify-center items-center px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7 }}
          className="absolute w-full text-center"
        >
          <blockquote className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
            {quotes[index].text}
          </blockquote>
          <div className="mt-2 text-yellow-300 font-medium">
            — {quotes[index].author}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Signin = () => {
  const router = useRouter();

  // Login state
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);

  // Register state
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerShowPassword, setRegisterShowPassword] = useState(false);
  const [registerShowConfirm, setRegisterShowConfirm] = useState(false);

  // Login form data
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Register form data
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    isActive: "true",
  });

  // Login handler (from LoginForm)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const { email, password } = loginData;

    if (!email || !password) {
      setLoginLoading(false);
      return toast("Email and Password are required");
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setLoginError(result.error);
        toast(result.error || "Invalid email or password");
      } else {
        toast("Login Successful, please wait. Redirecting...");
        router.push("/admin");
      }
    } catch (err) {
      setLoginError("An error occurred while processing your request.");
      toast("An error occurred while processing your request.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Register handler (from RegisterForm)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match.");
      toast("Passwords do not match.");
      return;
    }
    setRegisterLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
          role: registerData.role,
          isActive: registerData.isActive,
        }),
      });
      const data = await response.json();
      setRegisterLoading(false);

      if (!response.ok) {
        setRegisterError(data.error || "Registration failed.");
        toast(data.error || "Registration failed.");
        return;
      }

      toast("Registration successful! You can now log in.");
      setRegisterData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
        isActive: "true",
      });
    } catch (err) {
      setRegisterError("Registration failed.");
      toast("Registration failed.");
      setRegisterLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full h-full flex flex-col md:flex-row shadow-2xl overflow-hidden bg-background">
        {/* Left: Carousel & Image (hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-between items-center bg-gradient-to-br from-yellow-700 via-yellow-900 to-gray-900 md:w-1/2 relative"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/login-bg.jpg"
              alt="Writer background"
              className="w-full h-full object-cover opacity-40"
              style={{ filter: "blur(2px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
            <QuoteCarousel />
          </div>
          <div className="relative z-10 mb-8 text-center text-gray-300 text-xs">
            <CopyrightYear />
          </div>
        </motion.div>

        {/* Right: Tabs for Login/Register */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col justify-center items-center bg-[#1a1c1a] p-8 md:p-12"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl w-full max-w-md">
            <Tabs defaultValue="login">
              <CardHeader className="space-y-4">
                <TabsList className="grid grid-cols-2 w-full bg-yellow-50 border border-yellow-100">
                  <TabsTrigger
                    id="login-tab"
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-yellow-800 data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-yellow-800 data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                {/* Login Tab */}
                <TabsContent value="login">
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm"
                    >
                      {loginError}
                    </motion.div>
                  )}
                  <form onSubmit={handleLoginSubmit} className="space-y-1 w-full max-w-sm">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-10 border-yellow-200 focus:border-yellow-600 focus:ring-yellow-600 bg-[#2b2e2b] text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={loginShowPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="pl-10 pr-10 border-yellow-200 focus:border-yellow-600 focus:ring-yellow-600 bg-[#2b2e2b] text-white"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setLoginShowPassword(!loginShowPassword)}
                        >
                          {loginShowPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg"
                      disabled={loginLoading}
                    >
                      {loginLoading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-black rounded-full" />
                          Logging in...
                        </span>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                  <div className="mt-6 text-center text-sm text-white">
                    Don't have an account?{" "}
                    <span className="text-yellow-500">Register above</span>
                  </div>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  {registerError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm"
                    >
                      {registerError}
                    </motion.div>
                  )}
                  <form
                    className="space-y-1 w-full max-w-sm"
                    onSubmit={handleRegisterSubmit}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="text-gray-300">Username</Label>
                      <Input
                        type="text"
                        id="register-username"
                        name="username"
                        placeholder="Your username"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                        className="bg-[#2b2e2b] text-white border-[#2b2e2b] focus-visible:ring-yellow-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-gray-300">Email</Label>
                      <Input
                        type="email"
                        id="register-email"
                        name="email"
                        placeholder="Your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        className="bg-[#2b2e2b] text-white border-[#2b2e2b] focus-visible:ring-yellow-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone" className="text-gray-300">Phone Number</Label>
                      <Input
                        type="tel"
                        id="register-phone"
                        name="phone"
                        placeholder="Your phone number"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                        className="bg-[#2b2e2b] text-white border-[#2b2e2b] focus-visible:ring-yellow-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type={registerShowPassword ? "text" : "password"}
                          id="register-password"
                          name="password"
                          placeholder="Your Password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                          className="pl-10 pr-10 bg-[#2b2e2b] text-white border-[#2b2e2b] focus-visible:ring-yellow-600"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setRegisterShowPassword(!registerShowPassword)}
                        >
                          {registerShowPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirmPassword" className="text-gray-300">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type={registerShowConfirm ? "text" : "password"}
                          id="register-confirmPassword"
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                          className="pl-10 pr-10 bg-[#2b2e2b] text-white border-[#2b2e2b] focus-visible:ring-yellow-600"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setRegisterShowConfirm(!registerShowConfirm)}
                        >
                          {registerShowConfirm ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg"
                      disabled={registerLoading}
                    >
                      {registerLoading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-black rounded-full" />
                          Registering...
                        </span>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                  <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <span className="text-yellow-500">Login above</span>
                  </div>
                </TabsContent>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-yellow-100 p-6">
                <div className="text-center text-sm text-gray-400">
                  By continuing, you agree to our{" "}
                  <Link href="/terms" className="text-yellow-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-yellow-500 hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </CardFooter>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Signin;