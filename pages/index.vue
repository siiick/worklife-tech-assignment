<template>
  <div class="page">
    <!-- Header (fixed at the top) -->
    <header class="header">
      <div class="header__logo">
        MyRijksApp
      </div>
      <div class="header__search">
        <input
          v-model="searchTerm"
          class="header__search-input"
          type="text"
          placeholder="Search"
          @keyup.enter="searchArtworks"
        >
        <button
          class="header__search-button"
          @click="searchArtworks"
        >
          Submit
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="main">
      <div class="gallery">
        <div
          v-for="(art, index) in items"
          :key="index"
          class="gallery__item"
        >
          <div class="gallery__image-wrapper">
            <img
              class="gallery__image"
              :src="art.webImage ? art.webImage.url : ''"
              alt="Artwork image"
            >
            <div class="gallery__title">
              {{ art.title }}
            </div>
          </div>
        </div>

        <template v-if="status === 'pending'">
          <div
            v-for="n in 20"
            :key="n"
            class="gallery__item gallery__item--skeleton"
          />
        </template>
      </div>

      <!-- Load more button -->
      <button
        class="button button--load-more"
        @click="loadMore"
      >
        Load more
      </button>
    </main>
  </div>
</template>

<script setup>
const { public: { apiBaseUrl, apiKey } } = useRuntimeConfig()

const items = ref([])
const searchTerm = ref('')
const page = ref(1)
const pageSize = 20

const { status } = await useFetch(`${apiBaseUrl}`, {
  query: {
    key: apiKey,
    p: page,
    ps: pageSize,
    imgonly: true,
  },
  onResponse({ request, response, options }) {
    console.log('Request:', request)
    console.log('Response:', response)
    console.log('Options:', options)

    items.value = [...items.value, ...response._data.artObjects]
  },

})

function searchArtworks() {
  page.value = 1
  fetchArtworks(true)
}

const loadMore = () => page.value++
</script>

  <style lang="scss" scoped>
  /* Variables */
  $primary-color: #333;
  $background-color: #eee;
  $button-color: #ddd;
  $button-hover-color: #ccc;
  $overlay-color: rgba(0, 0, 0, 0.6);
  $text-color-light: #fff;

  /* Global page styles */
  .page {
    margin: 0 auto;
    font-family: sans-serif;
    color: $primary-color;
  }

  /* Header */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: $background-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    z-index: 10;

    &__logo {
      font-size: 1.2rem;
      font-weight: bold;
    }

    &__search {
      display: flex;
      gap: 5px;
    }

    &__search-input {
      padding: 5px;
      border: 1px solid $primary-color;
      border-radius: 4px;
    }

    &__search-button {
      background-color: $button-color;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: $button-hover-color;
      }
    }
  }

  /* Main Content */
  .main {
    margin-top: 60px;
    padding: 20px;
  }

  /* Gallery */
  .gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    &__item {
      position: relative;
      background-color: #ccc;
      overflow: hidden;

      &--skeleton {
        min-height: 240px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
      }
    }

    &__image-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%; /* Maintain a square ratio */
    }

    &__image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: $overlay-color;
      color: $text-color-light;
      padding: 10px;
      max-height: 4.5em; /* ~3 lines of text */
      overflow: hidden;
      display: none;
    }

    &__item:hover &__title {
      display: block;
    }
  }

  /* Button */
  .button {
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;

    &--load-more {
      background: $button-color;

      &:hover {
        background: $button-hover-color;
      }
    }
  }

  // Shimmer effect animation
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  </style>
