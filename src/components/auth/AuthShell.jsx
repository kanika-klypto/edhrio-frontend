import authBg from "../../assets/auth-bg.png";

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  formWidth = "max-w-[350px]",
}) {
  return (
    <main
      className="flex min-h-dvh justify-center bg-black bg-cover bg-center bg-no-repeat font-sans text-fg lg:h-dvh lg:justify-end"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <section className="flex h-dvh min-h-0 w-full items-center justify-center overflow-hidden px-2 py-6 sm:px-8 sm:py-5 lg:w-[45%] lg:min-w-[26rem] lg:px-10 lg:py-6 xl:px-12 xl:py-8">
        <div className={"w-[80%] " + formWidth}>
          <div className="mb-3 flex">
            {/* <img
              src={logoDark}
              alt="Klypto Share"
              className="h-14 items-center mx-auto w-auto object-contain dark-only"
            /> */}
            {/* <img
              src={logoLight}
              alt="Klypto Share"
              className="h-48 w-auto object-contain dark-only"
            /> */}
          </div>
          {/* <p className="text-xs font-bold tracking-[0.14em] text-(--brand-primary)"> */}
          {/* {eyebrow} */}
          {/* </p> */}
          <h2 className="mt-2 text-center text-2xl sm:text-3xl xl:text-4xl [@media(max-height:750px)]:text-2xl [@media(max-height:650px)]:text-xl font-bold tracking-[-0.02em] text-fg leading-tight">
            {title}
          </h2>
          {/* <p className="mt-2 text-center text-sm leading-5 text-[var(--text-secondary)] [@media(max-height:700px)]:text-xs [@media(max-height:700px)]:leading-4">
            {description}
          </p> */}
          <div className="mt-4 sm:mt-5">{children}</div>
          {footer}
        </div>
      </section>
    </main>
  );
}
