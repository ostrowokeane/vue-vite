import { nextTick, ref } from "vue";
import { createRouter, createWebHistory } from "vue-router/auto";

export const router = createRouter({
  history: createWebHistory(),
});
export const isManual = ref(false);

const methodsToWrap = ["push", "replace", "go", "back", "forward"] as const;
methodsToWrap.forEach(async (method) => {
  const originalMethod: any = router[method];
  router[method] = (async (...params: []) => {
    isManual.value = true;
    await originalMethod.call(null, ...(params as []));
    nextTick().then(() => {
      isManual.value = false;
    });
  }) as any;
});
