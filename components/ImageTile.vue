<template>
  <div
    :class="['image-tile', { 'image-tile--square': squareTile }]"
  >
    <div
      class="image-tile__wrapper"
    >
      <template v-if="url">
        <NuxtImg
          class="image-tile__img"
          :src="url"
          :alt="title"
        />
        <div class="image-tile__title">
          {{ title }}
        </div>
      </template>
      <template v-else>
        <div class="image-tile__skeleton" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  url?: string
  title?: string
  /** When true, the tile is forced to a square aspect ratio */
  squareTile?: boolean
}>(), {
  squareTile: true,
})
</script>

<style scoped lang="scss">
  .image-tile {
  &__wrapper {
    position: relative;
    width: 100%;
    /* In default mode, let the height be determined by content */
    height: auto;
    padding: 0; /* No forced aspect ratio by default */
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    /* In non-square mode the image uses its natural aspect ratio */
  }

  &__title {
    /* (Your title styling remains the same) */
    position: absolute;
    word-wrap: break-word;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 12px;
    font-size: 16px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    opacity: 0;
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  }

  &:hover {
    .image-tile__title {
      opacity: 1;
    }
  }

  &__skeleton {
    /* Default skeleton: natural height */
    width: 100%;
    height: auto;
    padding: 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
  }

  // Modifier for Square mode
  &--square {
    & .image-tile__wrapper {
      height: 0;
      padding-bottom: 100%; /* Forces a 1:1 aspect ratio */
    }
    & .image-tile__img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    // Optionally, you can decide if the skeleton should be square too
    // If you want it to be square:
    & .image-tile__skeleton {
      height: 0;
      padding-bottom: 100%;
    }
    // If you prefer the skeleton not to be affected, simply remove the above block.
  }
}

@keyframes shimmer {
0% {
    background-position: -200% 0;
}
100% {
    background-position: 200% 0;
}
}
</style>
