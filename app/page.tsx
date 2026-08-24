import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Card>
      hello world
    </Card>
    <Button size={"lg"} variant={"destructive"} >Click me!</Button>
   </div>
  );
}
