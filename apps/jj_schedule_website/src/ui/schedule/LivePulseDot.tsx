export const LivePulseDot = () => {
  return (
    <div class={'bg-accent-500 flex flex-row items-center justify-center gap-2 rounded px-1'}>
      <p class={'text-xs font-bold tracking-wide text-white'}>LIVE</p>
      <div class={'h-2 w-2'}>
        <span class="relative flex h-2 w-2">
          <span
            class={'absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75 duration-700'}
          />
          <span class={'relative inline-flex h-full w-full rounded-full bg-red-500'} />
        </span>
      </div>
    </div>
  )
}
