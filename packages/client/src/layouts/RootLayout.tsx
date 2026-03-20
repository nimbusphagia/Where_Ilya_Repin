import { Outlet, ScrollRestoration } from "react-router"

export function RootLayout() {
  return (
    <>
      <ScrollRestoration
        getKey={(location) => location.state?.key ?? location.pathname}
      />
      <Outlet
      />
    </>
  )
}
