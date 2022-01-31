import { NextComponentType } from 'next';
import { signOut, useSession } from 'next-auth/react';

export const Post: NextComponentType = () => {
  return (
      <div>
            <h1>Página posts</h1>
      </div>
  )
}
