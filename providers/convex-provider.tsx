'use client'

import { PropsWithChildren } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const ConvexClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider
