// pages/messages.tsx

import { auth } from "@/auth.config";
import MessageDashboard from "@/components/chat/MessageDashboard";
import { redirect } from "next/navigation";


export default async function MessagesPage() {
  const session = await auth();
  
  if( !session?.user) {
    //redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }

  return <MessageDashboard userId={(session.user.id)} />;
};


