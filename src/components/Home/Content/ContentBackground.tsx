export function ContentBackground() {
  return (
    <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white bg-dashed-grid-black/[0.11] dark:bg-black dark:bg-dashed-grid-white/[0.11]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)] dark:bg-black'></div>
    </div>
  );
}
