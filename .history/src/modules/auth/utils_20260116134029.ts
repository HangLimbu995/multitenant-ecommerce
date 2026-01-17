import {cookies as getCookie} from 'next/headers'

interface Props {
    prefix: string,
    value: string,
}



export const generateAuthCookie = async({
    prefix, value
})