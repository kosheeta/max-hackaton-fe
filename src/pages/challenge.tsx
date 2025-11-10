import { Button, Container, Flex, Panel, Typography } from '@maxhub/max-ui'

function ChallengePage() {
  return (
    <Panel mode="primary">
      <Flex className="h-full" direction="column">
        <img
          alt=""
          className="aspect-3/4 w-full object-cover"
          src="placeholder.png"
        />

        <Container className="-mt-4 h-full w-full grow rounded-t-2xl bg-(--background-surface-secondary) pt-4 pb-8">
          <Typography.Headline>Challenge</Typography.Headline>

          <Button className="mt-auto" mode="primary">
            Finish
          </Button>
        </Container>
      </Flex>
    </Panel>
  )
}

export { ChallengePage }
