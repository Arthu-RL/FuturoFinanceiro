export const HeroBackground = () => {
  return (
    <div className='absolute left-0 right-0 top-0 flex h-[80vh] items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)] dark:bg-black max-xl:[mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)]'></div>
    </div>
  );
};
