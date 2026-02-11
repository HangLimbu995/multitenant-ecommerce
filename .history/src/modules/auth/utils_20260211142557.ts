
import { cookies as getCookie } from 'next/headers'

interface Props {
    prefix: string,
    value: string,
}



export const generateAuthCookie = async ({
    prefix, value
}: Props) => {
    const cookies = await getCookie()

    cookies.set({
        name: `${prefix}-token`,
        value: value,
        httpOnly: true,
        path: '/',
        // This enables the cookie auth on localhost
        // But it will not work with subdomains turned on
        ...(process.env.NODE_ENV !== 'development' && {
            sameSite: 'none',
            domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
            secure: true
        })
    })
}