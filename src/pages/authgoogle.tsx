import { useSession, signIn, signOut } from "next-auth/client";

export default function AuthGoogle(){
  const [session] = useSession();

  return session ? (
    <button
    type="button"
    onClick={() =>  signOut()}
  >
    Sign Out
  </button>
  ) : (
    <button
    type="button"
    onClick={() =>  signIn('google')}
  >
    Sign in with Google
  </button>
  )
};

