type LogoProps = {
  small?: boolean;
};

export default function Logo({ small = false }: LogoProps) {
  return (
    <a
      className={`brandImageWrap ${small ? "brandImageSmall" : ""}`}
      href="/#top"
      aria-label="Zetbros home"
    >
      <img
        className="brandImage"
        src="/zetbros-logo.png"
        alt="Zetbros"
      />
    </a>
  );
}
