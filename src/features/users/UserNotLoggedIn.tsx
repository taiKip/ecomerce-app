import { Container, Stack, Typography } from '@mui/material'
import shopper from '../../assets/shopping.svg'
import LoginButton from '../../components/LoginButton'
import SignUpButton from '../../components/SignUpButton'

const UserNotLoggedIn = () => {
  return (
    <Container sx={{ paddingTop: 10, overflow: 'hidden', display: { sm: 'none' } }}>
      <Typography
        color={'primary'}
        variant="h4"
        fontSize={'1.5em'}
        fontWeight={900}
        alignItems={'center'}
        gap={1}
        marginBottom={3}>
        Start your shopping journey
        <span role="img" aria-label="smiley face">
          😊
        </span>
      </Typography>
      <div>
        <img
          src={shopper}
          loading="lazy"
          style={{
            objectFit: 'contain',
            maxHeight: '40vh'
          }}
        />
      </div>

      <Stack display={'flex'} gap={3} marginTop={6}>
        <LoginButton />
        <SignUpButton />
      </Stack>
    </Container>
  )
}

export default UserNotLoggedIn
