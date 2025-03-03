"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function LogoutDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    setOpen(false);
    setTimeout(() => router.push("/"), 500); // Redirect to Home after logout
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              Are you sure you want to logout?
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              You will be redirected to the login page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
