import { forwardRef } from 'react'
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Divider,
} from '@mantine/core'
import {
  Settings,
  Logout,
  BrandGit,
  Trash,
  ChevronRight,
} from 'tabler-icons-react'

const UserButton = forwardRef(
  ({ image, name, email, icon, ...others }, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        borderRadius: '10px',
        padding: theme.spacing.md,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>

          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {icon || <ChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
)

//TODO - settings: avatar, change password, color scheme, etc.

const UserMenu = ({ user, logout, deleteAccount }) => {
  return (
    <Group position='center'>
      <Menu
        withArrow
        placement='center'
        control={
          <UserButton
            image={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=BADA55&color=212529&rounded=true`}
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
          />
        }
      >
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          icon={<Settings size={14} />}
          onClick={() => console.log('settings...')}
          disabled
        >
          Settings
        </Menu.Item>
        <Menu.Item icon={<Logout size={14} />} onClick={logout}>
          Logout
        </Menu.Item>
        <Divider />
        <Menu.Label>About</Menu.Label>
        <Menu.Item
          icon={<BrandGit size={14} />}
          onClick={() => window.open('https://github.com/jasont01/todo-list')}
        >
          Github
        </Menu.Item>
        <Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color='red'
          icon={<Trash size={14} />}
          onClick={deleteAccount}
        >
          Delete my account
        </Menu.Item>
      </Menu>
    </Group>
  )
}

export default UserMenu
