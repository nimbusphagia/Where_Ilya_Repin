import { useRouteError, isRouteErrorResponse, NavLink, useNavigate } from "react-router";
import s from "./Error.module.css";
import gs from "../../main.module.css";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let statusCode = "ERR";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    statusCode = String(error.status);
    if (error.status === 404) {
      message = "Page not found.";
    } else if (error.status === 401 || error.status === 403) {
      message = "You're not supposed to be looking here.";
    } else {
      message = error.data?.message ?? "Something went wrong on our end.";
    }
  } else if (error instanceof Error) {
    statusCode = (error as any).status ?? "ERR";
    message = error.message;
  }

  return (
    <div className={s.body}>
      <img
        className={gs.bgImg}
        src="https://res.cloudinary.com/dlsa973vu/image/upload/q_auto/f_auto/v1775144136/resized-image_1_dsoztq.jpg"
        alt=""
      />
      <div className={gs.vignette} />
      <main className={`${s.main}`}>
        <header className={s.header}>
          <h1 className={s.title}>You found something that shouldn't exist.</h1>
          <span className={s.statusCode}>{statusCode}</span>
        </header>
        <div className={s.description}>
          <p className={s.message}>{message}</p>
        </div>
        <div className={s.actions}>
          <button className={s.btn} onClick={() => navigate(-1)}>
            Go back
          </button>
          <NavLink className={s.btn} to={"/"}>
            Home
          </NavLink>

        </div>
      </main>
    </div>
  );
};
