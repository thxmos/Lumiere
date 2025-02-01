import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/layouts/nav-bar";
import { validateServerSession } from "@/utils/security/auth";

export default async function NotFoundPage() {
  const user = await validateServerSession();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[350px] max-w-[90%]">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              404 - Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </CardContent>
          <Link href={user ? "/dashboard" : "/auth"}>
            <CardFooter className="flex justify-center">
              <Button>Return to Home</Button>
            </CardFooter>
          </Link>
        </Card>
      </div>
    </>
  );
}
