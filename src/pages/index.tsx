import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@nextui-org/react";
import PageHead from "@/components/commons/PageHead";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <PageHead/>
      <h1>Hello World</h1>
      <Button color="danger" onClick={() => signOut()}>Tekan aku pwis</Button>
    </main>
  );
}
