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
  const { buttonValue, status } = c
  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="8">
          <Heading>FrogUI 🐸</Heading>
          <Text color="text200" size="20">
            Build consistent frame experiences
          </Text>
        </VStack>
      </Box>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
