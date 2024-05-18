<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue'
import PageFooter from '@/components/shared/PageFooter.vue'
</script>

<template>
  <page-header />

  <main>
    <section
      style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
      class="min-h-screen w-screen"
    >
      <div
        style="
          background: linear-gradient(180deg, #11101a 0%, #08080d 50.52%, rgba(0, 0, 0, 0) 100%);
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        class="mx-auto mt-28 flex max-w-72 flex-col items-center justify-center gap-8 lg:max-w-2xl"
      >
        <h1 class="z-10 text-center text-2xl font-bold text-gold lg:text-6xl lg:leading-[6rem]">
          Find any quote in millions of movie lines
        </h1>
        <router-link
          to="/"
          class="z-10 flex h-10 max-w-32 items-center justify-center rounded bg-red px-4 font-helvetica-neue text-white lg:h-12 lg:max-w-36 lg:text-xl"
        >
          Get Started
        </router-link>
      </div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-1/4 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(../../public/images/interstellar.png)"
        class="h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
      ></div>

      <div
        class="absolute inset-x-6 top-1/3 flex h-screen max-w-5xl items-center justify-center lg:left-40 lg:top-[calc(50%+1rem)]"
      >
        <div class="flex gap-4">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “You have to leave something behind to go forward!”
            </p>
            <p class="mt-4 font-montserrat font-bold text-zinc lg:text-3xl">Interstellar, 2014</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative h-screen w-screen overflow-hidden">
      <div
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 16, 26, 0.95) 0%,
            rgba(8, 8, 13, 0.13) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-0 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(../../public/images/royal.png)"
        class="h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
      ></div>

      <div
        class="absolute inset-x-6 top-0 flex h-screen max-w-5xl items-center justify-center lg:left-40"
      >
        <div class="flex gap-4">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “I think we’re just gonna have to be secretly in love with each other and leave it to
              that...”
            </p>
            <p class="mt-4 font-montserrat font-bold text-zinc lg:text-3xl">
              The Royal Tenenbaums, 2001
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative h-screen w-screen overflow-hidden">
      <div
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 16, 26, 0.95) 0%,
            rgba(8, 8, 13, 0.13) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-0 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(../../public/images/lotr.png)"
        class="h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
      ></div>

      <div
        class="absolute inset-x-6 top-0 flex h-screen max-w-5xl items-center justify-center lg:left-40"
      >
        <div class="flex gap-4">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “End? No, the journey doesn't end here. Death is just another path, one that we all
              must take. The grey rain-curtain of this world rolls back, and all turns to silver
              glass, and then you see it.”
            </p>
            <p class="mt-4 font-montserrat font-bold text-zinc lg:text-3xl">
              Return of the King, 2003
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <page-footer />
</template>
