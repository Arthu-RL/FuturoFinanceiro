export function ContentBackground() {
  return (
    <div className='bg-dashed-grid-black/[0.125] dark:bg-dashed-grid-white/[0.125] absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white dark:bg-black'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-black'></div>
    </div>
  );
}
