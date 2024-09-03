<template>
  <div class="navbar bg-base-100 shadow sticky top-0 mb-4">
    <div class="navbar-start gap-2">
      <!-- Desktop drawer, only lists links to discord server and source code -->
      <div class="dropdown hidden lg:block">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <Bars3BottomLeftIcon class="h-6" />
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

      <!-- Mobile sidebar -->
      <div class="flex-none lg:hidden">
        <label
          for="sidebar-drawer"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <Bars3BottomLeftIcon class="h-6" />
        </label>
      </div>

      <NuxtLink to="/" class="text-xl font-bold">🐻‍❄️ Nookbot</NuxtLink>
    </div>
    <div class="navbar-end gap-2 hidden lg:flex">
      <AuthState v-slot="{ clear, loggedIn, user }">
        <template v-if="loggedIn">
          <NuxtLink class="btn btn-ghost" to="/courses">
            <div class="avatar">
              <div class="w-6 rounded-full">
                <img :src="user.avatarUrl" :alt="`${user.name}'s avatar`" />
              </div>
            </div>
            {{ user.name }}
          </NuxtLink>
          <NuxtLink class="btn" @click="clear" to="/">Log Out</NuxtLink>
        </template>
        <a v-else class="btn" href="/auth/google">Log In</a>
      </AuthState>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";

const { loggedIn } = useUserSession();
</script>
