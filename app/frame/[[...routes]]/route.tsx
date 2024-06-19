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
      <Button>Add Link</Button>,
    ],
  })
})

app.frame('/signup', async (c) => {
  const { inputText, frameData } = c

  if (frameData?.fid) {
    try {
      const { data: user } = await supabase
        .from('notes')
        .select('*')
        .eq('fid', frameData.fid)
        .single()

      if (!user) {
        await supabase.from('notes').insert({
          title: inputText,
          fid: frameData?.fid,
        })

        return c.res({
          image: (
            <Box
              grow
              alignVertical="center"
              backgroundColor="background"
              padding="32"
            >
              <Heading>Welcome New User</Heading>
            </Box>
          ),
          intents: [
            <Button.Link href="https://localhost:3000">
              View Your Profile
            </Button.Link>,
          ],
        })
      }

      await supabase
        .from('notes')
        .update({
          title: inputText,
        })
        .eq('fid', frameData?.fid)

      return c.res({
        image: (
          <Box
            grow
            alignVertical="center"
            backgroundColor="background"
            padding="32"
          >
            <Heading>Link Updated!</Heading>
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
            <Heading>Error ⚠️</Heading>
            <Text color="text200" size="20">
              Could Not Add Link
            </Text>
          </Box>
        ),
      })
    }
  }

  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <Heading>Error ⚠️</Heading>
        <Text color="text200" size="20">
          Farcaster User ID Not Found
        </Text>
      </Box>
    ),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
