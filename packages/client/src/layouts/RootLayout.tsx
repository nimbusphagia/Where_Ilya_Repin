import { Outlet, ScrollRestoration } from "react-router"
import gs from "../main.module.css"

export function RootLayout() {
  return (
    <>
      <ScrollRestoration
        getKey={(location) => location.state?.key ?? location.pathname}
      />
      <img
        className={gs.bgImg}
        src="https://res.cloudinary.com/dlsa973vu/image/upload/q_auto/f_auto/v1775144136/resized-image_1_dsoztq.jpg"
        alt="" />
      <div className={gs.vignette}></div>
      <Outlet
      />
    </>
  )
}
