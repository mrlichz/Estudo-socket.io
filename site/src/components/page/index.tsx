import { ReactNode } from 'react'



export function Page(props: { checkAuth?: boolean, loading?: boolean, children?: ReactNode }) {


    return (
        <main>{props.children}</main>
    )
}
