import { Button } from "@/components/ui/button";
import { LocateIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="w-full py-2 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" /> Warszawa
          </div>

          <Link
            href="tel:+48451589154"
            className="flex items-center hover:text-primary"
          >
            <Phone size={16} className="mr-2" />
            +48451589154
          </Link>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={150} height={50} />
            </Link>
            <Button variant={"secondary"} asChild>
              <Link href="/">
                <LocateIcon size={16} className="mr-1" /> Укажите адрес
              </Link>
            </Button>
          </div>

          <Button variant={"secondary"} asChild>
            <Link href="/sign-in">Sign-in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
