import { FC, PropsWithChildren } from 'react'

import Sidebar from '@/components/layout/sidebar/Sidebar'

import { useConnectSocket } from '@/hooks/useConnectSocket'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	useConnectSocket()
	return <Sidebar>{children}</Sidebar>
}

export default Layout
