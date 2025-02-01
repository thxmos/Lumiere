import Link from "next/link";

import Navbar from "@/components/layouts/nav-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { DEFAULT_REDIRECT_URL } from "@/constants/app";

export default function ErrorPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px] max-w-[90%]">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-secondary">
              Oops! Something went wrong.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={DEFAULT_REDIRECT_URL}>
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
