type LogoProps = {
  small?: boolean;
  hero?: boolean;
};

export default function Logo({ small = false, hero = false }: LogoProps) {
  const wrapClass = [
    "brandImageWrap",
    small ? "brandImageSmallWrap" : "",
    hero ? "brandImageHeroWrap" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageClass = [
    "brandImage",
    small ? "brandImageSmall" : "",
    hero ? "brandImageHero" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={wrapClass} href="/#top" aria-label="Zetbros home">
      <img className={imageClass} src="/zetbros-logo.png" alt="Zetbros" />
    </a>
  );
}
