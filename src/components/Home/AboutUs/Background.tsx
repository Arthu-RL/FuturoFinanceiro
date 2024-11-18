export const Background = () => {
  return (
    <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white bg-grid-black/[0.15] dark:bg-black dark:bg-grid-white/[0.15]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_top,transparent_0%,black)] dark:bg-black'></div>
    </div>
  );
};
