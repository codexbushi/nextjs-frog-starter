/** @jsxImportSource frog/jsx */

/* eslint-disable react/jsx-key */
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { Box, Heading, Text, VStack, vars } from './ui.js'

const app = new Frog({
  basePath: '/frame',
  ui: { vars },
})

app.frame('/', (c) => {
  return c.res({
    action: '/signup',
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="8">
          <Heading>Frame Links ⛓️</Heading>
          <Text color="text200" size="20">
            Link in bio for Farcaster Frames
          </Text>
        </VStack>
      </Box>
    ),
    intents: [<Button>Sign Up!</Button>],
  })
})

app.frame('/signup', (c) => {
  const { verified } = c
  console.log('verified', verified)
  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <Heading>Signup Successful</Heading>
      </Box>
    ),
    intents: [
      <Button.Link href="https://localhost:3000">
        View Your Profile
      </Button.Link>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
