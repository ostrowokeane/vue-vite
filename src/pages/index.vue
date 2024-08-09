<template>
  <v-layout>
    <v-main>
      <div class="over-transition">
        <router-view v-slot="{ Component, route }">
          <transition-group :name="transitionName">
            <div :key="route.path" class="in-transition">
              <component :key="route.path" :is="Component" />
            </div>
          </transition-group>
        </router-view>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { router, isManual } from "@/app/router/router";
import { isIOS } from "@vueuse/core";
import { watch } from "vue";
import { ref } from "vue";
import { VLayout } from "vuetify/components/VLayout";
import { VMain } from "vuetify/components/VMain";

/**
 * Помимо fetch еще и удаляет из заказа элементы, которые возможно закончились
 */

const transitionName = ref("scale-fade");

const getTransitionName = (to: any, from: any) => {
  if (to.meta.section !== from.meta.section) return "scale-fade";

  const toDepth = (to.meta.depth as number) || 1,
    fromDepth = (from.meta.depth as number) || 1;

  return toDepth === fromDepth
    ? "scale-fade"
    : toDepth > fromDepth
      ? "slide-forward"
      : "slide-backword";
};

watch(
  () => router.currentRoute.value,
  isIOS
    ? async (to, from) => {
        transitionName.value = isManual.value
          ? getTransitionName(to, from)
          : "none";
      }
    : async (to, from) => {
        transitionName.value = getTransitionName(to, from);
      }
);
</script>
