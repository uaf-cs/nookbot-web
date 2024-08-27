<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <Bars3BottomLeftIcon />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a href="https://discord.com/channels/478810581273673746">
              Discord Server
            </a>
          </li>
          <li>
            <a href="https://github.com/uaf-cs/nookbot-web">Source Code</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <NuxtLink to="/" class="text-xl font-bold">🐻‍❄️ Nookbot</NuxtLink>
    </div>
    <div class="navbar-end">
      <button class="btn">Log In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
</script>
