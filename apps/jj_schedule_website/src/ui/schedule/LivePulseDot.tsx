import { twMerge } from 'tailwind-merge'

export const LivePulseDot = () => {
  return (
    <div class={'flex flex-row items-center justify-center gap-2'}>
      <p class={'text-xs font-bold tracking-wide'}>LIVE</p>
      <div class={'h-2 w-2'}>
        <span class="relative flex h-2 w-2">
          <span
            class={twMerge(
              'absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75 duration-700',
            )}
          />
          <span class={twMerge('relative inline-flex h-full w-full rounded-full bg-red-500')} />
        </span>
      </div>
    </div>
  )
}
