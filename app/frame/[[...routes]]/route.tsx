/** @jsxImportSource frog/jsx */

/* eslint-disable react/jsx-key */
import { createClient } from '@/utils/supabase/client'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { Box, Heading, Text, VStack, vars } from './ui.js'

const supabase = createClient()

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
    intents: [
      <TextInput placeholder="Enter Link..." />,
      <Button>Sign Up!</Button>,
    ],
  })
})

app.frame('/signup', async (c) => {
  const { inputText } = c

  try {
    await supabase.from('notes').upsert({ title: inputText })

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
  } catch (error) {
    return c.res({
      image: (
        <Box
          grow
          alignVertical="center"
          backgroundColor="background"
          padding="32"
        >
          <Heading>Error!</Heading>
        </Box>
      ),
    })
  }
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
