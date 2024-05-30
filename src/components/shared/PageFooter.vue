<template>
  <footer
    style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
    class="flex h-8 w-full items-center px-6 py-2.5 lg:h-12 lg:px-18 lg:py-6"
  >
    <p class="text-xs font-medium uppercase text-gold lg:text-sm">
      &copy; {{ new Date().getFullYear() }} movie quotes. {{ $t('rights') }}.
    </p>
  </footer>
</template>
