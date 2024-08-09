<template>
  <svg role="img" :class="$style.icon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script setup lang="ts">
import { Names } from "./icon.interface";
import SvgSprite from "./icon.sprite.svg?raw";

const props = withDefaults(
  defineProps<{
    name: Names;
    size?: string;
  }>(),
  {
    size: "1rem",
  }
);

const spriteId = "__icon-sprite__";

const injectSvgSprite = () => {
  const div = document.createElement("div");
  div.id = spriteId;
  div.style.width = "0px";
  div.style.height = "0px";
  div.style.position = "absolute";
  div.innerHTML = SvgSprite;

  const svg = div.getElementsByTagName("svg")[0];
  svg.style.width = "100%";
  svg.style.width = "100%";

  document.body.appendChild(div);
};

if (!document.getElementById(spriteId)) {
  injectSvgSprite();
}
</script>

<style module>
.icon {
  width: v-bind("props.size.split(' ')[0]");
  height: v-bind("props.size.split(' ')[1] ?? props.size.split(' ')[0]");
}
</style>
